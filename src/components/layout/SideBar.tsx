import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { adminSidebarItems } from "../../route/admin.routes";

const SideBar = () => {
  return (
    <Sider width={250}
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
        items={adminSidebarItems}
      />
    </Sider>
  );
};

export default SideBar;
