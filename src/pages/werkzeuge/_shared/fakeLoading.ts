const FAKE_LOADING_DELAY_MS = 2100;
const FAKE_LOADING_STATUS_INTERVAL_MS = 700;

export function createFakeLoadingSequence(
  messages: string[],
  onMessage: (message: string) => void,
): { promise: Promise<void>; cancel: () => void } {
  let messageIndex = 0;
  onMessage(messages[0]);
  const interval = setInterval(() => {
    messageIndex = (messageIndex + 1) % messages.length;
    onMessage(messages[messageIndex]);
  }, FAKE_LOADING_STATUS_INTERVAL_MS);

  let timeoutId: ReturnType<typeof setTimeout>;
  const promise = new Promise<void>((resolve) => {
    timeoutId = setTimeout(() => {
      clearInterval(interval);
      resolve();
    }, FAKE_LOADING_DELAY_MS);
  });

  return {
    promise,
    cancel: () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    },
  };
}
