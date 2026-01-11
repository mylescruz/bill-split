import { Button } from "react-bootstrap";
import { useState } from "react";
import ItemLayout from "./item/itemLayout";
import EvenLayout from "./even/evenLayout";

const Home = () => {
  const [form, setForm] = useState("none");

  const openEven = () => {
    setForm("even");
  };

  const openItem = () => {
    setForm("item");
  };

  return (
    <>
      {form === "none" && (
        <div>
          <h4 className="text-center mx-4 my-4">
            Split your bill evenly or by item
          </h4>
          <div className="my-4 d-flex flex-row justify-content-evenly">
            <Button className="green-button btn-lg" onClick={openEven}>
              Even
            </Button>
            <Button className="green-button btn-lg" onClick={openItem}>
              Item
            </Button>
          </div>
        </div>
      )}
      {form === "item" && <ItemLayout setForm={setForm} />}
      {form === "even" && <EvenLayout setForm={setForm} />}
    </>
  );
};

export default Home;
