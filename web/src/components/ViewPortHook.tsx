import React from "react";

const viewportContext = React.createContext({
  width: 0,
  height: 0,
});

const ViewportProvider = ({ children }) => {
  if (typeof window === "undefined") {
    return null;
  }

  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return <viewportContext.Provider value={{ width, height }}>{children}</viewportContext.Provider>;
};

export default ViewportProvider;
export const useViewport = () => {
  const { width, height } = React.useContext(viewportContext);
  return { width, height };
};
