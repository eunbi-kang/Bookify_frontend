import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Carousel, Spin, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";

const { Header, Content, Footer } = Layout;

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ 로그인한 사용자만 /home 접근 가능하도록 설정
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users/me/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setUser(response.data);
        } else {
          throw new Error("인증 실패");
        }
      } catch (error) {
        console.error("사용자 정보를 가져오는데 실패했습니다.", error);
        setUser(null);
        message.error("로그인이 필요합니다.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // ✅ 로그인하지 않은 사용자는 `/login`으로 이동
  if (!user) return <Spin size="large" className="loading-spinner" />;

  const handleLogout = () => {
    localStorage.removeItem("token"); // 저장된 토큰 삭제
    message.success("로그아웃 되었습니다.");
    navigate("/login"); // 로그인 페이지로 이동
  };

  // ✅ 드롭다운 메뉴
  const menu = (
    <Menu>
      <Menu.Item key="profile">정보 수정</Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        로그아웃
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo" onClick={() => navigate("/home")}>
          📚 BookStore
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          items={[
            { key: "users", label: "회원관리", onClick: () => navigate("/users") },
            { key: "books", label: "도서관리", onClick: () => navigate("/books") },
            { key: "orders", label: "주문관리", onClick: () => navigate("/orders") },
          ]}
        />
        {loading ? (
          <Spin size="small" />
        ) : (
          <Dropdown overlay={menu} trigger={["click"]}>
            <div className="user-dropdown">
              {user.username} 님 <DownOutlined />
            </div>
          </Dropdown>
        )}
      </Header>

      <Content className="content">
        <Carousel autoplay className="carousel">
          <div>
            <h3>📖 추천 도서 1</h3>
          </div>
          <div>
            <h3>📖 추천 도서 2</h3>
          </div>
          <div>
            <h3>📖 추천 도서 3</h3>
          </div>
        </Carousel>
      </Content>

      <Footer className="footer">© 2025 eunbiStore. All Rights Reserved.</Footer>
    </Layout>
  );
};

export default HomePage;
