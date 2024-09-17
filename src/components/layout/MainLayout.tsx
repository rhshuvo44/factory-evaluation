import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import SideBar from "./SideBar";
import { useState } from "react";

const { Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="" style={{ height: "100%", minHeight: "100vh" }}>
      <SideBar collapsed={collapsed} />
      <Layout>
        <HeaderMenu collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content style={{ margin: "24px 16px 0" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
