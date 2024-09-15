import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { adminSidebarItems } from "../../route/admin.routes";

const SideBar = () => {
  const siderStyle: React.CSSProperties = {
    overflow: "auto",
    height: "100vh",
    position: "fixed",
    insetInlineStart: 0,
    top: 60,
    bottom: 0,
    scrollbarWidth: "none",
    scrollbarColor: "unset",
  };
  return (
    <Sider width={250} breakpoint="lg" collapsedWidth="0" style={siderStyle}>
      
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={adminSidebarItems}
      />
    </Sider>
  );
};

export default SideBar;
