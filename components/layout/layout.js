import styles from "@/styles/layout.module.css";
import { Container } from "react-bootstrap";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container
        className={`${styles.container} col-11 col-md-8 col-lg-4 mx-auto`}
      >
        {children}
      </Container>
    </>
  );
};

export default Layout;
