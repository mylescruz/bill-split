import { Button, Modal } from "react-bootstrap";
import styles from "@/styles/splitModal.module.css";
import Link from "next/link";
import currencyFormatter from "@/helpers/currencyFormatter";

const SplitModal = ({ bill, setBill, emptyBill, split, setSplit, setShowItems, setShowInfo }) => {
    const closeSplitModal = () => {
        setBill(emptyBill);
        
        setSplit(false);
        setShowItems(false);
        setShowInfo(true);
    };

    return (
        <Modal centered show={split} onHide={closeSplitModal}>
            <Modal.Header className={styles.modal}>
                <Modal.Title>Bill split by items</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modal}>
                <h5 className="text-center mt-2">Bill Totals</h5>
                <p className="my-0">Original Total: <span className="float-end">{currencyFormatter.format(bill.total)}</span></p>
                <p className="my-0">Total Tip: <span className="float-end">{currencyFormatter.format(bill.tip)}</span></p>
                <p className="my-0">Total including Tip: <span className="float-end">{currencyFormatter.format(bill.totalWithTip)}</span></p>

                <h5 className="text-center mt-2">Totals Per Person</h5>
                {bill.people.map(person => (
                    <div key={person.id}>
                        <h6 className="text-decoration-underline mb-0 mt-2">{person.name}</h6>
                        <p className="my-0">
                            Ordered: {person.items.map(item => (<span key={item.id}>{item.name} ({currencyFormatter.format(item.price)}) </span> ))}
                        </p>
                        <p className="my-0">SubTotal: <span className="float-end">{currencyFormatter.format(person.subTotal)}</span></p>
                        <p className="my-0">Tax: <span className="float-end">{currencyFormatter.format(person.tax)}</span></p>
                        <p className="my-0">Tip: <span className="float-end">{currencyFormatter.format(person.tip)}</span></p>
                        <p className="my-0">Total: <span className="float-end">{currencyFormatter.format(person.total)}</span></p>
                    </div>
                ))}
            </Modal.Body>
            <Modal.Footer className={styles.modal}>
                <Button className="white-button" id={styles.newSplitBtn} as={Link} href="/item" onClick={closeSplitModal}>New Split</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default SplitModal;