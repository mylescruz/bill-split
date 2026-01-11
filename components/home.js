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
          <h5>
            Do you want to split your bill evenly among friends or by the items
            ordered?
          </h5>
          <Row className="my-4 d-flex flex-row col-12 col-md-6">
            <Col className="col-12 col-md-6">
              <Button
                className="green-button text-nowrap btn-lg"
                onClick={openEven}
              >
                Evenly
              </Button>
            </Col>
            <Col className="col-12 col-md-6">
              <Button
                className="green-button text-nowrap btn-lg"
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
