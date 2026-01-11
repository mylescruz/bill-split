import styles from "@/styles/layout.module.css";
import Link from "next/link";
import { Button, Container, Navbar } from "react-bootstrap";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container className={`${styles.container} content mx-auto`}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
