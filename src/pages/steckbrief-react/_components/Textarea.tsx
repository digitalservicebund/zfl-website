import type { FieldValues, Path } from "react-hook-form";
import { useFormContext, useWatch } from "react-hook-form";

const MAX_LENGTH = 2500;

type Props<TFieldValues extends FieldValues> = {
  id: Path<TFieldValues>;
  label: string;
  hint?: string;
  required?: boolean;
};

export default function Textarea<TFieldValues extends FieldValues>({
  id,
  label,
  hint,
  required = true,
}: Props<TFieldValues>) {
  const { register, control } = useFormContext<TFieldValues>();
  const value = (useWatch({ control, name: id }) as string) ?? "";
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div class="kern-form-input">
      <label class="kern-label" for={id}>
        {label}
      </label>
      {hint && (
        <div class="kern-hint" id={hintId}>
          {hint}
        </div>
      )}
      <textarea
        class="kern-form-input__input"
        id={id}
        aria-required={required}
        aria-describedby={hintId}
        maxLength={MAX_LENGTH}
        {...register(id)}
      />
      <p class="mt-4 text-right text-sm text-gray-500">
        {value.length} / {MAX_LENGTH}
      </p>
    </div>
  );
}
