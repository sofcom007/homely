import { Outlet, ScrollRestoration, useLocation } from "react-router-dom"
//context
import { ApiUrlProvider } from "../context/apiContext"

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <ApiUrlProvider>
        <ScrollRestoration />
        <Outlet />
      </ApiUrlProvider>
    </>
  );
}