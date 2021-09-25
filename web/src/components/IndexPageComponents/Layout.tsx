import React from "react";
import NavBar from "./NavBar";
import { Wrapper, WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variantType: WrapperVariant;
}

const Layout: React.FC<LayoutProps> = ({ children, variantType }) => {
  return (
    <>
      <Wrapper variant={variantType}>{children}</Wrapper>
    </>
  );
};

export default Layout;
