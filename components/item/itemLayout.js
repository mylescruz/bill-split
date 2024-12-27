import { useState } from "react";
import InfoForm from "./infoForm";
import PeopleForm from "./peopleForm";
import ItemsForm from "./itemsForm";

const ItemLayout = () => {
    const emptyBill = {
        total: "",
        tax: "",
        taxPercentage: 0,
        tipPercentage: 0.15,
        people: [],
        items: [],
        tip: "",
        totalWithTip: 0
    };
    
    const [bill, setBill] = useState(emptyBill);
    const [showInfo, setShowInfo] = useState(true);
    const [showPeople, setShowPeople] = useState(false);
    const [showItems, setShowItems] = useState(false);

    return (
        <>
            <h4 className="text-center mx-2 mt-2 mb-4">Enter the bill&#39;s information</h4>
            {showInfo && <InfoForm setBill={setBill} emptyBill={emptyBill} setShowInfo={setShowInfo} setShowPeople={setShowPeople} />}
            {showPeople && <PeopleForm bill={bill} setBill={setBill} setShowPeople={setShowPeople} setShowItems={setShowItems} />}
            {showItems && <ItemsForm bill={bill} setBill={setBill} people={bill.people} setShowItems={setShowItems} setShowInfo={setShowInfo} />}
        </>
    );
};

export default ItemLayout;