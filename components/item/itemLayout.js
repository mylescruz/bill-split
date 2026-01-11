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

  return (
    <Row className="d-flex flex-column mx-auto flex-md-row">
      <Col className="col-12 col-md-5">
        {page === "info" && (
          <InfoForm bill={bill} emptyBill={emptyBill} setPage={setPage} />
        )}

        {page === "people" && <PeopleForm bill={bill} setPage={setPage} />}
        {page === "items" && (
          <ItemsForm
            bill={bill}
            emptyBill={emptyBill}
            people={bill.people}
            setPage={setPage}
          />
        )}
      </Col>
      <Col className="d-none d-md-block col-md-2 text-center">
        <div className="vr" style={{ height: 500 }} />
      </Col>
      <Col className="d-md-none my-2 text-center">
        <hr className="w-100" />
      </Col>
      <Col className="col-12 col-md-5">
        <ItemsResults
          bill={bill}
          emptyBill={emptyBill}
          setScreen={setScreen}
          setPage={setPage}
        />
      </Col>
    </Row>
  );
};

export default ItemLayout;
