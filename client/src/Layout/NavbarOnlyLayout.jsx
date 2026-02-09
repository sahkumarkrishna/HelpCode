import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function NavbarOnlyLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
    </>
  );
}
