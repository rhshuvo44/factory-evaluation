import { Layout, Menu } from "antd";

const { Header } = Layout;

const items = [
  {
    key: "header",
    label: "Home",
    to: "/",
  },
];
const HeaderMenu = () => {
  const date = new Date();
  return (
    <Header className="flex items-center gap-5">
      <div className="flex justify-content-center items-center text-white">
        <h1 className="text-white font-bold md:text-2xl lg:text-3xl">Sarkar Group</h1>
      </div>
      <div className="flex items-center px-8 text-white justify-center">
        <h3 className="font-bold md:text-2xl lg:text-3xl capitalize text-primary mr-3">
          Hello Ripon,
        </h3>
        <p className="lg:mt-3"> {date.toDateString()}</p>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
        className="flex justify-end"
      />
    </Header>
  );
};

export default HeaderMenu;
