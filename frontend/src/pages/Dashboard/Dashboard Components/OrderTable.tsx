// src/components/OrderTable.tsx
import React from "react";

interface OrderTableProps {
  orders: any[];
  isAdmin?: boolean;
  onStatusChange?: (id: string, status: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, isAdmin, onStatusChange }) => {
  const statuses = ["pending", "confirmed", "shipped", "delivered"];

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Total</th>
            <th>Status</th>
            <th>Items</th>
            {isAdmin && <th>Update Status</th>}
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>${order.totalAmount}</td>
              <td>{order.status}</td>
              <td>
                {order.items.map((item: any) => (
                  <div key={item.productId._id}>
                    {item.productId.name} ({item.quantity})
                  </div>
                ))}
              </td>
              {isAdmin && (
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => onStatusChange?.(order._id, e.target.value)}
                    className="select select-bordered"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
