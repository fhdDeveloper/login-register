import { Outlet } from "react-router-dom";

export default function LogoOnlyLayout({ children }) {
  return (
    <>
      {children}
      <Outlet />
    </>
  );
}

