import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}