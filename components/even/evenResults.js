import currencyFormatter from "@/helpers/currencyFormatter";
import { Button, Col, Form } from "react-bootstrap";

const EvenResults = ({ bill, setBill, emptyBill, setScreen, setPage }) => {
  const backToHome = () => {
    setScreen("none");
  };

  const clearBill = () => {
    setBill(emptyBill);
    setPage("info");
  };

  return (
    <div className="d-flex flex-column mb-4">
      <h5>Bill split results</h5>
      <div>
        <Col className="my-3">
          <Form.Group controlId="total">
            <Form.Label>Original Total</Form.Label>
            <Form.Control
              className="h-100"
              type="text"
              value={currencyFormatter(bill.total)}
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
              value={currencyFormatter(bill.tip)}
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
              value={currencyFormatter(bill.totalWithTip)}
              disabled
            />
          </Form.Group>
        </Col>
        <Col className="my-3">
          <Form.Group controlId="splitAmount">
            <Form.Label>Total Per Person</Form.Label>
            <Form.Control
              className="h-100"
              type="text"
              value={currencyFormatter(bill.splitAmount)}
              disabled
            />
          </Form.Group>
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

export default EvenResults;
