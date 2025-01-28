import styles from "@/styles/layout.module.css";
import Link from "next/link";
import { Button, Container, Navbar } from "react-bootstrap";

const Layout = ({ children }) => {
    return (
        <>
            <Navbar>
                <Navbar.Brand href="/" className={`${styles.title} mx-auto`}>Bill Splitter</Navbar.Brand>
            </Navbar>
            <Container className={`${styles.container} mx-auto w-75`}>
                {children}
            </Container>
            <div className="text-center my-4">
                <Button as={Link} href="/" className="white-button" id={styles.homeBtn}>Home</Button>
            </div>
        </>
    );
};

export default Layout;