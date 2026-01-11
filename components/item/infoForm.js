import { Button, Col, Form } from "react-bootstrap";
import styles from "@/styles/infoForm.module.css";
const MAX_SALES_TAX_PERCENTAGE = 0.125;

const InfoForm = ({ bill, setBill, setPage }) => {
  const handleInput = (e) => {
    const input = e.target.value;

    if (input === "Custom") {
      setBill({ ...bill, customTip: true });
    } else {
      setBill({ ...bill, customTip: false });
    }

    setBill({ ...bill, [e.target.id]: e.target.value });
  };

  const handleNumInput = (e) => {
    const input = e.target.value;

    if (input == "") {
      setBill({ ...bill, [e.target.id]: input });
    } else {
      setBill({ ...bill, [e.target.id]: parseFloat(input) });
    }
  };

  const handleCustomTip = (e) => {
    const input = e.target.value;

    if (input == "") {
      setBill({ ...bill, tip: input });
    } else {
      setBill({ ...bill, tip: parseFloat(input) });
    }
  };

  const enterInfo = (e) => {
    e.preventDefault();

    const subTotal = bill.total - bill.tax;

    const taxPercentage = bill.tax / subTotal;

    // The calculated tax percentage should not be greater than the max sales tax percentage in the United States
    if (taxPercentage > MAX_SALES_TAX_PERCENTAGE) {
      window.alert("Invalid total and/or tax amounts");
      return;
    }

    let tip = bill.tip;

    // If the user enters a custom tip, set the flag
    if (!bill.customTip) {
      tip = parseFloat(subTotal * bill.tipPercentage);
    }

    const totalWithTip = parseFloat(bill.total + tip);

    setBill({
      ...bill,
      subTotal: subTotal,
      taxPercentage: taxPercentage,
      tip: tip,
      totalWithTip: totalWithTip,
      remainingTotal: subTotal,
    });

    setPage("people");
  };

  return (
    <>
      <h4>Enter the bill&#39;s information</h4>
      <Form onSubmit={enterInfo}>
        <Col className="my-3">
          <Form.Group controlId="total">
            <Form.Label>What was the bill&#39;s total cost?</Form.Label>
            <Form.Control
              className="h-100"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Total"
              value={bill.total}
              onChange={handleNumInput}
              required
            />
          </Form.Group>
        </Col>
        <Col className="my-3">
          <Form.Group controlId="tax">
            <Form.Label>What was the tax amount on the bill?</Form.Label>
            <Form.Control
              className="h-100"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Tax"
              value={bill.tax}
              onChange={handleNumInput}
              required
            />
          </Form.Group>
        </Col>
        <Col className="my-3">
          <Form.Group controlId="tipPercentage">
            <Form.Label>How much do you want to tip?</Form.Label>
            <Form.Select
              className="h-100"
              placeholder="Tip"
              value={bill.tipPercentage}
              onChange={handleInput}
              required
            >
              <option disabled>Tip Percentage</option>
              <option value="0.15">15%</option>
              <option value="0.18">18%</option>
              <option value="0.20">20%</option>
              <option value="Custom">Custom/Gratuity</option>
            </Form.Select>
          </Form.Group>
        </Col>
        {bill.customTip && (
          <Col className="my-3">
            <Form.Group controlId="customTip">
              <Form.Label>
                What is the custom tip or gratuity amount?
              </Form.Label>
              <Form.Control
                className="h-100"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Tip/Gratuity ($)"
                value={bill.tip}
                onChange={handleCustomTip}
                required
              />
            </Form.Group>
          </Col>
        )}
        <Form.Group className="my-3">
          <Button
            className="green-button"
            id={styles.splitItemBtn}
            type="submit"
          >
            Next
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default InfoForm;
