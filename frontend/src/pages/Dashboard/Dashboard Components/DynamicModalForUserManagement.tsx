/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

export interface Field {
  name: string;
  label: string;
  type:
    | "text"
    | "number"
    | "email"
    | "password"
    | "file"
    | "select"
    | "checkbox";
  placeholder?: string;
  options?: string[]; // For select fields
  defaultValue?: any;
}

interface DynamicModalProps {
  title: string;
  fields: Field[];
  onSubmit: (formData: FormData) => void; // FormData for API
  closeModal: () => void;
  isEditMode?: boolean;
}

const DynamicModalForUserManagement: React.FC<DynamicModalProps> = ({
  title,
  fields,
  onSubmit,
  closeModal,
  isEditMode,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(
    fields.reduce((acc, field) => {
      acc[field.name] =
        field.type === "file"
          ? field.defaultValue || ""
          : field.defaultValue || (field.type === "checkbox" ? false : "");
      return acc;
    }, {} as Record<string, any>)
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0], //  Only first file for profile image
      });
    }
  };

  /**  Convert to FormData for API submission */
 const handleSubmit = () => {
  const dataToSend = new FormData();

  const payload: Record<string, any> = {};

  Object.keys(formData).forEach((key) => {
    if (formData[key] instanceof File) {
      dataToSend.append("profile_img", formData[key]); //  Append file with correct key
    } else {
      //exclude password if empty in edit mode
      if (isEditMode && key === "password" && !formData[key]) return;
      payload[key] = formData[key];
    }
  });

  dataToSend.append("data", JSON.stringify(payload)); // ✅ Send non-file fields as JSON under key "data"

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
                    checked={formData[field.name]}
                    onChange={handleChange}
                    className="toggle toggle-primary"
                  />
                  <span>{field.label}</span>
                </div>
              ) : field.type === "select" ? (
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
                <>
                  {isEditMode &&
                    formData[field.name] &&
                    typeof formData[field.name] === "string" && (
                      <div className="mb-2">
                        <img
                          src={formData[field.name]}
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      </div>
                    )}
                  <input
                    type="file"
                    name={field.name}
                    onChange={handleFileChange}
                    className="file-input file-input-bordered w-full"
                  />
                </>
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

export default DynamicModalForUserManagement;
