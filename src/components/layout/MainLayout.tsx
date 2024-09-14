import {
  DashboardOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

// const items = [
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   UserOutlined,
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: createElement(icon),
//   label: `nav ${index + 1}`,
// }));
const items: MenuProps["items"] = [
  {
    key: "0",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "1",
    icon: <UserOutlined />,
    label: "User",
    children: [
      {
        key: "1-1",
        label: "Submenu 1-1",
        icon: <UserOutlined />,
      },
      {
        key: "1-1-1",
        label: "Submenu 1-1-1",
        icon: <UserOutlined />,
      },
      {
        key: "1-1-2",
        label: "Submenu 1-1-2",
        icon: <VideoCameraOutlined />,
      },
    ],
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: "Video",
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: "Upload",
  },
];
const MainLayout = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          style={{
            color: "white",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Sarkar Group</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
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
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
