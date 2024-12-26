import { Modal } from "react-bootstrap";
import styles from "@/styles/evenModal.module.css";

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
                <p>Tax: {bill.tax}</p>
                <p>Total Tip: {bill.tip}</p>
                <p>Bill Total: {bill.totalWithTip}</p>
                <p>Total Per Person: {bill.splitAmount}</p> 
            </Modal.Body>
        </Modal>
    );
};

export default EvenModal;