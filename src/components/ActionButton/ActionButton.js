import Cart from "../Cart/Cart";
import "./ActionButton.css";
import { Modal } from "antd";
import { useState, useEffect } from "react";

const ActionButton = ({ title, id, list, setList, deleteStyle, editStyle }) => {
  const [editVisible, setEditVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState();

  const setName = (newName) => {
    setCurrentItem((prev) => {
      return { ...prev, name: newName };
    });
  };

  const setPrice = (newPrice) => {
    setCurrentItem((prev) => {
      return { ...prev, price: newPrice };
    });
  };

  const setCount = (newCount) => {
    setCurrentItem((prev) => {
      return { ...prev, count: newCount };
    });
  };

  const setDiscount = (value) => {
    setCurrentItem((prev) => {
      return { ...prev, discount: value };
    });
  };

  function setFinalPrice() {
    if (currentItem) {
      let finalPrice =
        currentItem.count *
        (currentItem.price - currentItem.price * (currentItem.discount / 100));

      setCurrentItem((prev) => {
        return { ...prev, finalPrice };
      });
    }
  }

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

  const onSubmit = (event) => {
    event.preventDefault();
    setList((prev) => {
      let updated = prev.map((item) => {
        if (item.key === currentItem.key) {
          return {
            ...item,
            name: currentItem?.name,
            price: currentItem?.price,
            count: currentItem?.count,
            discount: currentItem?.discount,
            finalPrice:
              currentItem?.count *
              (currentItem?.price -
                currentItem?.price * (currentItem?.discount / 100)),
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
        footer={null}
        okText="Edit"
      >
        <Cart
          list={list}
          setList={setList}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
          name={currentItem?.name}
          setName={setName}
          price={currentItem?.price}
          setPrice={setPrice}
          count={currentItem?.count}
          setCount={setCount}
          discount={currentItem?.discount}
          setDiscount={setDiscount}
          finalPrice={currentItem?.finalPrice}
          setFinalPrice={setFinalPrice}
          onSubmit={onSubmit}
        />
      </Modal>
    </>
  );
};

export default ActionButton;
