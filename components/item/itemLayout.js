import { useState } from "react";
import ItemForm from "./itemForm";

const ItemLayout = () => {
    const emptyBill = {
        total: "",
        tax: "",
        tipPercentage: 0.15,
        people: "",
        tip: "",
        totalWithTip: 0,
        splitAmount: 0
    };
    
    const [bill, setBill] = useState(emptyBill);

    return (
        <>
            <h4 className="text-center mx-2 mt-2 mb-4">Enter the bill&#39;s information</h4>
            <ItemForm emptyBill={emptyBill} />
        </>
    );
};

export default ItemLayout;