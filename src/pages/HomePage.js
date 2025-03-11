import React, { useState } from "react";
import { Layout, Menu, Dropdown, Carousel } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // 스타일을 위한 CSS 파일

const { Header, Content, Footer } = Layout;

const HomePage = () => {
  const navigate = useNavigate();
  const user = "sjin123"; // 예제 사용자 이름
  const [visible, setVisible] = useState(false);

  // 드롭다운 메뉴 (로그아웃, 정보 수정)
  const menu = (
    <Menu>
      <Menu.Item key="profile">정보 수정</Menu.Item>
      <Menu.Item key="logout" onClick={() => alert("로그아웃")}>
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
        <Dropdown overlay={menu} onVisibleChange={(v) => setVisible(v)} visible={visible}>
          <div className="user-dropdown">
            {user} 님 <DownOutlined />
          </div>
        </Dropdown>
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
