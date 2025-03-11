import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/login/", values);
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 50 }}>
      <h2>로그인</h2>
      <Form onFinish={handleLogin}>
        <Form.Item name="username" rules={[{ required: true, message: "아이디를 입력하세요" }]}>
          <Input placeholder="아이디" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "비밀번호를 입력하세요" }]}>
          <Input.Password placeholder="비밀번호" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            로그인
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
