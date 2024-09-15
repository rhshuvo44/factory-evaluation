import { Avatar, Dropdown, Layout, MenuProps } from "antd";
import userImg from "../../assets/image/user.jpg";
const { Header } = Layout;

const items: MenuProps["items"] = [
  {
    label: "Profile",
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
    label: "Logout",
    key: "1",
  },
];
const HeaderMenu = () => {
  const date = new Date();
  return (
    <Header className="flex items-center gap-5 justify-between">
      {/* <div className="flex justify-content-center items-center text-white">
        <h1 className="text-white font-bold md:text-2xl lg:text-3xl">
          Sarkar Group
        </h1>
      </div> */}
      <div className="flex items-center px-8 text-white justify-center">
        <h3 className="font-bold md:text-2xl lg:text-3xl capitalize text-primary mr-3">
          Hello Ripon,
        </h3>
        <p className="lg:mt-3"> {date.toDateString()}</p>
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
