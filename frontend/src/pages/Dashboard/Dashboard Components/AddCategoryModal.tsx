import { useState } from "react";

interface AddCategoryModalProps {
  onSubmit: (formData: FormData) => void;
  closeModal: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  onSubmit,
  closeModal,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    fd.append("description", description);
    if (icon) fd.append("icon", icon);
    onSubmit(fd);
  };

  return (
    <div className="modal modal-open" role="dialog">
      <div className="modal-box max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter category name"
              required
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter description"
            />
          </div>

          {/* Icon */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category Icon</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setIcon(e.target.files?.[0] || null)}
              className="file-input file-input-bordered w-full"
              required
            />
          </div>

          {/* Actions */}
          <div className="modal-action">
            <button type="button" className="btn btn-outline" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
