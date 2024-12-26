import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "@/styles/peopleForm.module.css";

const PeopleForm = ({ bill, setBill, setShowPeople, setShowItems }) => {
    const emptyPerson = {
        id: 0,
        name: "",
        item: ""
    };
    const [person, setPerson] = useState(emptyPerson);

    const handleInput = (e) => {
        setPerson({...person, [e.target.id]: e.target.value})
    };

    const enterPeople = (e) => {
        e.preventDefault();

        let maxID = 0;
        if (bill.people.length > 0)
            maxID = Math.max(...bill.people.map(person => person.id));

        person.id = maxID + 1;
        setBill({...bill, people: [...bill.people, person]});
        setPerson(emptyPerson);
    };

    const nextScreen = () => {
        setShowPeople(false);
        setShowItems(true);
    };

    return (
        <>
            <Form onSubmit={enterPeople}>
                <Row className="d-flex justify-content-between align-items-center mx-auto w-75">
                <Col className="px-0"><Form.Group>
                    <Form.Control id="name" className="h-100 w-100" type="text" placeholder="Enter each person" value={person.name} onChange={handleInput} required />
                </Form.Group></Col>
                <Col className="col-2 px-0"><Form.Group className="text-center my-2">
                    <Button className="green-button btn-sm" id={styles.splitItemBtn} type="submit">+</Button>
                </Form.Group></Col>
                </Row>
            </Form>

            <Container className={styles.peopleContainer}>
                <h5 className="text-center mt-2">Added People</h5>
                <ul>
                {bill.people.map(person => (
                    <li key={person.id} className={styles.list}>{person.name}</li>
                ))}
                </ul>
            </Container>

            <Container className="text-center mt-3">
                <Button className="green-button" id={styles.peopleNextBtn} onClick={nextScreen}>Next</Button>
            </Container>
        </>
    );
};

export default PeopleForm;