import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import logo from "../../assets/image/logo.png";
import { userRole } from "../../constants/userRole";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hook";
import { adminPaths } from "../../route/admin.routes";
import { coordinatorPaths } from "../../route/Coordinator.routes";
import { executivePaths } from "../../route/ExecutiveDirector.routes";
import { generalPaths } from "../../route/generalDirector.routes";
import { managingPaths } from "../../route/ManagingDirector.routes";
import { superAdminPaths } from "../../route/superAdmin.routes";
import { sidebarItemsGenerator } from "../../utilis/sidebarItemsGenerator";
import { verifyToken } from "../../utilis/verifyToken";

const SideBar = () => {
  const [openKeys, setOpenKeys] = useState([]);

  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  let sidebarItems;

  switch (user!.role) {
    case userRole.superAdmin:
      sidebarItems = sidebarItemsGenerator(
        superAdminPaths,
        userRole.superAdmin
      );
      break;
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.ExecutiveDirector:
      sidebarItems = sidebarItemsGenerator(
        executivePaths,
        userRole.ExecutiveDirector
      );
      break;
    case userRole.ManagingDirector:
      sidebarItems = sidebarItemsGenerator(
        managingPaths,
        userRole.ManagingDirector
      );
      break;
    case userRole.GeneralDirector:
      sidebarItems = sidebarItemsGenerator(
        generalPaths,
        userRole.GeneralDirector
      );
      break;
    case userRole.Coordinator:
      sidebarItems = sidebarItemsGenerator(
        coordinatorPaths,
        userRole.Coordinator
      );
      break;

    default:
      break;
  }

  const handleOpenChange = (keys: []) => {
    if (openKeys.length == 1) {
      keys.shift();
      setOpenKeys(keys);
      return;
    }
    setOpenKeys(keys);
  };
  return (
    <Sider
      style={{
        // width: "100%",
        height: "100%",
        minHeight: "100vh",
        position: "sticky",
        top: "0",
        left: "0",
      }}
      // width={250}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="m-5">
        <img src={logo} alt="logo" />
      </div>
      <Menu
        openKeys={openKeys}
        onOpenChange={(keys: string[]) => handleOpenChange(keys as [])}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems as []}
      />
    </Sider>
  );
};

export default SideBar;
