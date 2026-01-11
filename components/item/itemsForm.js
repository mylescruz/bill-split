import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import currencyFormatter from "@/helpers/currencyFormatter";

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
    if (bill.remainingTotal - currentItemPrice < 0) {
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

    // Calculate the remaining subtotal from the items added
    const remainingTotal = bill.remainingTotal - currentItemPrice;

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
      items: [...bill.items, item],
      people: people,
      allHaveItems: allHaveItems,
      remainingDiners: bill.remainingDiners - 1,
    });

    setItem(emptyItem);
  };

  const splitItems = () => {
    let sharedSubTotal = 0;
    bill.people.map((person) => {
      let subTotal = 0;

      // Set the subtotal for each diner
      person.items.map((item) => {
        subTotal += item.price;
      });

      if (person.name === "Shared") {
        // If there are shared items, split the total amount between all diners evenly
        const numPeople = bill.people.length - 1;
        person.subTotal = subTotal;
        sharedSubTotal = person.subTotal / numPeople;
      } else {
        // Calculate each diner's subtotal, tax, tip and total
        person.subTotal = subTotal + sharedSubTotal;
        person.tax = person.subTotal * bill.taxPercentage;

        if (bill.customTip) {
          // If there is a custom tip, split the tip based on their percentage of the total meal
          const billSubTotal = bill.total - bill.tax;
          const billPercentage = person.subTotal / billSubTotal;
          person.tip = billPercentage * bill.tip;
        } else {
          person.tip = person.subTotal * bill.tipPercentage;
        }

        person.total = person.subTotal + person.tax + person.tip;
      }
    });

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
