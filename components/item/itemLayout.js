import { useRef, useState } from "react";
import InfoForm from "./infoForm";
import PeopleForm from "./peopleForm";
import ItemsForm from "./itemsForm";

const ItemLayout = () => {
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
    <>
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
    </>
  );
};

export default ItemLayout;
