import currencyFormatter from "@/helpers/currencyFormatter";
import { Button, Col, Form } from "react-bootstrap";

const ItemsResults = ({ bill, emptyBill, setScreen, setPage, setResults }) => {
  const backToHome = () => {
    setScreen("none");
  };

  const clearBill = () => {
    bill.current = emptyBill;

    setPage("info");

    setResults(false);
  };

  return (
    <div className="d-flex flex-column">
      <h5>Bill split by items result</h5>
      <div>
        <Col className="my-3">
          <Form.Group controlId="total">
            <Form.Label>Original Total</Form.Label>
            <Form.Control
              className="h-100"
              type="text"
              value={currencyFormatter(bill.current.total)}
              disabled
            />
          </Form.Group>
        </Col>
        <Col className="my-3">
          <Form.Group controlId="tip">
            <Form.Label>Total Tip</Form.Label>
            <Form.Control
              className="h-100"
              type="text"
              value={currencyFormatter(bill.current.tip)}
              disabled
            />
          </Form.Group>
        </Col>
        <Col className="my-3">
          <Form.Group controlId="totalWithTip">
            <Form.Label>Total Including Tip</Form.Label>
            <Form.Control
              className="h-100"
              type="text"
              value={currencyFormatter(bill.current.totalWithTip)}
              disabled
            />
          </Form.Group>
        </Col>
        <Col className="my-3">
          <Form.Label>Totals Per Person</Form.Label>
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
        </Col>
      </div>
      <div className="d-flex flex-row justify-content-between">
        <Button className="green-button btn-sm" onClick={clearBill}>
          New Split
        </Button>
        <Button className="green-button btn-sm" onClick={backToHome}>
          Home
        </Button>
      </div>
    </div>
  );
};

export default ItemsResults;
