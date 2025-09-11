import { useState } from "react";
import { generateFieldsFromObject } from "../../../../utils/DashboardUtils/generateFieldsFromObject";
import {
  confirmAction,
  notifySuccess,
  notifyError,
} from "../../../../utils/Notification/alertUtils";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
} from "../../../../redux/features/products/productApi";
import DynamicModalForProductManagement from "../../Dashboard Components/DynamicModalForProductManagement";

const ManageProducts = () => {
  const { data: products } = useGetAllProductsQuery( undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const defaultProduct = {
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    categoryId: "",
    images: [],
  };

  const overrides = {
    price: { type: "number", placeholder: "Enter price" },
    stockQuantity: { type: "number", placeholder: "Enter stock quantity" },
    images: { type: "file", label: "Upload Images", multiple: true },
  };

  const baseProductData = {
    ...defaultProduct,
    ...(isEditMode ? selectedProduct : {}),
  };

  const fields = generateFieldsFromObject(
    baseProductData,
    ["_id", "__v", "createdAt", "updatedAt"],
    overrides
  );

  const handleDelete = async (id: string) => {
    const confirmed = await confirmAction(
      "Delete Product?",
      "This action cannot be undone.",
      "Delete"
    );
    if (confirmed) {
      try {
        await deleteProduct(id).unwrap();
        notifySuccess("Product deleted successfully!");
      } catch {
        notifyError("Failed to delete product.");
      }
    }
  };

  const handleSubmit = async (
    formDataObject: Record<string, any>,
    files: File[],
    removedOldImages: string[]
  ) => {
    try {
      const payload = {
        ...formDataObject,
        price: Number(formDataObject.price),
        stockQuantity: Number(formDataObject.stockQuantity),
        isDeleted: formDataObject.isDeleted === "true",
        isFeatured: formDataObject.isFeatured === "true",
        isBestSelling: formDataObject.isBestSelling === "true",
        removedOldImages,
      };

      const dataToSend = new FormData();
      dataToSend.append("data", JSON.stringify(payload));
      files.forEach((file) => dataToSend.append("images", file));

      if (isEditMode) {
        await updateProduct({
          id: selectedProduct._id as string,
          formData: dataToSend,
        }).unwrap();
        notifySuccess("Product updated successfully!");
      } else {
        await createProduct(dataToSend).unwrap();
        notifySuccess("Product created successfully!");
      }
    } catch (error) {
      console.error(error);
      notifyError(
        isEditMode ? "Failed to update product!" : "Failed to create product!"
      );
    }
  };

  return (
    <div className="p-6 bg-base-200 min-h-screen rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Manage Products</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setSelectedProduct(null);
            setIsEditMode(false);
            setShowModal(true);
          }}
        >
          + Add Product
        </button>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.data?.map((product: any) => (
          <div
            key={product._id}
            className="bg-base-100 shadow-lg rounded-lg p-4 flex flex-col hover:shadow-xl transition-shadow duration-300"
          >
            {/* Product Images */}
            <div className="flex gap-2 mb-4">
              {product.images?.length > 0 ? (
                product.images.slice(0, 2).map((img: string, idx: number) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Product"
                    className="w-16 h-16 object-cover rounded"
                  />
                ))
              ) : (
                <span className="text-sm text-gray-500">No Image</span>
              )}
            </div>

            {/* Product Info */}
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-primary font-bold">${product.price}</p>
            <p className="text-sm text-gray-500">
              Stock: {product.stockQuantity}
            </p>

            {/* Actions */}
            <div className="mt-auto flex gap-2 pt-4">
              <button
                className="btn btn-primary btn-sm flex-1"
                onClick={() => {
                  setSelectedProduct(product);
                  setIsEditMode(true);
                  setShowModal(true);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-error btn-sm flex-1"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <DynamicModalForProductManagement
          title={isEditMode ? "Update Product" : "Create Product"}
          isEditMode={isEditMode}
          fields={fields}
          onSubmit={handleSubmit}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ManageProducts;
