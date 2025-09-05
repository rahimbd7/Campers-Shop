import DashboardPageWrapper from "../../Dashboard Components/DashboardPageWrapper";

import { toast } from "react-toastify";
import { useAppSelector } from "../../../../redux/hooks";

import { useGetUserByIdQuery, useUpdateUserMutation } from "../../../../redux/features/user/userApis";
import ProfileUpdateForm from "../../Dashboard Components/ProfileUpdateForm";
import { selectCurrentUser } from "../../../../redux/features/auth/authSelector";

const UpdateProfile = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const user = currentUser?.user;
  const { data, isLoading } = useGetUserByIdQuery(user?.id);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const userData = data?.data || {};

  const handleUpdate = async (formData: FormData) => {
    try {
      await updateUser({ id: userData._id, formData }).unwrap();
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <DashboardPageWrapper title="Update Profile">
      <ProfileUpdateForm
        initialData={userData}
        onSubmit={handleUpdate}
        isLoading={isUpdating}
      />
    </DashboardPageWrapper>
  );
};

export default UpdateProfile;
