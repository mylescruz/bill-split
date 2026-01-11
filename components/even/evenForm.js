import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import styles from "@/styles/evenForm.module.css";
const MAX_SALES_TAX_PERCENTAGE = 0.125;

const EvenForm = ({ emptyBill, openSplitModal }) => {
  const [billDetails, setBillDetails] = useState(emptyBill);
  const [customTip, setCustomTip] = useState(false);

  const handleInput = (e) => {
    const input = e.target.value;

    if (input !== "Custom") setCustomTip(false);
    else setCustomTip(true);

    setBillDetails({ ...billDetails, [e.target.id]: e.target.value });
  };

  const handleNumInput = (e) => {
    const input = e.target.value;

    if (input == "") setBillDetails({ ...billDetails, [e.target.id]: input });
    else setBillDetails({ ...billDetails, [e.target.id]: parseFloat(input) });
  };

  const handleCustomTip = (e) => {
    const input = e.target.value;

    if (input == "") setBillDetails({ ...billDetails, tip: input });
    else setBillDetails({ ...billDetails, tip: parseFloat(input) });
  };

  const SplitBill = (e) => {
    e.preventDefault();

    // Calculate the subtotal, tax, tip and total
    const subTotal = billDetails.total - billDetails.tax;
    const taxPercentage = billDetails.tax / subTotal;

    // The calculated tax percentage should not be greater than the max sales tax percentage in the United States
    if (taxPercentage > MAX_SALES_TAX_PERCENTAGE) {
      window.alert("Invalid total and/or tax amounts");
      return;
    }

    if (!customTip) {
      billDetails.tip = subTotal * billDetails.tipPercentage;
    }

    billDetails.totalWithTip = billDetails.total + billDetails.tip;
    billDetails.splitAmount = billDetails.totalWithTip / billDetails.people;

    openSplitModal(billDetails);
    setBillDetails(emptyBill);
    setCustomTip(false);
  };

  return (
    <Form onSubmit={SplitBill}>
      <Col className="col-12 col-md-6 col-lg-4 my-3">
        <Form.Group controlId="total">
          <Form.Label>What was the bill&#39;s total cost?</Form.Label>
          <Form.Control
            className="h-100"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Total"
            value={billDetails.total}
            onChange={handleNumInput}
            required
          />
        </Form.Group>
      </Col>
      <Col className="col-12 col-md-6 col-lg-4 my-3">
        <Form.Group controlId="tax">
          <Form.Label>What was the tax amount on the bill?</Form.Label>
          <Form.Control
            className="h-100"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Tax"
            value={billDetails.tax}
            onChange={handleNumInput}
            required
          />
        </Form.Group>
      </Col>
      <Col className="col-12 col-md-6 col-lg-4 my-3">
        <Form.Group controlId="tipPercentage">
          <Form.Label>How much do you want to tip?</Form.Label>
          <Form.Select
            className="h-100"
            placeholder="Tip"
            value={billDetails.tipPercentage}
            onChange={handleInput}
            required
          >
            <option disabled>Tip Percentage</option>
            <option value="0.15">15%</option>
            <option value="0.18">18%</option>
            <option value="0.20">20%</option>
            <option value="Custom">Custom</option>
          </Form.Select>
        </Form.Group>
      </Col>
      {customTip && (
        <Col className="col-12 col-md-6 col-lg-4 my-3">
          <Form.Group controlId="customTip">
            <Form.Label>What is the custom tip or gratuity amount?</Form.Label>
            <Form.Control
              className="h-100"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Tip/Gratuity ($)"
              value={billDetails.tip}
              onChange={handleCustomTip}
              required
            />
          </Form.Group>
        </Col>
      )}
      <Col className="col-12 col-md-6 col-lg-4 my-3">
        <Form.Group controlId="people">
          <Form.Label>How many people are splitting this bill?</Form.Label>
          <Form.Control
            className="h-100"
            type="number"
            min="2"
            step="1"
            placeholder="People"
            value={billDetails.people}
            onChange={handleNumInput}
            required
          />
        </Form.Group>
      </Col>
      <Form.Group className="my-3">
        <Button className="green-button" id={styles.splitEvenBtn} type="submit">
          Split
        </Button>
      </Form.Group>
    </Form>
  );
};

export default EvenForm;
