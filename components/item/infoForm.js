import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "@/styles/infoForm.module.css";
const MAX_SALES_TAX_PERCENTAGE = 0.125;

const InfoForm = ({ setBill, emptyBill, setShowInfo, setShowPeople }) => {    
    const [billDetails, setBillDetails] = useState(emptyBill);
    const [customTip, setCustomTip] = useState(false);

    const handleInput = (e) => {
        const input = e.target.value;

        if (input === "Custom") {
            setBillDetails({ ...billDetails, customTip: true});
            setCustomTip(true);
        }
        else {
            setBillDetails({ ...billDetails, customTip: false});
            setCustomTip(false);
        }

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

    const enterInfo = (e) => {
        e.preventDefault();

        const subTotal = billDetails.total - billDetails.tax;
        const taxPercentage = billDetails.tax / subTotal;

        if (taxPercentage > MAX_SALES_TAX_PERCENTAGE) {
            window.alert('Invalid total and/or tax amounts');
            return;
        }
        billDetails.taxPercentage = taxPercentage;
        
        if (!customTip) {
            billDetails.tip = subTotal * billDetails.tipPercentage;
        } else {
            billDetails.customTip = true;
        }

        billDetails.totalWithTip = billDetails.total + billDetails.tip;
        billDetails.splitAmount = billDetails.totalWithTip / billDetails.people;

        setBill(billDetails);
        setBillDetails(emptyBill);
        setShowInfo(false);
        setShowPeople(true);
    };

    return (
        <Form onSubmit={enterInfo}>
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
                    <option value="Custom">Custom/Gratuity</option>
                </Form.Select>
            </Form.Group>
            {customTip &&
            <Form.Group className="form-input">
                <Form.Control id="customTip" className="h-100 w-75 mx-auto" type="number" min="0.01" step="0.01" placeholder="Tip/Gratuity ($)" value={billDetails.tip} onChange={handleCustomTip} required />
            </Form.Group>
            }
            <Form.Group className="form-input text-center my-2">
                <Button className="green-button" id={styles.splitItemBtn} type="submit">Next</Button>
            </Form.Group>
        </Form>
    );
};

export default InfoForm;