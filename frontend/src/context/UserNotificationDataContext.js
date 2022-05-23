import { createContext, useState } from "react";

export const UserNotificationDataContext = createContext(undefined);

export const UserNotificationDataProvider = (props) => {
  const [userNotificationItems, setUserNotificationItems] = useState({
    notifications: [],
    unread: 0
  });
  return (
    <UserNotificationDataContext.Provider value={{ userNotificationItems, setUserNotificationItems }}>
      {props.children}
    </UserNotificationDataContext.Provider>
  );
};