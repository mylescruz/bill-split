import { useState } from "react";
import EvenForm from "./evenForm";
import EvenResults from "./evenResults";
import { Col, Row } from "react-bootstrap";

const EvenLayout = ({ setScreen }) => {
  const emptyBill = {
    total: "",
    tax: "",
    tipPercentage: 0.15,
    people: "",
    tip: "",
    totalWithTip: 0,
    splitAmount: 0,
  };

  const [bill, setBill] = useState(emptyBill);
  const [split, setSplit] = useState(false);

  const openSplitModal = (billDetails) => {
    setBill(billDetails);
    setSplit(true);
  };

  return (
    <Row className="d-flex flex-column mx-auto flex-md-row">
      <Col className="col-12 col-md-5">
        <EvenForm emptyBill={emptyBill} openSplitModal={openSplitModal} />
      </Col>
      <Col className="d-none d-md-block col-md-2 text-center">
        <div className="vr" style={{ height: 500 }} />
      </Col>
      <Col className="d-md-none my-2 text-center">
        <hr className="w-100" />
      </Col>
      <Col className="col-12 col-md-5">
        <EvenResults bill={bill} setBill={setBill} setScreen={setScreen} />
      </Col>
    </Row>
  );
};

export default EvenLayout;
