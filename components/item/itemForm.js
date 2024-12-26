import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "@/styles/itemForm.module.css";

const ItemForm = ({ emptyBill }) => {    
    const [billDetails, setBillDetails] = useState(emptyBill);
    const [custom, setCustom] = useState(false);

    const handleInput = (e) => {
        const input = e.target.value;

        if (input !== "Custom")
            setCustom(false);
        else
            setCustom(true);

        setBillDetails({ ...billDetails, [e.target.id]: e.target.value});
    };

    const handleNumInput = (e) => {
        const input = e.target.value;

        if (input == '')
            setBillDetails({ ...billDetails, [e.target.id]: input });
        else
            setBillDetails({ ...billDetails, [e.target.id]: parseFloat(input) });
    };

    const handleCustomTip = (e) => {
        const input = e.target.value;

        if (input == '')
            setBillDetails({ ...billDetails, tip: input });
        else
            setBillDetails({ ...billDetails, tip: parseFloat(input) });
    };

    return (
        <Form>
            <Form.Group className="form-input">
                <Form.Control id="total" className="h-100 w-75 mx-auto" type="number" min="0.01" step="0.01" placeholder="Total" value={billDetails.total} onChange={handleNumInput} required />
            </Form.Group>
            <Form.Group className="form-input">
                <Form.Control id="tax" className="h-100 w-75 mx-auto" type="number" min="0.01" step="0.01" placeholder="Tax" value={billDetails.tax} onChange={handleNumInput} required />
            </Form.Group>
            <Form.Group className="form-input">
                <Form.Select id="tipPercentage" className="h-100 w-75 mx-auto" placeholder="Tip" value={billDetails.tipPercentage} onChange={handleInput} required>
                    <option disabled>Tip Percentage</option>
                    <option value="0.15">15%</option>
                    <option value="0.18">18%</option>
                    <option value="0.20">20%</option>
                    <option value="Custom">Custom</option>
                </Form.Select>
            </Form.Group>
            {custom &&
            <Form.Group className="form-input">
                <Form.Control id="customTip" className="h-100 w-75 mx-auto" type="number" min="0.01" step="0.01" placeholder="Tip/Gratuity ($)" value={billDetails.tip} onChange={handleCustomTip} required />
            </Form.Group>
            }
            <Form.Group className="form-input text-center my-2">
                <Button className="green-button" id={styles.splitItemBtn}>Next</Button>
            </Form.Group>
        </Form>
    );
};

export default ItemForm;