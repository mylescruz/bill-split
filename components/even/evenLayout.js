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
  const [page, setPage] = useState("info");

  return (
    <div className="my-4">
      <Row className="d-flex flex-column d-md-none mx-auto">
        {page === "info" && (
          <EvenForm emptyBill={emptyBill} setBill={setBill} setPage={setPage} />
        )}
        {page === "results" && (
          <EvenResults
            bill={bill}
            setBill={setBill}
            emptyBill={emptyBill}
            setScreen={setScreen}
            setPage={setPage}
          />
        )}
      </Row>
      <Row className="d-none d-md-flex flex-md-row mx-auto">
        <Col className="col-12 col-md-5">
          <EvenForm emptyBill={emptyBill} setBill={setBill} setPage={setPage} />
        </Col>
        <Col className="d-none d-md-block col-md-2 text-center">
          <div className="vr" style={{ height: 500 }} />
        </Col>
        <Col className="col-12 col-md-5">
          <EvenResults
            bill={bill}
            setBill={setBill}
            emptyBill={emptyBill}
            setScreen={setScreen}
            setPage={setPage}
          />
        </Col>
      </Row>
    </div>
  );
};

export default EvenLayout;
