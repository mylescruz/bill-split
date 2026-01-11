import { Container } from "react-bootstrap";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="mx-4 mt-4">{children}</main>
    </>
  );
};

export default Layout;
