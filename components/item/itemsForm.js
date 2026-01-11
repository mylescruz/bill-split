import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import currencyFormatter from "@/helpers/currencyFormatter";

const ItemsForm = ({ bill, setBill, setPage, setResults }) => {
  const emptyItem = {
    id: 0,
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

  // Check if all diners have an item
  useEffect(() => {
    for (let person of bill.people) {
      if (person.name === "Shared") {
        // If a shared item is added, then all diners will have an item to pay for
        if (person.items.length > 0) {
          setBill({ ...bill, allHaveItems: true });
          break;
        }
      } else {
        // If each person has an item, then the allHaveItems flag is set
        if (person.items.length > 0) {
          setBill({ ...bill, allHaveItems: true });
        } else {
          setBill({ ...bill, allHaveItems: false });
          break;
        }
      }
    }
  }, [bill.people, bill, setBill]);

  const handleInput = (e) => {
    const input = e.target.value;

    setItem({ ...item, [e.target.id]: input });
  };

  const handleNumInput = (e) => {
    const input = e.target.value;

    if (input == "") {
      setItem({ ...item, [e.target.id]: input });
    } else {
      setItem({ ...item, [e.target.id]: parseFloat(input) });
    }
  };

  const enterItems = (e) => {
    e.preventDefault();

    // Don't allow an item to be added if the user added a value that is higher than the remaining total
    if (bill.remainingTotal - item.price < 0) {
      alert("There can't be a negative remaining balance!");
      return;
    }

    // Don't allow an item to be added if:
    //    There are still diners remaining without an item
    //    The user tries to enter a price that is equal to the remaining total
    if (
      bill.remainingDiners > 1 &&
      parseFloat(bill.remainingTotal) === item.price &&
      bill.allHaveItems === false
    ) {
      alert("There must be a remaining balance for the other people's items");
      return;
    }

    // Calculate the remaining subtotal from the items added
    const remainingTotal =
      parseFloat(bill.remainingTotal).toFixed(2) -
      parseFloat(item.price).toFixed(2);

    let maxID = 0;
    if (bill.items.length > 0)
      maxID = Math.max(...bill.items.map((item) => item.id));
    item.id = maxID + 1;

    // Add item to the person who ordered that item
    const people = bill.people.map((person) => {
      if (person.name === item.person) {
        return {
          ...person,
          items: [...person.items, item],
        };
      } else {
        return person;
      }
    });

    setBill({
      ...bill,
      remainingTotal: remainingTotal,
      items: [...bill.items, item],
      people: people,
      remainingDiners: bill.remainingDiners - 1,
    });

    setItem(emptyItem);
  };

  const splitItems = () => {
    console.log(bill);

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
              onChange={handleNumInput}
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
                <option key={person.id} value={person.name}>
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
