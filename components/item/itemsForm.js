import { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import styles from "@/styles/itemsForm.module.css";
import currencyFormatter from "@/helpers/currencyFormatter";
import SplitModal from "./splitModal";

const ItemsForm = ({ bill, setBill, emptyBill, setShowPeople, setShowItems, setShowInfo }) => {   
    const emptyItem = {
        id: 0,
        name: "",
        price: "",
        person: bill.people[0].name
    };

    const [item, setItem] = useState(emptyItem);
    const [allItems, setAllItems] = useState([]);
    const [split, setSplit] = useState(false);
    const [splitDisabled, setSplitDisabled] = useState(true);

    const handleInput = (e) => {
        const input = e.target.value;

        setItem({ ...item, [e.target.id]: input});
    };

    const handleNumInput = (e) => {
        const input = e.target.value;

        if (input == '')
            setItem({ ...item, [e.target.id]: input });
        else
            setItem({ ...item, [e.target.id]: parseFloat(input) });
    };

    const enterItems = (e) => {
        e.preventDefault();

        let maxID = 0;
        if (allItems.length > 0)
            maxID = Math.max(...allItems.map(item => item.id));

        item.id = maxID + 1;
        setAllItems([...allItems, item]);
        setBill({...bill, 
            items: [...bill.items, item]
        });
        bill.people.map(person => {
            if (person.name === item.person) {
                person.items = [...person.items, item]
            }
        });
        setItem(emptyItem);

        let allHaveItems = false;
        console.log(bill.people);
        for (let person of bill.people) {
            console.log("allHaveItems: ", allHaveItems);
            console.log("person: ", person);

            if (person.name === "Shared") {
                if (person.items.length > 0) {
                    allHaveItems = true;
                    break;
                }
            } else {
                if (person.items.length > 0) {
                    allHaveItems = true;
                } else {
                    allHaveItems = false;
                    break;
                }
            }
        };

        if (allHaveItems)
            setSplitDisabled(false);

        // if (bill.people.length >= 1)
        //     setSplitDisabled(false);
    };

    const splitItems = () => {
        console.log(bill);

        let sharedSubTotal = 0;
        bill.people.map(person => {
            let subTotal = 0;

            person.items.map(item => {
                subTotal += item.price;
            });

            if (person.name === "Shared") {
                const numPeople = bill.people.length - 1;
                person.subTotal = subTotal;
                sharedSubTotal = person.subTotal / numPeople;
            } else {
                person.subTotal = subTotal + sharedSubTotal;
                person.tax = person.subTotal * bill.taxPercentage;
                
                if (bill.customTip) {
                    const billSubTotal = bill.total - bill.tax;
                    const billPercentage = person.subTotal / billSubTotal;
                    person.tip = billPercentage * bill.tip;
                } else {
                    person.tip = person.subTotal * bill.tipPercentage;
                }
                
                person.total = person.subTotal + person.tax + person.tip;
            }
        });

        setSplit(true);
    };

    const goBackToPeople = () => {
        setShowItems(false);
        setShowPeople(true);
    };

    return (
        <>
            <Form onSubmit={enterItems}>
                <Form.Group className="form-input">
                    <Form.Control id="name" className="h-100 w-75 mx-auto" type="text" placeholder="Enter the item" value={item.name} onChange={handleInput} required />
                </Form.Group>
                <Form.Group className="form-input">
                    <Form.Control id="price" className="h-100 w-75 mx-auto" type="number" min="0.01" step="0.01" placeholder="Price" value={item.price} onChange={handleNumInput} required />
                </Form.Group>
                <Form.Group className="form-input">
                    <Form.Select id="person" className="h-100 w-75 mx-auto" value={item.person} onChange={handleInput} required>
                        <option disabled>Choose the person who ordered this</option>
                        {bill.people.map(person => (
                            <option key={person.id} value={person.name}>{person.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="form-input text-center my-2">
                    <Button className="green-button" id={styles.addItemBtn} type="submit">Add</Button>
                </Form.Group>
            </Form>

            <Container className={styles.itemsAdded}>
                <h5 className="text-center mt-2">Items Ordered</h5>
                <ul>
                {allItems.map(item => (
                    <li key={item.id} className={styles.list}>{item.person} ordered {item.name} for {currencyFormatter.format(item.price)}</li>
                ))}
                </ul>
            </Container>

            <Container className="text-center mt-3">
                <Button className="green-button mx-4" id={styles.itemsBackBtn} onClick={goBackToPeople}>Back</Button>
                <Button className="green-button mx-4" id={styles.itemsSplitBtn} onClick={splitItems} disabled={splitDisabled}>Split</Button>
            </Container>

            <SplitModal bill={bill} setBill={setBill} emptyBill={emptyBill} split={split} setSplit={setSplit} setShowItems={setShowItems} setShowInfo={setShowInfo} />
        </>
    );
};

export default ItemsForm;