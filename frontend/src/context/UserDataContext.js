import { createContext, useState } from "react";

export const UserDataContext = createContext(undefined);

export const UserDataProvider = (props) => {
  const [userItems, setUserItems] = useState(
    {
      "user": {
        "id": null,
        "first_name": "",
        "last_name": "",
        "image": null,
        "email": "",
        "email_verified_at": null,
        "birthday": null,
        "personalId": "",
        "personalKey": "",
        "phone": "",
        "status": "loading"
      },
      "permissions": [],
      "status": "loading"
    }
  );
  return (
    <UserDataContext.Provider value={{ userItems, setUserItems }}>
      {props.children}
    </UserDataContext.Provider>
  );
};