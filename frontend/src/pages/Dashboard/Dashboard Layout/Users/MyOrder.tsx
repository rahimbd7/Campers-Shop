import { useGetUserOrdersQuery } from "../../../../redux/features/Order/orderApi";
import { useAppSelector } from "../../../../redux/hooks";
import type { RootState } from "../../../../redux/store";
import OrderTable from "../../Dashboard Components/OrderTable";


const MyOrder = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { data, isLoading } = useGetUserOrdersQuery(user?.id);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <OrderTable orders={data?.data || []} />
    </div>
  );
};

export default MyOrder;
