import { Button, Modal } from "react-bootstrap";
import styles from "@/styles/splitModal.module.css";
import Link from "next/link";
import currencyFormatter from "@/helpers/currencyFormatter";

const SplitModal = ({ bill, emptyBill, split, setPage }) => {
  const closeSplitModal = () => {
    bill.current = emptyBill;

    setPage("info");
  };

  return (
    <Modal centered show={split} onHide={closeSplitModal}>
      <Modal.Header className={styles.modal}>
        <Modal.Title>Bill split by items</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modal}>
        <h5 className="text-center mt-2">Bill Totals</h5>
        <p className="my-0">
          Original Total:{" "}
          <span className="float-end">
            {currencyFormatter(bill.current.total)}
          </span>
        </p>
        <p className="my-0">
          Total Tip:{" "}
          <span className="float-end">
            {currencyFormatter(bill.current.tip)}
          </span>
        </p>
        <p className="my-0">
          Total including Tip:{" "}
          <span className="float-end">
            {currencyFormatter(bill.current.totalWithTip)}
          </span>
        </p>

        <h5 className="text-center mt-2">Totals Per Person</h5>
        {bill.current.people.map((person) =>
          person.name === "Shared" ? (
            person.items.length > 0 && (
              <div key={person.id}>
                <h6 className="text-decoration-underline mb-0 mt-2">
                  {person.name}
                </h6>
                <p className="my-0">
                  Ordered:{" "}
                  {person.items.map((item) => (
                    <span key={item.id}>
                      {item.name} ({currencyFormatter(item.price)}){" "}
                    </span>
                  ))}
                </p>
                <p className="my-0">
                  SubTotal:{" "}
                  <span className="float-end">
                    {currencyFormatter(person.subTotal)}
                  </span>
                </p>
                <p className="my-0">
                  Each Person&#39;s Share:{" "}
                  <span className="float-end">
                    {currencyFormatter(
                      person.subTotal / (bill.current.people.length - 1)
                    )}
                  </span>
                </p>
              </div>
            )
          ) : (
            <div key={person.id}>
              <h6 className="text-decoration-underline mb-0 mt-2">
                {person.name}
              </h6>
              <p className="my-0">
                Ordered:{" "}
                {person.items.map((item) => (
                  <span key={item.id}>
                    {item.name} ({currencyFormatter(item.price)}){" "}
                  </span>
                ))}
              </p>
              <p className="my-0">
                SubTotal:{" "}
                <span className="float-end">
                  {currencyFormatter(person.subTotal)}
                </span>
              </p>
              <p className="my-0">
                Tax:{" "}
                <span className="float-end">
                  {currencyFormatter(person.tax)}
                </span>
              </p>
              <p className="my-0">
                Tip:{" "}
                <span className="float-end">
                  {currencyFormatter(person.tip)}
                </span>
              </p>
              <p className="my-0">
                Total:{" "}
                <span className="float-end">
                  {currencyFormatter(person.total)}
                </span>
              </p>
            </div>
          )
        )}
      </Modal.Body>
      <Modal.Footer className={styles.modal}>
        <Button as={Link} href="/" className="white-button" id={styles.homeBtn}>
          Home
        </Button>
        <Button
          className="white-button"
          id={styles.newSplitBtn}
          onClick={closeSplitModal}
        >
          New Split
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SplitModal;
