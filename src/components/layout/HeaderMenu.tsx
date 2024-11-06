import { BellOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Dropdown,
  Flex,
  Layout,
  Menu,
  MenuProps,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import userImg from "../../../public/favicon.ico";
import { logout } from "../../redux/features/auth/authSlice";
import { useGetNotificationQuery } from "../../redux/features/notification/notificationApi";
import { useGetMeQuery } from "../../redux/features/user/userApi";
import { useAppDispatch } from "../../redux/hook";
import { TNotification } from "../../types";
const { Header } = Layout;

const HeaderMenu = () => {
  const { data } = useGetMeQuery(undefined);
  const { data: notifications, refetch } = useGetNotificationQuery(undefined);
  const dispatch = useAppDispatch();
  const lastFiveNotifications = Array.isArray(notifications?.data)
    ? notifications.data.slice(0, 5)
    : [];
  const [badgeCount, setBadgeCount] = useState(0); // Badge count for new notifications
  const [prevNotificationCount, setPrevNotificationCount] = useState(0);

  const items: MenuProps["items"] = [
    {
      label: <NavLink to={`/me`}>Profile</NavLink>,
      key: "profile",
    },
    {
      label: <NavLink to={`/settings`}>Settings</NavLink>,
      key: "settings",
    },

    {
      type: "divider",
    },
    {
      label: <Button onClick={() => dispatch(logout())}>Logout</Button>,
      key: "logout",
    },
  ];
  const date = new Date();

  // Function to handle dropdown click

  const handleBadgeClick = () => {
    setBadgeCount(0); // Clear badge count on click
    localStorage.setItem(
      `prevNotificationCount_${data?.data._id}`,
      notifications?.data?.length || 0
    ); // Reset count for the current user
  };

  // Load previous notification count for the current user on initial render
  useEffect(() => {
    const storedPrevCount = localStorage.getItem(
      `prevNotificationCount_${data?.data._id}`
    );
    if (storedPrevCount) {
      setPrevNotificationCount(parseInt(storedPrevCount, 10));
    }
  }, [data?.data._id]);

  // Refetch notifications every 10 seconds and update badge count if there are new notifications
  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch(); // Fetch new notifications

      const currentNotificationCount = notifications?.data?.length || 0;

      // Only increment badge if there are new notifications for this user
      if (currentNotificationCount > prevNotificationCount) {
        const newNotificationsCount =
          currentNotificationCount - prevNotificationCount;
        setBadgeCount((prev) => prev + newNotificationsCount);
        setPrevNotificationCount(currentNotificationCount);

        // Store the updated count for the current user
        localStorage.setItem(
          `prevNotificationCount_${data?.data._id}`,
          currentNotificationCount
        );
      }
    }, 10000); // 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [
    refetch,
    notifications?.data?.length,
    prevNotificationCount,
    data?.data._id,
  ]);
  const notificationMenu = (
    <Menu>
      {notifications?.data?.length === 0 ? (
        <Menu.Item disabled>No notifications</Menu.Item>
      ) : (
        lastFiveNotifications?.map((notify: TNotification, index: number) => (
          <>
            <Menu.Item key={index}>
              <Typography.Text>{notify?.message}</Typography.Text>
              <Typography.Text type="secondary" style={{ marginLeft: "10px" }}>
                {notify?.date?.toLocaleString()}
              </Typography.Text>
            </Menu.Item>
          </>
        ))
      )}
      <Divider />
      <Flex justify="center">
        <Button type="primary">
          <Link to="/notification">show all</Link>
        </Button>
      </Flex>
    </Menu>
  );
  // console.log(badge);

  return (
    <Header
      style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}
      className="flex items-center gap-1 md:gap-5 justify-between"
    >
      <div className="flex items-center md:px-8 text-white justify-center">
        <h3 className="text-sm md:font-bold md:text-2xl lg:text-3xl capitalize text-primary ">
          Hello {data?.data?.name},
        </h3>
        <small className=" hidden md:block mt-3 md:mr-3 md:font-bold md:text-lg text-[#00A9EA]">
          {data?.data?.role}
        </small>
        <p className="hidden md:block lg:mt-3"> {date.toDateString()}</p>
      </div>

      <div className="flex gap-4 justify-center items-center">
        <Dropdown overlay={notificationMenu} trigger={["click"]}>
          <Badge count={badgeCount}>
            <Avatar
              onClick={handleBadgeClick}
              alt="avatar"
              icon={<BellOutlined />}
              style={{ fontSize: "24px", cursor: "pointer" }}
            />
          </Badge>
        </Dropdown>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Avatar
              src={userImg}
              alt="avatar"
              icon={<UserOutlined />}
              size={{ xs: 24, sm: 32, md: 40, lg: 50, xl: 56, xxl: 60 }}
            />
          </a>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderMenu;
