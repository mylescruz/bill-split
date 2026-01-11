import { useRef, useState } from "react";
import InfoForm from "./infoForm";
import PeopleForm from "./peopleForm";
import ItemsForm from "./itemsForm";
import { Col, Row } from "react-bootstrap";
import ItemsResults from "./itemsResults";

const ItemLayout = ({ setScreen }) => {
  const emptyBill = {
    subTotal: 0,
    total: "",
    tax: "",
    taxPercentage: 0,
    tipPercentage: 0.15,
    people: [
      {
        id: 0,
        name: "Shared",
        items: [],
        subTotal: 0,
        tax: 0,
        tip: 0,
        total: 0,
      },
    ],
    items: [],
    tip: "",
    customTip: false,
    totalWithTip: 0,
    allHaveItems: false,
    remainingTotal: "",
  };

  const bill = useRef(emptyBill);
  const [page, setPage] = useState("info");
  const [results, setResults] = useState(false);

  return (
    <div className="my-4">
      <Row className="d-flex flex-column d-md-none mx-auto">
        {page === "info" && (
          <InfoForm bill={bill} emptyBill={emptyBill} setPage={setPage} />
        )}

        {page === "people" && <PeopleForm bill={bill} setPage={setPage} />}
        {page === "items" && !results && (
          <ItemsForm
            bill={bill}
            emptyBill={emptyBill}
            people={bill.people}
            setPage={setPage}
            setResults={setResults}
          />
        )}
        {results && (
          <ItemsResults
            bill={bill}
            emptyBill={emptyBill}
            setScreen={setScreen}
            setPage={setPage}
            setResults={setResults}
          />
        )}
      </Row>
      <Row className="d-none d-md-flex flex-md-row mx-auto">
        <Col className="col-5">
          {page === "info" && (
            <InfoForm bill={bill} emptyBill={emptyBill} setPage={setPage} />
          )}
          {page === "people" && <PeopleForm bill={bill} setPage={setPage} />}
          {(page === "items" || results) && (
            <ItemsForm
              bill={bill}
              emptyBill={emptyBill}
              people={bill.people}
              setPage={setPage}
              setResults={setResults}
            />
          )}
        </Col>
        <Col className="col-2 text-center">
          <div className="vr" style={{ height: 500 }} />
        </Col>
        <Col className="col-5">
          <ItemsResults
            bill={bill}
            emptyBill={emptyBill}
            setScreen={setScreen}
            setPage={setPage}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ItemLayout;
