import { useState } from "react";
import EvenForm from "./evenForm";
import EvenModal from "./evenModal";

const EvenLayout = () => {
    const emptyBill = {
        total: 0,
        tax: 0,
        tip: 15,
        people: 2
    };

    const [bill, setBill] = useState(emptyBill);
    const [split, setSplit] = useState(false);

    const openSplitModal = (billDetails) => {
        setBill(billDetails);
        setSplit(true);
    };

    return (
        <>
            <h4 className="text-center mx-2 mt-2 mb-4">Enter the bill&#39;s information</h4>
            <EvenForm openSplitModal={openSplitModal} />
            
            <EvenModal bill={bill} split={split} setSplit={setSplit} />
        </>
    );
};

export default EvenLayout;