import { useState } from "react";
import {
  confirmAction,
  notifySuccess,
  notifyError,
} from "../../../../utils/Notification/alertUtils";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../../../redux/features/category/categoryApi";
import { useGetAllProductsQuery } from "../../../../redux/features/products/productApi";
import AddCategoryModal from "../../Dashboard Components/AddCategoryModal";


const ManageCategories = () => {
  const { data: categories } = useGetCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: products } = useGetAllProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (categoryId: string, categoryName: string) => {
    const assignedProducts =
      products?.data?.filter((p: any) => p.categoryId === categoryId) || [];

    if (assignedProducts.length > 0) {
      notifyError(
        `Cannot delete "${categoryName}". There are ${assignedProducts.length} products assigned to this category.`
      );
      return;
    }

    const confirmed = await confirmAction(
      "Delete Category?",
      "This action cannot be undone.",
      "Delete"
    );

    if (confirmed) {
      try {
        await deleteCategory(categoryId).unwrap();
        notifySuccess("Category deleted successfully!");
      } catch {
        notifyError("Failed to delete category.");
      }
    }
  };

  const handleAddCategory = async (formData: FormData) => {
    try {
      await createCategory(formData).unwrap();
      notifySuccess("Category created successfully!");
      setShowModal(false);
    } catch (error) {
      console.error(error);
      notifyError("Failed to create category!");
    }
  };

  return (
    <div className="p-6 bg-base-200 min-h-screen rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Manage Categories</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Add Category
        </button>
      </div>

      {/* Category List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.data?.map((category: any) => (
          <div
            key={category._id}
            className="bg-base-100 shadow-lg rounded-lg p-4 flex flex-col hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-center mb-4">
              {category.icon ? (
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                  ❓
                </div>
              )}
            </div>

            <h3 className="text-lg font-semibold text-center">
              {category.name}
            </h3>
            <p className="text-sm text-gray-500 text-center">
              {category.description || "No description"}
            </p>

            <div className="mt-auto flex gap-2 pt-4">
              <button
                className="btn btn-error btn-sm flex-1"
                onClick={() => handleDelete(category._id, category.name)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <AddCategoryModal
          onSubmit={handleAddCategory}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ManageCategories;
