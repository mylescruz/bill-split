import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "@/styles/peopleForm.module.css";

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
        <Row className="d-flex justify-content-between align-items-center mx-auto w-75">
          <Col className="px-0">
            <Form.Group>
              <Form.Control
                id="name"
                className="h-100 w-100"
                type="text"
                placeholder="Enter each person"
                value={person.name}
                onChange={handleInput}
                required
              />
            </Form.Group>
          </Col>
          <Col className="col-2 col-lg-1 px-0">
            <Form.Group className="text-center my-2">
              <Button className="btn-sm" id={styles.addPersonBtn} type="submit">
                +
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Container className={styles.peopleContainer}>
        <h5 className="text-center mt-2">Added People</h5>
        <ul>
          {people.map(
            (person) =>
              person.name !== "Shared" && (
                <li key={person.id} className={styles.list}>
                  {person.name}
                </li>
              )
          )}
        </ul>
      </Container>

      <Container className="text-center mt-3">
        <Button
          className="green-button mx-4"
          id={styles.peopleBackBtn}
          onClick={goBacktoInfo}
        >
          Back
        </Button>
        <Button
          className="green-button mx-4"
          id={styles.peopleNextBtn}
          onClick={nextScreen}
          disabled={nextDisabled}
        >
          Next
        </Button>
      </Container>
    </>
  );
};

export default PeopleForm;
