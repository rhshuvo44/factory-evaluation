import { List, Typography } from "antd";
import { useGetNotificationQuery } from "../redux/features/notification/notificationApi";
import { TNotification } from "../types";

const Notification = () => {
  const { data: notifications } = useGetNotificationQuery({});

  return (
    <div>
      <Typography.Title level={2}>Notifications</Typography.Title>
      <List
        bordered
        dataSource={notifications?.data}
        renderItem={(item: TNotification, index) => (
          <List.Item key={index}>
            <Typography.Text>{item?.message}</Typography.Text>
            <Typography.Text type="secondary" style={{ marginLeft: "10px" }}>
              {item?.date?.toLocaleString()} {/* Format the date */}
            </Typography.Text>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Notification;
