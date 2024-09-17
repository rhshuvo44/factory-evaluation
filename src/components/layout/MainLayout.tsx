import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import SideBar from "./SideBar";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout className="" style={{ height: "100%", minHeight: "100vh" }}>
      <SideBar />
      <Layout>
        <HeaderMenu />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              overflow: "hidden",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
