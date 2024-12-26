import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "@/styles/evenForm.module.css";

const EvenForm = ({ openSplitModal }) => {
    const emptyBillDetails = {
        total: "",
        tax: "",
        tip: "",
        people: ""
    };
    
    const [billDetails, setBillDetails] = useState(emptyBillDetails);

    const handleInput = (e) => {
        setBillDetails({ ...billDetails, [e.target.id]: e.target.value});
    };

    const handleNumInput = (e) => {
        const input = e.target.value;

        if (input == '')
            setBillDetails({ ...billDetails, [e.target.id]: input });
        else
        setBillDetails({ ...billDetails, [e.target.id]: parseFloat(input) });
    };

    const SplitBill = (e) => {
        e.preventDefault();

        openSplitModal(billDetails);
        setBillDetails(emptyBillDetails);
    };

    return (
        <Form onSubmit={SplitBill}>
            <Form.Group className="form-input">
                <Form.Control id="total" className="h-100 w-75 mx-auto" type="number" min="0.01" step="0.01" placeholder="Total" value={billDetails.total} onChange={handleNumInput} required />
            </Form.Group>
            <Form.Group className="form-input">
                <Form.Control id="tax" className="h-100 w-75 mx-auto" type="number" min="0.01" step="0.01" placeholder="Tax" value={billDetails.tax} onChange={handleNumInput} required />
            </Form.Group>
            <Form.Group className="form-input">
                <Form.Select id="tip" className="h-100 w-75 mx-auto" placeholder="Tip" value={billDetails.tip} onChange={handleInput} required>
                    <option disabled>Tip Percentage</option>
                    <option value="0.15">15%</option>
                    <option value="0.18">18%</option>
                    <option value="0.20">20%</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="form-input">
                <Form.Control id="people" className="h-100 w-75 mx-auto" type="number" min="2" step="1" placeholder="Number of people" value={billDetails.people} onChange={handleNumInput} required />
            </Form.Group>
            <Form.Group className="form-input text-center my-2">
                <Button className="green-button" id={styles.splitEvenBtn} type="submit">Split</Button>
            </Form.Group>
        </Form>
    );
};

export default EvenForm;