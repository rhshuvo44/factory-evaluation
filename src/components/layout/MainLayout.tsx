import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import SideBar from "./SideBar";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ height: "100%" }}>
      <SideBar />
      <Layout>
        <HeaderMenu />
        <Content style={{ margin: "24px 16px 0" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
