import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <SideBar />
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Sarkar Group ©{new Date().getFullYear()} Created by Sarkar It
          Solutions
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
