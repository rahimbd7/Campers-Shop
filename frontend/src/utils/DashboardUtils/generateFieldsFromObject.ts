/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/generateFieldsFromObject.ts

import type { Field } from "../../pages/Dashboard/Dashboard Components/DynamicModalForUserManagement";


const DEFAULT_EXCLUDE = ["_id", "__v", "createdAt", "updatedAt"];

export function generateFieldsFromObject(
  obj: Record<string, any>,
  exclude: string[] = [],
  overrides: Partial<Record<string, Partial<Field>>> = {}
): Field[] {
  const allExcludes = [...DEFAULT_EXCLUDE, ...exclude];

  return Object.keys(obj)
    .filter((key) => !allExcludes.includes(key)) // ✅ Exclude unwanted fields
    .map((key) => {
      let type: Field["type"] = "text";

      // Auto-detect type
      if (typeof obj[key] === "number") type = "number";
      if (key.toLowerCase().includes("email")) type = "email";
      if (key.toLowerCase().includes("password")) type = "password";
      if (key.toLowerCase().includes("image")) type = "file";

      const baseField: Field = {
        name: key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        type,
        defaultValue: obj[key] || "",
      };

      return { ...baseField, ...(overrides[key] || {}) };
    });
}
