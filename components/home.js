import { Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import ItemLayout from "./item/itemLayout";
import EvenLayout from "./even/evenLayout";

const Home = () => {
  const [screen, setScreen] = useState("none");

  const openEven = () => {
    setScreen("even");
  };

  const openItem = () => {
    setScreen("item");
  };

  return (
    <>
      {screen === "none" && (
        <div>
          <h5>How do you want to split your bill?</h5>
          <Row className="my-4 d-flex flex-row col-12 col-md-5 col-lg-3">
            <Col className="col-12 my-2 text-center">
              <Button
                className="w-100 green-button text-nowrap btn-lg"
                onClick={openEven}
              >
                Evenly
              </Button>
            </Col>
            <Col className="col-12 my-2">
              <Button
                className="w-100 green-button text-nowrap btn-lg"
                onClick={openItem}
              >
                By Item
              </Button>
            </Col>
          </Row>
        </div>
      )}
      {screen === "item" && <ItemLayout setScreen={setScreen} />}
      {screen === "even" && <EvenLayout setScreen={setScreen} />}
    </>
  );
};

export default Home;
