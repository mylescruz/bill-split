import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import styles from "@/styles/evenForm.module.css";

const EvenForm = () => {
    const emptyBill = {
        total: 0,
        tax: 0,
        tip: 0,
        people: 2
    };
    
    const [bill, setBill] = useState(emptyBill);

    const handleInput = (e) => {
        setBill({ ...bill, [e.target.id]: e.target.value});
    };

    const handleNumInput = (e) => {
        const input = e.target.value;

        if (input == '')
            setBill({ ...bill, [e.target.id]: input });
        else
            setBill({ ...bill, [e.target.id]: parseFloat(input) });
    };

    const SplitBill = (e) => {
        e.preventDefault();

        setBill(emptyBill);
    };

    return (
        <Form onSubmit={SplitBill}>
            <Form.Group className="form-input">
                <Row className="mx-2 d-flex justify-content-between">
                    <Col className="col-2">
                        <Form.Label className="mt-1">Total</Form.Label>
                    </Col>
                    <Col className="col-8">
                        <Form.Control id="total" className="h-100" type="number" min="0.01" step="0.01" value={bill.total} onChange={handleNumInput} required />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="form-input">
                <Row className="mx-2 d-flex justify-content-between">
                    <Col className="col-2">
                        <Form.Label className="mt-1">Tax</Form.Label>
                    </Col>
                    <Col className="col-8">
                        <Form.Control id="tax" className="h-100" type="number" min="0.01" step="0.01" value={bill.tax} onChange={handleNumInput} required />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="form-input">
                <Row className="mx-2 d-flex justify-content-between">
                    <Col className="col-2">
                        <Form.Label className="mt-1">Tip</Form.Label>
                    </Col>
                    <Col className="col-8">
                        <Form.Select id="tip" className="h-100" value={bill.tip} onChange={handleInput} required>
                            <option value="15">15%</option>
                            <option value="18">18%</option>
                            <option value="20">20%</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="form-input">
                <Row className="mx-2 d-flex justify-content-between">
                    <Col className="col-2">
                        <Form.Label className="mt-1">People</Form.Label>
                    </Col>
                    <Col className="col-8">
                        <Form.Control id="people" className="h-100" type="number" min="2" step="1" value={bill.people} onChange={handleNumInput} required />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="form-input text-center my-2">
                <Button className={`${styles.button} btn-lg`} type="submit">Split</Button>
            </Form.Group>
        </Form>
    );
};

export default EvenForm;