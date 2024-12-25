import Link from "next/link";
import { Button, Col, Row } from "react-bootstrap";
import styles from "@/styles/homePage.module.css";

const Home = () => {
    return (
        <>
            <h4 className="text-center mx-4 my-2">Split your bill <br/> evenly or by item</h4>
            <Row className="w-50 text-center mx-auto">
                <Col className="col-6 my-4">
                    <Button as={Link} href="/even" className={styles.button}>Even</Button>
                </Col>
                <Col className="col-6 my-4">
                    <Button as={Link} href="/item" className={styles.button}>Item</Button>
                </Col>
            </Row>
        </>
    );
};

export default Home;