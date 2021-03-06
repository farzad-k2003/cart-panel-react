import { Slider } from "antd";
import { useEffect } from "react";
import "./Cart.css";

const Cart = ({
  list,
  setList,
  name,
  setName,
  price,
  setPrice,
  count,
  setCount,
  discount,
  setDiscount,
  finalPrice,
  setFinalPrice,
  onSubmit,
}) => {
  function changeHandler() {
    setFinalPrice(() => {
      if (price) {
        let newPrice = price - price * (discount / 100);
        return count * newPrice;
      } else {
        return;
      }
    });
  }

  useEffect(changeHandler, [discount, price, count, name, list]);

  return (
    <div className="Cart">
      <form>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor="price">Price: </label>
        <input
          type="number"
          min={0}
          id="price"
          name="price"
          value={price}
          onChange={(event) =>
            event.target.value !== 0 && setPrice(event.target.value)
          }
        />
        <label htmlFor="count">Count of product: </label>
        <input
          type="number"
          min={1}
          id="count"
          name="count"
          value={count}
          onChange={(event) => setCount(event.target.value)}
        />

        <label htmlFor="discount">Discount: </label>
        <Slider
          defaultValue={discount}
          value={discount}
          min={0}
          max={100}
          id="discount"
          tipFormatter={(value) => `${value}%`}
          onChange={(value) => {
            setDiscount(value);
          }}
        />
        <p className="final-price">
          Final price: {finalPrice ? `$${finalPrice}` : "$0"}
        </p>
        <button onClick={onSubmit}>ADD</button>
      </form>
    </div>
  );
};

export default Cart;
