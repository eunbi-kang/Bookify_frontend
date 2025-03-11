/*
 *   2️⃣ 주문 목록 UI 만들기 (OrdersPage.js)
 *   : fetchOrders()가 실행되면 Redux Store에 데이터가 저장되고, UI가 업데이트됨!
 */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../features/orders/ordersSlice";
import { Table, Spin, Alert } from "antd";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders()); // 주문 데이터 가져오기
  }, [dispatch]);

  const columns = [
    { title: "주문 ID", dataIndex: "id", key: "id" },
    { title: "도서 제목", dataIndex: "book_title", key: "book_title" },
    { title: "회원 이름", dataIndex: "user_name", key: "user_name" },
    { title: "주문 날짜", dataIndex: "order_date", key: "order_date" },
  ];

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message="에러 발생!" description={error} type="error" />;

  return (
    <div>
      <h2>📚 주문 목록</h2>
      <Table dataSource={orders} columns={columns} rowKey="id" />
    </div>
  );
};

export default OrdersPage;
