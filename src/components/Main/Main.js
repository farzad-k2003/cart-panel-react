import Cart from "../Cart/Cart";
import ItemsTable from "../ItemsTable/ItemsTable";
import Total from "../Total";
import { useEffect, useState } from "react";
import "./Main.css";

const Main = () => {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [count, setCount] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState();

  useEffect(() => {
    setName("");
    setPrice("");
    setDiscount(0);
    setFinalPrice(0);
  }, [list]);

  return (
    <>
      <Cart
        list={list}
        setList={setList}
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        count={count}
        setCount={setCount}
        discount={discount}
        setDiscount={setDiscount}
        finalPrice={finalPrice}
        setFinalPrice={setFinalPrice}
      />
      <ItemsTable list={list} setList={setList} />
      <Total list={list} />
    </>
  );
};

export default Main;