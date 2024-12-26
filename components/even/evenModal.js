import { Modal } from "react-bootstrap";
import styles from "@/styles/evenModal.module.css";
import currencyFormatter from "@/helpers/currencyFormatter";

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
        </Modal>
    );
};

export default EvenModal;