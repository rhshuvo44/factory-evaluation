import { Avatar, Button, Dropdown, Layout, MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import userImg from "../../assets/image/user.jpg";
const { Header } = Layout;
const items: MenuProps["items"] = [
  {
    label: <NavLink to={`/me`}>Profile</NavLink>,
    key: "profile",
  },
  {
    label: "Settings",
    key: "settings",
  },

  {
    type: "divider",
  },
  {
    label:<Button>Logout</Button>,
    key: "logout",
  },
];
const HeaderMenu = () => {
  const date = new Date();
  return (
    <Header className="flex items-center gap-1 md:gap-5 justify-between">
      <div className="flex items-center md:px-8 text-white justify-center">
        <h3 className="text-sm md:font-bold md:text-2xl lg:text-3xl capitalize text-primary md:mr-3">
          Hello Ripon,
        </h3>
        <p className="hidden md:block lg:mt-3"> {date.toDateString()}</p>
      </div>

      <Dropdown menu={{ items }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Avatar
            src={userImg}
            alt="avatar"
            size={{ xs: 24, sm: 32, md: 40, lg: 50, xl: 56, xxl: 60 }}
          />
        </a>
      </Dropdown>
    </Header>
  );
};

export default HeaderMenu;
