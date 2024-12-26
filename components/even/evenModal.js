import { Modal } from "react-bootstrap";
import styles from "@/styles/evenModal.module.css";

const EvenModal = ({ bill, split, setSplit }) => {
    const closeEvenModal = () => {
        setSplit(false);
    };

    return (
        <Modal show={split} centered onHide={closeEvenModal}>
            <Modal.Header closeButton className={styles.modal}>
                <Modal.Title>Your bill&#39;s split between {bill.people} people</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modal}>
                <p>Tax: <span id="even-tip-amount">${bill.tax}</span> </p>
                <p>Bill Total: <span id="even-total-amount">${bill.total}</span> </p>
                <p>Each Person: <span id="split-amount">$</span> </p> 
            </Modal.Body>
        </Modal>
    );
};

export default EvenModal;