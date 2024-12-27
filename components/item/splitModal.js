import { Button, Modal } from "react-bootstrap";
import styles from "@/styles/splitModal.module.css";
import Link from "next/link";
import currencyFormatter from "@/helpers/currencyFormatter";

const SplitModal = ({ bill, split, setSplit, setShowItems, setShowInfo }) => {
    const closeSplitModal = () => {
        setSplit(false);
        setShowItems(false);
        setShowInfo(true);
    };

    return (
        <Modal centered show={split}>
            <Modal.Header className={styles.modal}>
                <Modal.Title>Bill split by items</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modal}>
                <h5 className="text-center mt-2">Bill Totals</h5>
                <p>Original Total: {currencyFormatter.format(bill.total)}</p>
                <p>Total Tip: {currencyFormatter.format(bill.tip)}</p>
                <p>Total including Tip: {currencyFormatter.format(bill.totalWithTip)}</p>

                <h5 className="text-center mt-2">Totals Per Person</h5>
                {bill.people.map(person => (
                    <>
                        <h6 key={person.id} className="text-decoration-underline mb-0 mt-2">{person.name}</h6>
                        <p className="my-0">
                            Items:{person.items.map(item => (<span key={item.id}>{item.name}: {currencyFormatter.format(item.price)}, </span> ))}
                        </p>
                        <p className="my-0">SubTotal: <span className="float-end">{currencyFormatter.format(person.subTotal)}</span></p>
                        <p className="my-0">Tax: <span className="float-end">{currencyFormatter.format(person.tax)}</span></p>
                        <p className="my-0">Tip: <span className="float-end">{currencyFormatter.format(person.tip)}</span></p>
                        <p className="my-0">Total: <span className="float-end">{currencyFormatter.format(person.total)}</span></p>
                    </>
                ))}
            </Modal.Body>
            <Modal.Footer className={styles.modal}>
                <Button className="green-button" as={Link} href="/item">New Split</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default SplitModal;