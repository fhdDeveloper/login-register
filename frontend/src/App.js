import Router from "./routes";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {  HelmetProvider } from 'react-helmet-async';

const helmetContext = {};

function App() {

  return (
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <Router />
        <ToastContainer rtl={true} />
        <Outlet />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
