import LoadingSpinner from "../../../../components/LoadingSpinner";
import { selectCurrentUser } from "../../../../redux/features/auth/authSelector";
import { useGetUserOrdersQuery } from "../../../../redux/features/Order/orderApi";
import { useAppSelector } from "../../../../redux/hooks";
import OrderTable from "../../Dashboard Components/OrderTable";


const MyOrder = () => {
const currentUser = useAppSelector(selectCurrentUser);
  const user = currentUser?.user;
  const { data, isLoading } = useGetUserOrdersQuery(user?.id);

  if (isLoading) return <LoadingSpinner message="Orders loading..." />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <OrderTable orders={data?.data || []} />
    </div>
  );
};

export default MyOrder;
