import React, { useState } from "react";
import {X} from "lucide-react";

interface ProfileUpdateFormProps {
  initialData: Record<string, any>;
  onSubmit: (formData: FormData) => void;
  isLoading?: boolean;
  roleOptions?: string[];
}

const ProfileUpdateForm: React.FC<ProfileUpdateFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
  roleOptions,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImage(file);
      setPreviewImage(URL.createObjectURL(file)); // ✅ Preview new image
    }
  };

  const removeNewImage = () => {
    setNewImage(null);
    setPreviewImage(null);
  };

  const handleSubmit = () => {
    const dataToSend = new FormData();

    // Append updated fields
    Object.keys(formData).forEach((key) => {
      dataToSend.append(key, formData[key]);
    });

    // If new image selected, append it
    if (newImage) {
      dataToSend.set("profile_img", newImage);
    }

    onSubmit(dataToSend);
  };
  return (
    <div className=" shadow-xl rounded-xl p-6 max-w-xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-center text-primary">
        Update Profile
      </h3>

      {/* Name (Disabled) */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-medium">Name</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          disabled
          className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* Email (Disabled) */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-medium">Email</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email || ""}
          disabled
          className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* Contact */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-medium">Contact No</span>
        </label>
        <input
          type="text"
          name="contactNo"
          value={formData.contactNo || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>

      {/* Address */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-medium">Address</span>
        </label>
        <textarea
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />
      </div>

      {/* Role (Optional for admin) */}
      {roleOptions && roleOptions.length > 0 && (
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-medium">Role</span>
          </label>
          <select
            name="role"
            value={formData.role || ""}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Profile Image Section */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Profile Image</label>

        <div className="flex items-center gap-4">
          {/* Old Image Preview */}
          {formData.profile_img && typeof formData.profile_img === "string" && !previewImage && (
            <img
              src={formData.profile_img}
              alt="Current Profile"
              className="w-20 h-20 rounded-full border object-cover"
            />
          )}

          {/* New Image Preview */}
          {previewImage && (
            <div className="relative">
              <img
                src={previewImage}
                alt="New Preview"
                className="w-20 h-20 rounded-full border object-cover"
              />
              <button
                onClick={removeNewImage}
                type="button"
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
               <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* File Input */}
        <input
          type="file"
          name="profile_img"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full mt-3"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="btn btn-primary w-full"
      >
        {isLoading ? "Updating..." : "Update Profile"}
      </button>
    </div>
  );
};

export default ProfileUpdateForm;
