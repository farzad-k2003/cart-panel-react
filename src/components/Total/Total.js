import "./Total.css";
import { calcDiscount } from "../../modules/calcDiscount";

const Total = ({ list }) => {
  const totalPrice = list.reduce(
    (total, item) => total + +item.count * +item.price,
    0
  );
  const totalPayment = list.reduce(
    (total, item) => total + +item.finalPrice,
    0
  );
  const totalDiscount = calcDiscount(totalPrice, totalPayment);

  return (
    <div className="total">
      <div className="total-price-container">
        <h3 className="total-price-heading">Total Price:</h3>
        <p className="total-price">${totalPrice}</p>
      </div>
      <div className="total-discount">
        <h3 className="total-discount-heading">Total Discount:</h3>
        <p className="total-discount">
          {totalDiscount ? Math.floor(totalDiscount) : 0}%
        </p>
      </div>
      <div className="total-payment">
        <h3 className="total-payment-heading">Total Payment:</h3>
        <p className="total-payment">${totalPayment}</p>
      </div>
    </div>
  );
};

export default Total;
