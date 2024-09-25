import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import logo from "../../assets/image/logo.png";
import { userRole } from "../../constants/userRole";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hook";
import { adminPaths } from "../../route/admin.routes";
import { coordinatorPaths } from "../../route/Coordinator.routes";
import { executivePaths } from "../../route/ExecutiveDirector.routes";
import { generalPaths } from "../../route/generalDirector.routes";
import { managingPaths } from "../../route/ManagingDirector.routes";
import { sidebarItemsGenerator } from "../../utilis/sidebarItemsGenerator";
import { verifyToken } from "../../utilis/verifyToken";

const SideBar = () => {
  const [openKeys, setOpenKeys] = useState([]);

  const token = useAppSelector(useCurrentToken);
  // const user = {
  //   role: userRole.ADMIN,
  //   // role: userRole.ExecutiveDirector,
  //   // role: userRole.ManagingDirector,
  //   // role: userRole.GeneralManager,
  //   // role: userRole.Coordinator,
  // };
  let user;
  if (token) {
    user = verifyToken(token);
  }
  let sidebarItems;

  switch (user!.role) {
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
    case userRole.GeneralManager:
      sidebarItems = sidebarItemsGenerator(
        generalPaths,
        userRole.GeneralManager
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
        width: "100%",
      }}
      width={250}
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
