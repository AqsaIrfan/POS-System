import React, { useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../ContextApi/CategoriesContext";
import { MenuItemsContext } from "../ContextApi/MenuItemContext";
import { OrderContext } from "../ContextApi/OrderContext";
import { FaPrint } from "react-icons/fa";
import { MdClear, MdCancel, MdCancelPresentation } from "react-icons/md";
import { TiTick } from "react-icons/ti";
const MainParent = () => {
  const { OrderArr, changeOrderArr } = useContext(OrderContext);
  const { CategoriesArr, changeCategoriesArr } = useContext(CategoriesContext);
  const { MenuItemsArr, changeMenuItemsArr } = useContext(MenuItemsContext);
  const [SelectedItem, setSelectedItem] = useState("");
  const [ItemTabs, setItemTabs] = useState(false);
  const [QtyNum, setQtyNum] = useState(null);
  const [renderComp, setrenderComp] = useState(false);
  const [GetIndexFocus, setGetIndexFocus] = useState(null);
  const [Total, setTotal] = useState(0);
  const [netAmount, setnetAmount] = useState(null);
  const [AmountReturned, setAmountReturned] = useState(null);
  const [discount, setdiscount] = useState(null);
  const [AmountReceived, setAmountReceived] = useState(null);
  const [clear, setclear] = useState(0);
  // console.log(OrderArr);
  console.log(discount)

  const TakeOrder = (item, idx) => {

    let newArr = OrderArr

    if (OrderArr.length > 0) {
      let i = null;
      newArr.forEach((abc, idx) => {
        if (abc.Id === item.Id) {
          i = idx;
        }
      });
      if (i !== null) {
        if (newArr[i].Qty > 100) {
          alert("you can only order 100 items in one order");
        } else {
          newArr[i].Qty = Number(newArr[i].Qty) + 1;
          changeOrderArr(newArr);
        updateTotal(newArr)

        }
      } else {
        newArr.push(item)
        changeOrderArr(newArr);
        updateTotal(newArr)

      }
    } else {
      changeOrderArr([item]);
      console.log(item)
      updateTotal([item])

    }
  };

  const handleChange = (e, idx) => {
    let value = Number(e.target.value);
    if (Number(value) > 99  ) {
      alert("You only select items from 99");
      value = 99;
    }
    if ( Number(value) < 1 ) {
      alert("You have to select minimum 1 item");
      value = 1;
    }

    let newArr = OrderArr;
    newArr[idx].Qty = value;
    console.log(newArr);
    changeOrderArr(newArr);
    updateTotal(newArr);

    // setrenderComp(!renderComp);
  };
  const updateTotal = (newArr) => {
    let SubTotal = 0;
    // console.log("aa raha ha ");
    newArr.map((x) => {
      let Quantity = x.Qty;
      let Price = x.Price;
      SubTotal += Quantity * Price;
   

    });


    setTotal(Number(SubTotal));
    let net = (discount / 100) * SubTotal;
    console.log(net)
    setnetAmount(Number(SubTotal - net)); 

  
  };

  const handleNumber = (val) => {
    let Arr = OrderArr;

    if (val === "" ) {
      let min = 1;
      Arr[GetIndexFocus].Qty = min;
      changeOrderArr(Arr);
      updateTotal(Arr)
    } else {
      Arr[GetIndexFocus].Qty += val?.toString();

      if (Number(Arr[GetIndexFocus].Qty) > 99) {
        alert("you can only order 99 items in one order");
        Arr[GetIndexFocus].Qty = 99;
      }
        Arr[GetIndexFocus].Qty = Number(Arr[GetIndexFocus].Qty);
        changeOrderArr(Arr);
        updateTotal(Arr)
      
    }
  };

  

  const handleAmountReceived = (e) => {
    let value = Number(e.target.value);
    if (value > netAmount) {
      let returnAmount = value - Number(netAmount);
      setAmountReturned(returnAmount.toFixed(2));
    } else {
      setAmountReturned(0);
    }
    setAmountReceived(value);
  };
  // console.log(AmountReceived)

  const handleDiscountChange = (e) => {

    let value = e.target.value;
    if (value > 99) {
      console.log(value);
      value = 0;
      alert("enter less than 100");
    }
    setdiscount(value);
    let net = (value / 100) * Total;
    let amount = Total - net;
    setrenderComp(!renderComp);

    setnetAmount(amount.toFixed(2));
    // console.log(AmountReceived);
    console.log(amount);

    if (AmountReceived > amount) {
      console.log(AmountReceived);
      setAmountReturned(AmountReceived - amount);
      setrenderComp(!renderComp);
    } else {
      setAmountReturned(0);
    }
  };

  const delItem = (id) => {
    console.log(id);

    let allrows = OrderArr;
    allrows[id].Qty = 1;
    allrows.splice(id, 1);
    console.log(allrows);
    changeOrderArr(allrows);
    updateTotal(allrows);
  };
  // console.log(OrderArr);

  return (
    <div>
      <div className="row m-0 topbar">
        <div className="col-md-4">NEW ORDER</div>
        <div className="col-md-2">CATEGORIES</div>
        <div className="col-md-6">USER NAME</div>
      </div>
      <div className="row m-0 p-0">
        <div className="col-md-4 m-0 p-0">
          <div className="scroll_orderlist">
            {OrderArr.map((order, id) => {
              return (
                <div className="orderlist">
                  <div className="text-end m-0 px-2 mb-1 col-md-12">
                    <MdCancel
                      onClick={() => {
                        delItem(id);
                      }}
                    />
                  </div>
                  <div key={id} className="row m-0 pt-1  ">
                    <div className="col-md-8">
                      <div className="row">
                        <h5>{order.Name}</h5>
                      </div>
                      <div className="row">
                        <p>Extra Cheese</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="row">
                        <h6>HK$ {order.Price}</h6>{" "}
                      </div>
                      <div className="row">
                        <input
                          type="number"
                          id={`blur${id}`}
                          onClick={(e) => {
                            setGetIndexFocus(id);
                          }}
                          className={`input_style  ${
                            GetIndexFocus === id ? "Selected_input_field" : ""
                          } `}
                          // onBlur={()=>handleNumberField(order.Id)}
                          value={order.Qty}
                          name="Qty"
                          onChange={(e) => handleChange(e, id)}
                          placeholder="Qty"
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="hr_line" />
                </div>
              );
            })}
          </div>

          <div className="row m-0 p-0 calculator">
            <div className="row m-0 cal_total">
              <div className="col-md-6">
                <h5>Total</h5>
              </div>
              <div className="col-md-6 total_amt">
                <h5>HK$ {Total}</h5>
              </div>
            </div>
            <div className="row m-0 p-0 cal_numbers">
              <div
                className="col-md-3"
                value="1"
                onClick={() => handleNumber(1)}
              >
                1
              </div>
              <div
                className="col-md-3"
                value="2"
                onClick={() => handleNumber(2)}
              >
                2
              </div>
              <div
                className="col-md-3"
                value="3"
                onClick={() => handleNumber(3)}
              >
                3
              </div>
              <div
                className="col-md-3"
                value="4"
                onClick={() => handleNumber(4)}
              >
                4
              </div>
            </div>
            <div className="row m-0 p-0 cal_numbers">
              <div
                className="col-md-3"
                value="5"
                onClick={() => handleNumber(5)}
              >
                5
              </div>
              <div
                className="col-md-3"
                value="6"
                onClick={() => handleNumber(6)}
              >
                6
              </div>
              <div
                className="col-md-3"
                value="7"
                onClick={() => handleNumber(7)}
              >
                7
              </div>
              <div
                className="col-md-3"
                value="8"
                onClick={() => handleNumber(8)}
              >
                8
              </div>
            </div>
            <div className="row m-0 p-0 cal_numbers">
              <div
                className="col-md-3"
                value="9"
                onClick={() => handleNumber(9)}
              >
                9
              </div>
              <div
                className="col-md-3"
                value="0"
                onClick={() => handleNumber(0)}
              >
                0
              </div>
              <div
                className="col-md-3" 
              >
                .
              </div>
              <div
                className="col-md-3"
                value=""
                onClick={() => handleNumber("")}
              >
                <MdCancelPresentation />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2 m-0 p-0 align-middle">
          {CategoriesArr.map((item, idx) => {
            return (
              <div
                key={idx}
                onClick={() => {
                  setSelectedItem(item.Name);
                  setItemTabs(true);
                }}
                className={`CategoriesItems  ${
                  SelectedItem === item.Name ? "Selected_CategoriesItem" : ""
                } `}
              >
                {" "}
                {item.Name}
              </div>
            );
          })}
        </div>
        <div className="col-md-6">
          <div className="row p-2">
            {ItemTabs &&
              MenuItemsArr.map((MenuItem, idx) => {
                return (
                  <div
                    key={idx}
                    className="col-md-3 m-1 p-0 MenuItems_box"
                    onClick={() => {
                      TakeOrder(MenuItem, idx);
                      //changeOrderArr([...OrderArr ,MenuItem])
                    }}
                  >
                    <div className="MenuItems_name">{MenuItem.Name} </div>
                    <div className="MenuItems_price">HK$ {MenuItem.Price} </div>
                  </div>
                );
              })}
          </div>
          <div className="row m-0 p-0 discount_box">
            <div className="row discount_row m-0 mb-4">
              <div className="col-md-6 ">
                <div className="row">
                  <div className="col-md-6 m-0 p-0"> Discount : </div>
                  <div className="col-md-4  m-0 p-0">
                    <input
                      name="dis"
                      value={discount}
                      onChange={handleDiscountChange}
                      type=""
                      placeholder="..%"
                      className="input_style_discount"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 ">
                <div className="row">
                  <div className="col-md-6 m-0 p-0"> Net Amount : </div>
                  <div className="col-md-4  m-0 p-0"> HK$ {netAmount}</div>
                </div>
              </div>
            </div>
            <div className="row discount_row mb-4">
              <div className="col-md-6 ">
                <div className="row">
                  <div className="col-md-6 m-0 p-0"> Amount Received : </div>
                  <div className="col-md-4 p-0 m-0">
                    <input
                      type=""
                      onChange={handleAmountReceived}
                      value={AmountReceived}
                      name="AmountReceived"
                      placeholder="HK$ "
                      className="input_style_discount"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 ">
                <div className="row">
                  <div className="col-md-6 m-0 p-0"> Amount Returned : </div>
                  <div className="col-md-4 m-0 p-0">HK$ {AmountReturned} </div>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-9"></div>
              <div className="col-md-3 ">
                <div className="row">
                  <div className="col-md-4">
                    <MdClear />
                  </div>
                  <div className="col-md-4">
                    <TiTick />
                  </div>
                  <div className="col-md-4">
                    <FaPrint />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainParent;
