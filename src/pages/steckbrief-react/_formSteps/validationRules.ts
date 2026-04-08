/**
 * Reusable validation rule presets for form fields.
 * Import and use in any Step component.
 */
export const validationRules = {
  required: { required: "Dieses Feld ist erforderlich" },

  requiredShortText: {
    required: "Dieses Feld ist erforderlich",
    maxLength: {
      value: 40,
      message: "Maximal 40 Zeichen erlaubt",
    },
  },

  requiredlongText: {
    required: "Dieses Feld ist erforderlich",
    maxLength: {
      value: 2500,
      message: "Maximal 2500 Zeichen erlaubt",
    },
  },

  requiredEmail: {
    required: "Dieses Feld ist erforderlich",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    },
  },
};
