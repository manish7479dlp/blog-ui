import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
        <main className="mainContainer">{children}</main>
        
    </>
  );
};

export default Layout;
