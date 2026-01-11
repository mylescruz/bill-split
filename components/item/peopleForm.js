import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const PeopleForm = ({ bill, setPage }) => {
  const emptyPerson = {
    id: 1,
    name: "",
    items: [],
    subTotal: 0,
    tax: 0,
    tip: 0,
    total: 0,
  };

  const [person, setPerson] = useState(emptyPerson);
  const [people, setPeople] = useState(bill.current.people);
  const [nextDisabled, setNextDisabled] = useState(
    bill.current.people.length < 2
  );

  useEffect(() => {
    // Only allow the next button to be clicked if more than one person is added
    if (people.length > 2) setNextDisabled(false);
  }, [people]);

  const handleInput = (e) => {
    setPerson({ ...person, [e.target.id]: e.target.value });
  };

  const enterPeople = (e) => {
    e.preventDefault();

    let maxID = 0;
    if (people.length > 0)
      maxID = Math.max(...people.map((person) => person.id));
    person.id = maxID + 1;

    setPeople([...people, person]);

    setPerson(emptyPerson);
  };

  const nextScreen = () => {
    bill.current.people = people;
    setPage("items");
  };

  const goBacktoInfo = () => {
    setPage("info");
  };

  return (
    <>
      <h4>Enter the people dining</h4>
      <Form onSubmit={enterPeople}>
        <Row>
          <Col className="col-12 col-md-10">
            <Form.Group>
              <Form.Control
                id="name"
                className="h-100 mb-2"
                type="text"
                placeholder="Person's name"
                value={person.name}
                onChange={handleInput}
                required
              />
            </Form.Group>
          </Col>
          <Col className="col-12 col-md-2">
            <Button className="green-button btn-sm w-100" type="submit">
              Add
            </Button>
          </Col>
        </Row>
      </Form>

      <div className="mt-2">
        <h5>Added People</h5>
        <Row className="d-flex flex-row">
          {people.map(
            (person) =>
              person.name !== "Shared" && (
                <Col key={person.id} className="my-1 col-6">
                  • {person.name}
                </Col>
              )
          )}
        </Row>
      </div>

      <div className="mt-4 d-flex flew-row justify-content-between">
        <Button className="green-button" onClick={goBacktoInfo}>
          Back
        </Button>
        <Button
          className="green-button"
          onClick={nextScreen}
          disabled={nextDisabled}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default PeopleForm;
