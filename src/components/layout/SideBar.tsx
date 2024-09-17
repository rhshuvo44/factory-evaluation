import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { adminPaths } from "../../route/admin.routes";
import { coordinatorPaths } from "../../route/Coordinator.routes";
import { executivePaths } from "../../route/ExecutiveDirector.routes";
import { generalPaths } from "../../route/generalDirector.routes";
import { managingPaths } from "../../route/ManagingDirector.routes";
import { sidebarItemsGenerator } from "../../utilis/sidebarItemsGenerator";

const userRole = {
  ADMIN: "admin",
  ExecutiveDirector: "executive-director",
  ManagingDirector: "managing-director",
  GeneralManager: "general-director",
  Coordinator: "coordinator",
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

  return (
    <Sider
      width={250}
      breakpoint="lg"
      collapsedWidth="0"
      className="overflow-auto"
      style={{
        width: "100%",
      }}
    >
      <div className="m-5">
        <h1 className="text-white font-bold md:text-2xl lg:text-3xl">
          Sarkar Group
        </h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems as []}
      />
    </Sider>
  );
};

export default SideBar;
