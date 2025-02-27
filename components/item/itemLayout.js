import { useRef, useState } from "react";
import InfoForm from "./infoForm";
import PeopleForm from "./peopleForm";
import ItemsForm from "./itemsForm";

const ItemLayout = () => {
    const infoText = "Enter the bill's information";
    const peopleText = "Enter the people dining";
    const itemText = "Enter the items ordered";

    const emptyBill = {
        subTotal: 0,
        total: "",
        tax: "",
        taxPercentage: 0,
        tipPercentage: 0.15,
        people: [{id: 0, name: "Shared", items: [], subTotal: 0, tax: 0, tip: 0, total: 0}],
        items: [],
        tip: "",
        customTip: false,
        totalWithTip: 0,
        allHaveItems: false,
        remainingTotal: ""
    };
    
    const bill = useRef(emptyBill);
    const [showInfo, setShowInfo] = useState(true);
    const [showPeople, setShowPeople] = useState(false);
    const [showItems, setShowItems] = useState(false);

    return (
        <>
            <h4 className="text-center mx-2 mt-2 mb-4">{showInfo ? infoText : (showPeople ? peopleText : itemText)}</h4>
            {showInfo && <InfoForm bill={bill} emptyBill={emptyBill} setShowInfo={setShowInfo} setShowPeople={setShowPeople} />}
            {showPeople && <PeopleForm bill={bill} setShowInfo={setShowInfo} setShowPeople={setShowPeople} setShowItems={setShowItems} />}
            {showItems && <ItemsForm bill={bill} emptyBill={emptyBill} people={bill.people} setShowPeople={setShowPeople} setShowItems={setShowItems} setShowInfo={setShowInfo} />}
        </>
    );
};

export default ItemLayout;