import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/users/usersSlice";
import { Table, Spin, Alert } from "antd";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const columns = [
    { title: "회원 ID", dataIndex: "id", key: "id" },
    { title: "이름", dataIndex: "name", key: "name" },
    { title: "이메일", dataIndex: "email", key: "email" },
  ];

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message="에러 발생!" description={error} type="error" />;

  return (
    <div>
      <h2>👤 회원 목록</h2>
      <Table dataSource={users} columns={columns} rowKey="id" />
    </div>
  );
};

export default UsersPage;
