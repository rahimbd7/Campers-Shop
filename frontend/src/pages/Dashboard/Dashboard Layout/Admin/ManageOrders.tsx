import { selectCurrentUser } from "../../../../redux/features/auth/authSelector";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../../redux/features/Order/orderApi";
import { useAppSelector } from "../../../../redux/hooks";

import OrderTable from "../../Dashboard Components/OrderTable";

const ManageOrders = () => {
  const currentUser = useAppSelector(selectCurrentUser);
   const user = currentUser?.user;
  const { data, isLoading } = useGetAllOrdersQuery(undefined);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const isAdmin = user?.role === "admin";

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus({ orderId, body: { status } }).unwrap();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <OrderTable
        orders={data?.data || []}
        isAdmin={isAdmin}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default ManageOrders;
