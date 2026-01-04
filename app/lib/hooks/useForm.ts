import { useState, useCallback } from "react";
import { z } from "zod";

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

interface UseFormOptions<T extends z.ZodType> {
  schema: T;
  onSubmit: (data: z.infer<T>) => Promise<void> | void;
}

interface UseFormReturn<T extends z.ZodType> {
  errors: FieldErrors<z.infer<T>>;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  validateField: (name: keyof z.infer<T>, value: unknown) => string | null;
  setFieldError: (name: keyof z.infer<T>, error: string | null) => void;
  clearErrors: () => void;
  reset: () => void;
}

export function useForm<T extends z.ZodType>({
  schema,
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [errors, setErrors] = useState<FieldErrors<z.infer<T>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback(
    (name: keyof z.infer<T>, value: unknown): string | null => {
      // Create partial data with just this field to validate
      const partialData = { [name]: value };
      const result = schema.safeParse(partialData);

      if (!result.success) {
        const fieldError = result.error.issues.find(
          (issue) => issue.path[0] === name
        );
        return fieldError?.message || null;
      }
      return null;
    },
    [schema]
  );

  const setFieldError = useCallback(
    (name: keyof z.infer<T>, error: string | null) => {
      setErrors((prev) => {
        if (error === null) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [name]: _removed, ...rest } = prev;
          return rest as FieldErrors<z.infer<T>>;
        }
        return { ...prev, [name]: error };
      });
    },
    []
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const reset = useCallback(() => {
    setErrors({});
    setIsSubmitting(false);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      clearErrors();

      const formData = new FormData(e.currentTarget);
      const data: Record<string, unknown> = Object.fromEntries(
        formData.entries()
      );

      // Handle checkboxes (they return "on" or are absent)
      const formElements = e.currentTarget.elements;
      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i] as HTMLInputElement;
        if (element.type === "checkbox") {
          data[element.name] = element.checked;
        }
      }

      const result = schema.safeParse(data);

      if (!result.success) {
        const fieldErrors: FieldErrors<z.infer<T>> = {};
        result.error.issues.forEach((issue) => {
          const path = issue.path[0] as keyof z.infer<T>;
          if (path && !fieldErrors[path]) {
            fieldErrors[path] = issue.message;
          }
        });
        setErrors(fieldErrors);
        setIsSubmitting(false);
        return;
      }

      try {
        await onSubmit(result.data);
      } finally {
        setIsSubmitting(false);
      }
    },
    [schema, onSubmit, clearErrors]
  );

  return {
    errors,
    isSubmitting,
    handleSubmit,
    validateField,
    setFieldError,
    clearErrors,
    reset,
  };
}
