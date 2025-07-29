/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

export interface ProductField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  defaultValue?: any;
}

interface ProductModalProps {
  title: string;
  fields: ProductField[];
  onSubmit: (
    formDataObject: Record<string, any>,
    files: File[],
    removedOldImages: string[]
  ) => void;
  closeModal: () => void;
  isEditMode?: boolean;
}

const DynamicModalForProductManagement: React.FC<ProductModalProps> = ({
  title,
  fields,
  onSubmit,
  closeModal,
  isEditMode,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(
    fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || "";
      return acc;
    }, {} as Record<string, any>)
  );

  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [removedOldImages, setRemovedOldImages] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setSelectedFiles((prev) => [...prev, ...fileArray]);

      const previews = fileArray.map((file) => URL.createObjectURL(file));
      setNewImagePreviews((prev) => [...prev, ...previews]);
    }
  };

  const handleRemoveNewImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveOldImage = (imgUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img: string) => img !== imgUrl),
    }));
    setRemovedOldImages((prev) => [...prev, imgUrl]);
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const files: File[] = [...selectedFiles];
    const formDataObject: Record<string, any> = {};

    Object.keys(formData).forEach((key) => {
      if (key !== "images") {
        formDataObject[key] = formData[key];
      }
    });

    onSubmit(formDataObject, files, removedOldImages);
    closeModal();
  };

  return (
    <div className="modal modal-open" role="dialog">
      <div className="modal-box max-w-3xl">
        <h3 className="font-bold text-lg mb-4">{title}</h3>

        <div className="space-y-4">
          {fields
            .filter((f) => f.name !== "isDeleted" && f.name !== "isFeatured")
            .map((field) => (
              <div key={field.name} className="form-control">
                <label className="label">
                  <span className="label-text">{field.label}</span>
                </label>

                {field.type === "file" ? (
                  <>
                    {isEditMode && Array.isArray(formData.images) && (
                      <div className="flex gap-2 mb-2 flex-wrap">
                        {formData.images.map((img: string, idx: number) => (
                          <div key={idx} className="relative">
                            <img
                              src={img}
                              alt="Old"
                              className="w-16 h-16 rounded object-cover border"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveOldImage(img)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {newImagePreviews.length > 0 && (
                      <div className="flex gap-2 mb-2 flex-wrap">
                        {newImagePreviews.map((preview, idx) => (
                          <div key={idx} className="relative">
                            <img
                              src={preview}
                              alt="Preview"
                              className="w-16 h-16 rounded object-cover border"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveNewImage(idx)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <input
                      type="file"
                      name={field.name}
                      multiple
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

          <div className="grid grid-cols-2 gap-6 mt-6 p-4 border rounded-lg">
            <div>
              <label className="label font-semibold">Delete Product?</label>
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    name="isDeleted"
                    value="true"
                    checked={formData.isDeleted === "true"}
                    onChange={() => handleRadioChange("isDeleted", "true")}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="isDeleted"
                    value="false"
                    checked={formData.isDeleted === "false"}
                    onChange={() => handleRadioChange("isDeleted", "false")}
                  />{" "}
                  No
                </label>
              </div>
            </div>

            <div>
              <label className="label font-semibold">Featured Product?</label>
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    name="isFeatured"
                    value="true"
                    checked={formData.isFeatured === "true"}
                    onChange={() => handleRadioChange("isFeatured", "true")}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="isFeatured"
                    value="false"
                    checked={formData.isFeatured === "false"}
                    onChange={() => handleRadioChange("isFeatured", "false")}
                  />{" "}
                  No
                </label>
              </div>
            </div>
          </div>
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

export default DynamicModalForProductManagement;
