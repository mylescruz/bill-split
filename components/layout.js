import styles from "@/styles/layout.module.css";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
    return (
        <>
            <h1 className={styles.title}>Bill Splitter</h1>
            <Container className={`${styles.container} mx-auto w-75`}>
                {children}
            </Container>
        </>
    );
};

export default Layout;