export async function runAIPrompt(prompt: string): Promise<string | undefined> {
  const aiManager = window.ai?.languageModel || window.languageModel;

  if (!aiManager) {
    console.log("AI Manager is undefined");
    return;
  }
  // const availability = await aiManager.availability({
  //   languages: ["de"],
  // });
  const availability = await aiManager.availability();

  if (availability === "no" || availability === undefined) {
    console.error("AI Model not available on this device.");
    return;
  }

  if (navigator.userActivation.isActive) {
    const session = await aiManager.create({
      systemPrompt:
        "You are a helpful assistant living in a client-side web app.",
    });
    try {
      // 3. Prompt the model (Streaming is better for UX)
      const stream = session.promptStreaming(prompt);

      let fullResponse: string = "";
      for await (const chunk of stream) {
        fullResponse = chunk; // In this API, the chunk is the cumulative text
        return fullResponse;
      }
    } catch (err) {
      console.error("Prompt failed:", err);
    } finally {
      // 4. Destroy session when done to free up memory (VRAM/RAM)
      session.destroy();
    }
  }
}
