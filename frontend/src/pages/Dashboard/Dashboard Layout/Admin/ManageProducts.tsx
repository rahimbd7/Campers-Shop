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
  const { data: products } = useGetAllProductsQuery(undefined, {
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
      notifyError(isEditMode ? "Failed to update product!" : "Failed to create product!");
    }
  };

  return (
    <div className="p-6 bg-base-100 shadow-lg rounded-lg">
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

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Images</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.data?.map((product: any) => (
              <tr key={product._id}>
                <td className="flex gap-1">
                  {product.images?.length > 0 ? (
                    product.images.slice(0, 2).map((img: string, idx: number) => (
                      <img
                        key={idx}
                        src={img}
                        alt="Product"
                        className="w-10 h-10 object-cover rounded"
                      />
                    ))
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.stockQuantity}</td>
                <td className="text-center flex gap-2 justify-center">
                  <button
                    className="btn btn-primary btn-xs"
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsEditMode(true);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-error btn-xs"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
