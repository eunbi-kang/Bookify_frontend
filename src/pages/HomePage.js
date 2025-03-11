import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Carousel, Spin, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ API 요청을 위해 추가
import "./HomePage.css"; // 스타일을 위한 CSS 파일

const { Header, Content, Footer } = Layout;

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // ✅ API에서 받아온 사용자 정보 저장
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  // ✅ API에서 사용자 정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // 저장된 JWT 토큰 가져오기
        if (!token) {
          message.error("로그인이 필요합니다.");
          navigate("/login");
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/users/me/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data); // ✅ 사용자 데이터 저장
      } catch (error) {
        console.error("사용자 정보를 가져오는데 실패했습니다.", error);
        message.error("로그인이 필요합니다.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // ✅ 로그아웃 기능 추가
  const handleLogout = () => {
    localStorage.removeItem("token"); // 토큰 삭제
    message.success("로그아웃 되었습니다.");
    navigate("/login");
  };

  // 드롭다운 메뉴 (로그아웃, 정보 수정)
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
      {/* ✅ 네비게이션 바 */}
      <Header className="header">
        <div className="logo" onClick={() => navigate("/home")}>
          📚 BookStore
        </div>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["home"]}>
          <Menu.Item key="users" onClick={() => navigate("/users")}>
            회원관리
          </Menu.Item>
          <Menu.Item key="books" onClick={() => navigate("/books")}>
            도서관리
          </Menu.Item>
          <Menu.Item key="orders" onClick={() => navigate("/orders")}>
            주문관리
          </Menu.Item>
        </Menu>
        {/* ✅ 사용자 정보 표시 */}
        {loading ? (
          <Spin size="small" />
        ) : user ? (
          <Dropdown overlay={menu} onVisibleChange={(v) => setVisible(v)} visible={visible}>
            <div className="user-dropdown">
              {user.username} 님 <DownOutlined />
            </div>
          </Dropdown>
        ) : (
          <div className="user-dropdown" onClick={() => navigate("/login")}>
            로그인
          </div>
        )}
      </Header>

      {/* ✅ 캐러셀 영역 (추천 도서) */}
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

      {/* ✅ 푸터 */}
      <Footer className="footer">© 2025 eunbiStore. All Rights Reserved.</Footer>
    </Layout>
  );
};

export default HomePage;
