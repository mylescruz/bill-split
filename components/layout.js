import styles from "@/styles/layout.module.css";
import { Container, Navbar } from "react-bootstrap";

const Layout = ({ children }) => {
    return (
        <>
            <Navbar>
                <Navbar.Brand href="/" className={`${styles.title} mx-auto`}>Bill Splitter</Navbar.Brand>
            </Navbar>
            <Container className={`${styles.container} mx-auto w-75`}>
                {children}
            </Container>
        </>
    );
};

export default Layout;