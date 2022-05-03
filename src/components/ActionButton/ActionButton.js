import Cart from "../Cart/Cart";
import "./ActionButton.css";
import { Modal, Slider } from "antd";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const ActionButton = ({ title, id, list, setList, deleteStyle, editStyle }) => {
  const { register, handleSubmit, error } = useForm();
  const [editVisible, setEditVisible] = useState(false);
  const [currentEditBtn, setCurrentEditBtn] = useState();
  const [currentItem, setCurrentItem] = useState();

  function changeHandler() {
    setCurrentItem((prev) => {
      let newFinalPrice;
      if (prev?.price) {
        let newPrice = prev?.price - prev?.price * (prev?.discount / 100);
        newFinalPrice = prev?.count * newPrice;
      }
      return { ...prev, finalPrice: newFinalPrice };
    });
  }

  useEffect(changeHandler, [
    currentItem?.discount,
    currentItem?.price,
    currentItem?.count,
    currentItem?.name,
  ]);

  const onSubmit = () => {
    setList((prev) => {
      let updated = prev.map((item) => {
        if (item.key === currentItem.key) {
          return {
            ...item,
            name: currentItem.name,
            price: currentItem.price,
            count: currentItem.count,
            discount: currentItem.discount,
            finalPrice:
              currentItem.count *
              (currentItem.price -
                currentItem.price * (currentItem.discount / 100)),
          };
        }
        return item;
      });
      return updated;
    });
    setEditVisible(false);
  };

  const onCancel = () => {
    setEditVisible(false);
    Modal.destroyAll();
    setCurrentItem(null);
  };

  const deleteHandler = (id) => {
    setList((prevList) => {
      let result = prevList.filter((item) => {
        return item.key !== id;
      });
      return result;
    });
  };

  const editHandler = (itemId) => {
    setEditVisible(!editVisible);
    setCurrentEditBtn(itemId);
    let myItem;
    list.map((item) => {
      if (item.key === itemId) {
        myItem = item;
      }
    });
    setCurrentItem(myItem);
  };
  return (
    <>
      <button
        id={id}
        className={`${title}-btn`}
        style={title === "delete" ? deleteStyle : editStyle}
        onClick={
          title === "delete"
            ? (event) => deleteHandler(event.target.id)
            : (event) => editHandler(event.target.id)
        }
      >
        {title.toUpperCase()}
      </button>
      <Modal
        destroyOnClose={true}
        visible={editVisible}
        onCancel={onCancel}
        onOk={onSubmit}
        okText="Edit"
      >
        <form className="modal-form">
          <label>Name: </label>
          <input
            type="text"
            {...register("name")}
            value={currentItem?.name}
            onChange={(event) => {
              setCurrentItem((prev) => {
                return { ...prev, name: event.target.value };
              });
            }}
          />
          <label>Price: </label>
          <input
            type="number"
            {...register("price")}
            value={currentItem?.price}
            onChange={(event) => {
              setCurrentItem((prev) => {
                return { ...prev, price: event.target.value };
              });
            }}
          />
          <label>Count of product: </label>
          <input
            type="number"
            {...register("count")}
            value={currentItem?.count}
            onChange={(event) => {
              setCurrentItem((prev) => {
                return { ...prev, count: event.target.value };
              });
            }}
          />
          <label>Discount: </label>
          <Slider
            defaultValue={currentItem?.discount}
            value={currentItem?.discount}
            min={0}
            max={100}
            id="discount"
            tipFormatter={(value) => `${value}%`}
            onChange={(value) => {
              setCurrentItem((prev) => {
                return { ...prev, discount: value };
              });
            }}
          />
          <p className="final-price">
            Final price:{" "}
            {currentItem?.finalPrice ? `$${currentItem?.finalPrice}` : "$0"}
          </p>
        </form>
      </Modal>
    </>
  );
};

export default ActionButton;
