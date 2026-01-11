import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import currencyFormatter from "@/helpers/currencyFormatter";
import dollarsToCents from "@/helpers/dollarsToCents";
import addDollars from "@/helpers/addDollars";
import subtractDollars from "@/helpers/subtractDollars";
import centsToDollars from "@/helpers/centsToDollars";

const ItemsForm = ({ bill, setBill, setPage, setResults }) => {
  const emptyItem = {
    id: "",
    name: "",
    price: "",
    person: "Shared",
  };

  const [item, setItem] = useState(emptyItem);
  const [splitDisabled, setSplitDisabled] = useState(true);

  useEffect(() => {
    // Only allow a split if all diners have an item and all the items' costs added up equal the subtotal
    if (bill.allHaveItems && parseFloat(bill.remainingTotal) === 0)
      setSplitDisabled(false);
  }, [bill.allHaveItems, bill.remainingTotal]);

  const handleInput = (e) => {
    setItem({ ...item, [e.target.id]: e.target.value });
  };

  const enterItems = (e) => {
    e.preventDefault();

    const currentItemPrice = Number(item.price);

    // Don't allow an item to be added if the user added a value that is higher than the remaining total
    const remainingTotal = subtractDollars(
      bill.remainingTotal,
      currentItemPrice
    );

    if (remainingTotal < 0) {
      alert("There can't be a negative remaining balance!");
      return;
    }

    // Don't allow an item to be added if:
    //    There are still diners remaining without an item
    //    The user tries to enter a price that is equal to the remaining total
    if (
      bill.remainingDiners > 1 &&
      bill.remainingTotal === currentItemPrice &&
      bill.allHaveItems === false
    ) {
      alert("There must be a remaining balance for the other people's items");
      return;
    }

    const finalItem = {
      id: item.name + item.person,
      name: item.name,
      price: currentItemPrice,
      person: item.person,
    };

    // Add item to the person who ordered that item
    const people = bill.people.map((person) => {
      if (person.name === finalItem.person) {
        return {
          ...person,
          items: [...person.items, finalItem],
        };
      } else {
        return person;
      }
    });

    let allHaveItems = false;
    // Check if all diners have an item
    for (const person of people) {
      if (person.name === "Shared") {
        // If a shared item is added, then all diners will have an item to pay for
        if (person.items.length > 0) {
          allHaveItems = true;
          break;
        }
      } else {
        // If each person has an item, then the allHaveItems flag is set
        if (person.items.length > 0) {
          allHaveItems = true;
        } else {
          allHaveItems = false;
          break;
        }
      }
    }

    setBill({
      ...bill,
      remainingTotal: remainingTotal,
      items: [...bill.items, finalItem],
      people: people,
      allHaveItems: allHaveItems,
      remainingDiners: bill.remainingDiners - 1,
    });

    setItem(emptyItem);
  };

  const splitItems = () => {
    console.log(bill);
    // Find the cost of shared food that will be split among all diners
    const sharedPerson = bill.people.find((person) => person.name === "Shared");

    const numPeople = bill.people.length - 1;

    const sharedSubTotal = dollarsToCents(
      sharedPerson.items.reduce(
        (sum, current) => sum + centsToDollars(current.price),
        0
      )
    );

    const sharedAmount = sharedSubTotal / numPeople;

    sharedPerson.subTotal = sharedSubTotal;

    const people = bill.people.map((person) => {
      if (person.name !== "Shared") {
        // Calculate each diner's subtotal, tax, tip and total
        const subtotal = dollarsToCents(
          person.items.reduce(
            (sum, current) => sum + centsToDollars(current.price),
            0
          )
        );

        const finalSubtotal = addDollars(subtotal, sharedAmount);

        const tax = finalSubtotal * bill.taxPercentage;
        // person.subTotal = subTotal + sharedAmount;
        // person.tax = person.subTotal * bill.taxPercentage;

        let tip = 0;
        if (bill.customTip) {
          // If there is a custom tip, split the tip based on their percentage of the total meal
          const billSubTotal = subtractDollars(bill.total, bill.tax);
          const billPercentage = finalSubtotal / billSubTotal;
          tip = billPercentage * bill.tip;
        } else {
          tip = finalSubtotal * bill.tipPercentage;
        }

        const total = addDollars(finalSubtotal, tax);
        const finalTotal = addDollars(total, tip);

        return {
          ...person,
          subTotal: finalSubtotal,
          tax: tax,
          tip: tip,
          total: finalTotal,
        };
      } else {
        return person;
      }
    });

    setBill({ ...bill, people: people });
    setResults(true);
  };

  const goBackToPeople = () => {
    setPage("people");
  };

  return (
    <>
      <h4>Enter the items ordered</h4>
      <Form onSubmit={enterItems}>
        <Col className="my-3">
          <Form.Group controlId="name">
            <Form.Label>Enter an ordered food or drink</Form.Label>
            <Form.Control
              className="h-100"
              type="text"
              placeholder="Item"
              value={item.name}
              onChange={handleInput}
              required
            />
          </Form.Group>
        </Col>
        <Col className="my-3">
          <Form.Group controlId="price">
            <Form.Label>Enter the cost of this item</Form.Label>
            <Form.Control
              className="h-100"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Price"
              value={item.price}
              onChange={handleInput}
              required
            />
          </Form.Group>
        </Col>
        <Col className="my-3">
          <Form.Group controlId="person">
            <Form.Label>Choose the person who ordered this</Form.Label>
            <Form.Select
              className="h-100"
              value={item.person}
              onChange={handleInput}
              required
            >
              {bill.people.map((person) => (
                <option key={person.name} value={person.name}>
                  {person.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Form.Group className="my-3">
          <Button
            className="green-button"
            type="submit"
            disabled={!splitDisabled}
          >
            Add
          </Button>
        </Form.Group>
      </Form>

      <div className="mt-2">
        <h5>
          Items Ordered: {currencyFormatter(bill.remainingTotal)} Remaining
        </h5>
        <Row className="d-flex flex-col">
          {bill.items.map((item) => (
            <Col key={item.id} className="col-12">
              {item.person} ordered {item.name} for{" "}
              {currencyFormatter(item.price)}
            </Col>
          ))}
        </Row>
      </div>

      <div className="d-flex flex-row justify-content-between mt-3">
        <Button className="green-button" onClick={goBackToPeople}>
          Back
        </Button>
        <Button
          className="green-button"
          onClick={splitItems}
          disabled={splitDisabled}
        >
          Split
        </Button>
      </div>
    </>
  );
};

export default ItemsForm;
