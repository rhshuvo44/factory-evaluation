import { Layout, Menu } from "antd";

const { Header } = Layout;

const items = new Array(3).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}));
const HeaderMenu = () => {
  return (
    <Header className="flex items-center">
      <div className="flex justify-content-center items-center text-white">
        <h1 className="text-white font-bold lg:text-3xl">Sarkar Group</h1>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
};

export default HeaderMenu;
