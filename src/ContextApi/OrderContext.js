import { createContext, useState } from "react";
export const OrderContext = createContext();
const OrderContextProvider = (props) => {
    const [OrderArr, setOrderArr] = useState([]);
    const changeOrderArr = (val) => {
        setOrderArr(val);
    };
    return (
        <OrderContext.Provider value={{ OrderArr, changeOrderArr }}>
            {props.children}
        </OrderContext.Provider>
    );
};
export default OrderContextProvider;