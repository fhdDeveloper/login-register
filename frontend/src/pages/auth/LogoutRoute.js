import { Logout } from "../../_mocks_/Logout";

const LogoutRoute = () => {
  Logout().then((res) => {
    window.location.href = "/login";
  });
};

export default LogoutRoute;