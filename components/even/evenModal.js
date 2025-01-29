import { Button, Modal } from "react-bootstrap";
import styles from "@/styles/evenModal.module.css";
import currencyFormatter from "@/helpers/currencyFormatter";
import Link from "next/link";

const EvenModal = ({ bill, split, setSplit }) => {
    const closeEvenModal = () => {
        setSplit(false);
    };

    return (
        <Modal show={split} centered onHide={closeEvenModal}>
            <Modal.Header closeButton className={styles.modal}>
                <Modal.Title>Bill split between {bill.people} people</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modal}>
                <p>Original Total: {currencyFormatter.format(bill.total)}</p>
                <p>Total Tip: {currencyFormatter.format(bill.tip)}</p>
                <p>Total including Tip: {currencyFormatter.format(bill.totalWithTip)}</p>
                <p>Total Per Person: {currencyFormatter.format(bill.splitAmount)}</p> 
            </Modal.Body>
            <Modal.Footer className={styles.modal}>
                <Button as={Link} href="/" className="white-button" id={styles.homeBtn}>Home</Button>
                <Button className="white-button" id={styles.newSplitBtn} as={Link} href="/even" onClick={closeEvenModal}>New Split</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EvenModal;