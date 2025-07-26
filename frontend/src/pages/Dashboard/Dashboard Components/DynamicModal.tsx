/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

export interface Field {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "password" | "file" | "select" | "checkbox";
  placeholder?: string;
  options?: string[]; // For select fields
  defaultValue?: any;
}

interface DynamicModalProps {
  title: string;
  fields: Field[];
  onSubmit: (formData: FormData) => void; // ✅ FormData for image upload
  closeModal: () => void;
  isEditMode?: boolean;
}

const DynamicModal: React.FC<DynamicModalProps> = ({
  title,
  fields,
  onSubmit,
  closeModal,
  isEditMode,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(
    fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || (field.type === "checkbox" ? false : "");
      return acc;
    }, {} as Record<string, any>)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? Array.from(files) : [],
    });
  };

  /** ✅ Convert to FormData for API submission */
  const handleSubmit = () => {
    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((file: File) => dataToSend.append(key, file));
      } else {
        dataToSend.append(key, formData[key]);
      }
    });

    onSubmit(dataToSend);
    closeModal();
  };

  return (
    <div className="modal modal-open" role="dialog">
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-lg mb-4">{title}</h3>

        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="form-control">
              <label className="label">
                <span className="label-text">{field.label}</span>
              </label>

              {field.type === "checkbox" ? (
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      name={field.name}
      checked={formData[field.name]} // ✅ Checkbox uses checked, not value
      onChange={handleChange}
      className="toggle toggle-primary"
    />
    <span>{field.label}</span>
  </div>
) :field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "file" ? (
                <input
                  type="file"
                  name={field.name}
                  multiple
                  onChange={handleFileChange}
                  className="file-input file-input-bordered w-full"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  placeholder={field.placeholder}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              )}
            </div>
          ))}
        </div>

        <div className="modal-action">
          <button className="btn btn-outline" onClick={closeModal}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {isEditMode ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicModal;
