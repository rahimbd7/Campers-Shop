/* eslint-disable @typescript-eslint/no-explicit-any */
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
import DynamicModalForUserManagement from "../../Dashboard Components/DynamicModalForUserManagement";
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

  const defaultUser = {
    name: "",
    email: "",
    password: "",
    role: "user",
    contactNo: "",
    address: "",
    isDeleted: false,
    profile_img: "",
  };

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

  const baseUserData = { ...defaultUser, ...(isEditMode ? selectedUser : {}) };

  const fields = generateFieldsFromObject(
    baseUserData,
    ["_id", "__v", "createdAt", "updatedAt"],
    overrides
  );

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
      } catch {
        notifyError("Failed to delete user. Please try again.");
      }
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      if (isEditMode) {
        await updateUser({ id: selectedUser._id as string, formData }).unwrap();
        notifySuccess("User updated successfully!");
      } else {
        await createUser(formData).unwrap();
        notifySuccess("User created successfully!");
      }
    } catch {
      notifyError(
        isEditMode ? "Failed to update user!" : "Failed to create user!"
      );
    }
  };

  return (
    <div className="p-6 bg-base-100 shadow-xl rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
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

      {/* Table for desktop / card list for mobile */}
      <div className="overflow-x-auto  hidden lg:block">
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
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No Image</span>
                  )}
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "badge-primary"
                        : "badge-secondary"
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

      {/* Card view for mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {users?.data?.map((user: any) => (
          <div
            key={user._id}
            className="p-4 border rounded-lg shadow-sm  flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              {user.profile_img ? (
                <img
                  src={user?.profile_img}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  N/A
                </div>
              )}
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div>
              <span
                className={`badge ${
                  user.role === "admin"
                    ? "badge-primary"
                    : "badge-secondary"
                }`}
              >
                {user.role}
              </span>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="btn btn-primary btn-xs flex-1"
                onClick={() => {
                  setSelectedUser(user);
                  setIsEditMode(true);
                  setShowModal(true);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-error btn-xs flex-1"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <DynamicModalForUserManagement
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
