import { Container } from "react-bootstrap";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container className="mt-4">{children}</Container>
    </>
  );
};

export default Layout;
