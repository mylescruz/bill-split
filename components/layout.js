import styles from "@/styles/layout.module.css";
import { Button, Col, Container, Row } from "react-bootstrap";

const Layout = () => {
    return (
        <>
            <h1 className={styles.title}>Bill Splitter</h1>
            <Container className={`${styles.container} mx-auto w-75`}>
                <h4 className="text-center mx-4 my-2">Split your bill <br/> evenly or by item</h4>
                <Row className="w-50 text-center mx-auto">
                    <Col className="col-6 my-4">
                        <Button className={styles.button}>Even</Button>
                    </Col>
                    <Col className="col-6 my-4">
                        <Button className={styles.button}>Item</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Layout;