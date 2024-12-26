import { useState } from "react";
import ItemForm from "./itemForm";
import PeopleForm from "./peopleForm";

const ItemLayout = () => {
    const emptyBill = {
        total: "",
        tax: "",
        tipPercentage: 0.15,
        people: [],
        tip: "",
        totalWithTip: 0,
        splitAmount: 0
    };
    
    const [bill, setBill] = useState(emptyBill);
    const [showInfo, setShowInfo] = useState(true);
    const [showPeople, setShowPeople] = useState(false);

    return (
        <>
            <h4 className="text-center mx-2 mt-2 mb-4">Enter the bill&#39;s information</h4>
            {showInfo && <ItemForm setBill={setBill} emptyBill={emptyBill} setShowInfo={setShowInfo} setShowPeople={setShowPeople} />}
            {showPeople && <PeopleForm bill={bill} setBill={setBill} setShowPeople={setShowPeople} />}
        </>
    );
};

export default ItemLayout;