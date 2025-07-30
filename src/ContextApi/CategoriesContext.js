import { createContext, useState } from "react";
export const CategoriesContext = createContext();
const CategoriesContextProvider = (props) => {
    const [CategoriesArr, setCategoriesArr] = useState([
        { Name : "Hot Selling" , Selected : true},
        { Name : "Veg Starters" , Selected : false},
        { Name : "Non Veg Starters" , Selected : false},
        { Name : "Rice Combos" , Selected : false},
        { Name : "Noodles" , Selected : false},
        { Name : "Chopsey" , Selected : false},
    ]);
    const changeCategoriesArr = (val) => {
        setCategoriesArr(val);
    };
    return (
        <CategoriesContext.Provider value={{ CategoriesArr, changeCategoriesArr }}>
            {props.children}
        </CategoriesContext.Provider>
    );
};
export default CategoriesContextProvider;