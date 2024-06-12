"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicRoute = ["sign-in", "sign-up"].includes(pathname.split("/")[1]);

  const getNavbar = () => {
    return <Navbar />;
  };

  const getFooter = () => {
    return <Footer />;
  };

  const getContent = () => {
    return <>{children}</>;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {!isPublicRoute && getNavbar()}
      {getContent()}
      {getFooter()}
    </div>
  );
}

export default LayoutProvider;
