import currencyFormatter from "@/helpers/currencyFormatter";
import { Button } from "react-bootstrap";

const EvenResults = ({ bill, setBill, emptyBill, setScreen }) => {
  const backToHome = () => {
    setScreen("none");
  };

  const clearBill = () => {
    setBill(emptyBill);
  };

  return (
    <div className="d-flex flex-column">
      <h5>Bill split results</h5>
      <div className="mt-3">
        <p>Original Total: {currencyFormatter.format(bill.total)}</p>
        <p>Total Tip: {currencyFormatter.format(bill.tip)}</p>
        <p>
          Total including Tip: {currencyFormatter.format(bill.totalWithTip)}
        </p>
        <p>Total Per Person: {currencyFormatter.format(bill.splitAmount)}</p>
      </div>
      <div className="d-flex flex-row justify-content-start">
        <Button className="green-button btn-sm mr-4" onClick={clearBill}>
          New Split
        </Button>
        <Button className="green-button btn-sm mx-4" onClick={backToHome}>
          Home
        </Button>
      </div>
    </div>
  );
};

export default EvenResults;
