import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { adminPaths } from "../../route/admin.routes";
import { executivePaths } from "../../route/ExecutiveDirector.routes";
import { sidebarItemsGenerator } from "../../utilis/sidebarItemsGenerator";

const userRole = {
  ADMIN: "admin",
  ExecutiveDirector: "ExecutiveDirector",
  ManagingDirector: "ManagingDirector",
  GeneralManager: "GeneralManager",
  Coordinator: "Coordinator",
};
const SideBar = () => {
  // const token = useAppSelector(useCurrentToken);

  const user = {
    role: userRole.ADMIN,
    // role: userRole.ExecutiveDirector,
    // role: userRole.ManagingDirector,
    // role: userRole.GeneralManager,
    // role: userRole.Coordinator,
  };
  // if (token) {
  //   user = verifyToken(token);
  // }
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
    // case userRole.ManagingDirector:
    //   sidebarItems = sidebarItemsGenerator(
    //     studentPaths,
    //     userRole.ManagingDirector
    //   );
    //   break;
    // case userRole.GeneralManager:
    //   sidebarItems = sidebarItemsGenerator(
    //     studentPaths,
    //     userRole.GeneralManager
    //   );
    //   break;
    // case userRole.Coordinator:
    //   sidebarItems = sidebarItemsGenerator(studentPaths, userRole.Coordinator);
    //   break;

    default:
      break;
  }

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
        items={sidebarItems}
      />
    </Sider>
  );
};

export default SideBar;
