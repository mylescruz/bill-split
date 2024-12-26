import Link from "next/link";
import { Button, Col, Row } from "react-bootstrap";
import styles from "@/styles/home.module.css";

const Home = () => {
    return (
        <>
            <h4 className="text-center mx-4 my-2">Split your bill <br/> evenly or by item</h4>
            <Row className="w-75 text-center mx-auto">
                <Col className="col-6 my-4">
                    <Button as={Link} href="/even" className="green-button btn-lg" id={styles.evenBtn}>Even</Button>
                </Col>
                <Col className="col-6 my-4">
                    <Button as={Link} href="/item" className="green-button btn-lg" id={styles.itemBtn}>Item</Button>
                </Col>
            </Row>
        </>
    );
};

export default Home;