import { createContext, useState } from "react";
export const MenuItemsContext = createContext();
const MenuItemsContextProvider = (props) => {
    const [MenuItemsArr, setMenuItemsArr] = useState([
        { Name : "Crisp Chips" ,         Price: "150", Qty: 1,  Id : 0},
        { Name : "Veg Noodles" ,         Price: "150", Qty: 1,  Id : 1},
        { Name : "Hakka Noodles" ,       Price: "180", Qty: 1,  Id : 2},
        { Name : "Chilli Garlic Noodles",Price: "180", Qty: 1,  Id : 3},
        { Name : "Chicken Nuggests" ,    Price: "150", Qty: 1,  Id : 4},
        { Name : "Chilly Chicken Gravy" ,Price: "180", Qty: 1,  Id : 5},
    ]);
    const changeMenuItemsArr = (val) => {
        setMenuItemsArr(val);
    };
    return (
        <MenuItemsContext.Provider value={{ MenuItemsArr, changeMenuItemsArr }}>
            {props.children}
        </MenuItemsContext.Provider>
    );
};
export default MenuItemsContextProvider;