import { useState } from "react";
import {
  confirmAction,
  notifySuccess,
  notifyError,
} from "../../../../utils/Notification/alertUtils";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useCreateUserMutation,
} from "../../../../redux/features/user/userApis";
import DynamicModal from "../../Dashboard Components/DynamicModal";
import { generateFieldsFromObject } from "../../../../utils/DashboardUtils/generateFieldsFromObject";

const ManageUsers = () => {
  const { data: users } = useGetAllUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [createUser] = useCreateUserMutation();

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  /** ✅ Default user structure for create mode */
  const defaultUser = {
    name: "",
    email: "",
    password: "",
    role: "user",
    contactNo: "",
    address: "",
    isDeleted: false,
    profile_img: "", // ✅ Added profile image field
  };

  /** ✅ Field overrides */
  const overrides = {
    role: {
      type: "select",
      options: ["admin", "user"],
    },
    password: {
      placeholder: "Enter new password",
    },
    isDeleted: {
      type: "checkbox",
    },
    profile_img: {
      type: "file",
      label: "Profile Image",
    },
  };

  /** ✅ Merge defaultUser with selectedUser for edit mode */
  const baseUserData = { ...defaultUser, ...(isEditMode ? selectedUser : {}) };

  /** ✅ Generate fields */
 const fields = generateFieldsFromObject(
    baseUserData,
    ["_id", "__v", "createdAt", "updatedAt"],
    overrides
  );

  /** ✅ Handle DELETE */
  const handleDelete = async (id: string) => {
    const confirmed = await confirmAction(
      "Delete User?",
      "This action cannot be undone.",
      "Delete"
    );

    if (confirmed) {
      try {
        await deleteUser(id).unwrap();
        notifySuccess("User deleted successfully!");
      } catch (error) {
        notifyError("Failed to delete user. Please try again.");
      }
    }
  };

  /** ✅ Handle modal submit (FormData) */
  const handleSubmit = async (formData: FormData) => {
    try {
      if (isEditMode) {
        await updateUser({ id: selectedUser._id as string, formData }).unwrap();
        notifySuccess("User updated successfully!");
      } else {
        console.log("Creating user:", Object.fromEntries(formData));
        await createUser(formData).unwrap();
        notifySuccess("User created successfully!");
      }
    } catch (error) {
      notifyError(isEditMode ? "Failed to update user!" : "Failed to create user!");
    }
  };

  return (
    <div className="p-6 bg-base-100 shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Manage Users</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setSelectedUser(null);
            setIsEditMode(false);
            setShowModal(true);
          }}
        >
          + Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.data?.map((user: any) => (
              <tr key={user._id}>
                <td>
                  {user.profile_img ? (
                    <img
                      src={user?.profile_img}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin" ? "badge-primary" : "badge-secondary"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="text-center flex gap-2 justify-center">
                  <button
                    className="btn btn-primary btn-xs"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsEditMode(true);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-error btn-xs"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Dynamic Modal */}
      {showModal && (
        <DynamicModal
          title={isEditMode ? "Update User" : "Create User"}
          isEditMode={isEditMode}
          fields={fields}
          onSubmit={handleSubmit}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ManageUsers;
