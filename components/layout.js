import styles from "@/styles/layout.module.css";
import Link from "next/link";
import { Button, Container, Navbar } from "react-bootstrap";

const Layout = ({ children }) => {
    return (
        <>
            <Navbar>
                <Navbar.Brand href="/" className={`${styles.title} mx-auto`}>Bill Splitter</Navbar.Brand>
            </Navbar>
            <Container className={`${styles.container} content mx-auto`}>
                {children}
            </Container>
        </>
    );
};

export default Layout;