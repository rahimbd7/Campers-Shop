
interface Product {
  name?: string;
  price?: number;
}

interface OrderItem {
  productId?: Product;
  quantity: number;
}

interface Order {
  _id: string;
  createdAt: string;
  items?: OrderItem[];
  status: string;
}

interface OrderTableProps {
  orders: Order[];
  isAdmin?: boolean;
  onStatusChange?: (orderId: string, status: string) => void;
}

interface OrderTableProps {
  orders: Order[];
  isAdmin?: boolean;
  onStatusChange?: (orderId: string, status: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  isAdmin,
  onStatusChange,
}) => {
  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <table className="hidden lg:table min-w-full table-auto border  text-sm">
        <thead>
          <tr className="">
            <th className="px-4 py-2 border">Order Date</th>
            <th className="px-4 py-2 border">Product Name</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Total</th>
            <th className="px-4 py-2 border">Status</th>
            {isAdmin && <th className="px-4 py-2 border">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="text-black ">
              <td className="px-4 py-2 border">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border">
                {order.items?.length
                  ? order.items.map((item, idx) => (
                      <div key={idx}>{item.productId?.name}</div>
                    ))
                  : "N/A"}
              </td>
              <td className="px-4 py-2 border">
                {order.items?.length
                  ? order.items.map((item:OrderItem, idx: number) => (
                      <div key={idx}>{item.productId?.price}</div>
                    ))
                  : "N/A"}
              </td>
              <td className="px-4 py-2 border">
                {order.items?.length
                  ? order.items.map((item, idx) => (
                      <div key={idx}>{item.quantity}</div>
                    ))
                  : "N/A"}
              </td>
              <td className="px-4 py-2 border">
                {order.items?.length
                  ? order.items.map((item, idx) => (
                      <div key={idx}>
                        {item.productId?.price as number * item.quantity}
                      </div>
                    ))
                  : "N/A"}
              </td>
              <td className="px-4 py-2 border">{order.status}</td>
              {isAdmin && (
                <td className="px-4 py-2 border">
                  <select
                    className="border rounded px-2 py-1 text-sm shadow-sm"
                    value={order.status}
                    onChange={(e) => onStatusChange?.(order?._id as string, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-2 lg:hidden">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg shadow-sm p-4"
          >
            <div className="mb-2 text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </div>

            <div className="space-y-1">
              <p><span className="font-semibold">Products:</span> {order.items?.map(i => i.productId?.name).join(", ") || "N/A"}</p>
              <p><span className="font-semibold">Prices:</span> {order.items?.map(i => i.productId?.price).join(", ") || "N/A"}</p>
              <p><span className="font-semibold">Quantities:</span> {order.items?.map(i => i.quantity).join(", ") || "N/A"}</p>
              <p><span className="font-semibold">Totals:</span> {order.items?.map(i => i.productId?.price as number * i.quantity).join(", ") || "N/A"}</p>
              <p><span className="font-semibold">Status:</span> {order.status}</p>
            </div>

            {isAdmin && (
              <div className="mt-2">
                <select
                  className="border rounded px-2 py-1 text-sm shadow-sm w-full"
                  value={order.status}
                  onChange={(e) => onStatusChange?.(order?._id as string, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTable;
