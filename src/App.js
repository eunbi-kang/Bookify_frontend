import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";
import UsersPage from "./pages/UsersPage";
import BooksPage from "./pages/BooksPage";

const App = () => {
  return (
    <Routes>
      {/* 초기 실행 시 /login으로 이동 */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* 로그인 페이지 */}
      <Route path="/login" element={<LoginPage />} />

      {/* 로그인 후 접근 가능한 페이지 */}
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/books" element={<BooksPage />} />
      </Route>
    </Routes>
  );
};

export default App;
