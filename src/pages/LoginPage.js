import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Modal, message } from "antd";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  // 로그인 함수
  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/users/login/", values);
      localStorage.setItem("token", response.data.access);
      navigate("/home");
    } catch (error) {
      message.error("로그인 실패: 아이디와 비밀번호를 확인하세요.");
    } finally {
      setLoading(false);
    }
  };

  // 회원가입 함수
  const handleRegister = async (values) => {
    try {
      await axios.post("http://localhost:8000/api/users/register/", values);
      message.success("회원가입 성공! 로그인해주세요.");
      setRegisterModalOpen(false); // 회원가입 성공 시 모달 닫기
    } catch (error) {
      message.error("회원가입 실패: " + (error.response?.data?.message || "오류 발생"));
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
      <Button type="link" onClick={() => setRegisterModalOpen(true)}>
        회원가입
      </Button>

      {/* 회원가입 모달 */}
      <Modal title="회원가입" open={isRegisterModalOpen} onCancel={() => setRegisterModalOpen(false)} footer={null}>
        <Form onFinish={handleRegister}>
          <Form.Item name="username" rules={[{ required: true, message: "아이디를 입력하세요" }]}>
            <Input placeholder="아이디" />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, message: "이메일을 입력하세요" }]}>
            <Input placeholder="이메일" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "비밀번호를 입력하세요" }]}>
            <Input.Password placeholder="비밀번호" />
          </Form.Item>
          <Form.Item name="phone">
            <Input placeholder="전화번호 (선택)" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              가입하기
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LoginPage;
