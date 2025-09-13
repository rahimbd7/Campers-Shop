/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Field, FieldType } from "../../interface/common";


const DEFAULT_EXCLUDE = ["_id", "__v", "createdAt", "updatedAt"];

export function generateFieldsFromObject(
  obj: Record<string, any>,
  exclude: string[] = [],
  overrides: Partial<Record<string, Partial<Field>>> = {}
): Field[] {
  const allExcludes = [...DEFAULT_EXCLUDE, ...exclude];

  return Object.keys(obj)
    .filter((key) => !allExcludes.includes(key))
    .map((key) => {
      let type: FieldType = "text";

      if (typeof obj[key] === "number") type = "number";
      if (key.toLowerCase().includes("email")) type = "email";
      if (key.toLowerCase().includes("password")) type = "password";
      if (key.toLowerCase().includes("image")) type = "file";

      const baseField: Field = {
        name: key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        type,
        defaultValue: obj[key] ?? "",
      };

      return { ...baseField, ...(overrides[key] || {}) };
    });
}
