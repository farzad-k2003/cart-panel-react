import { Table } from "antd";
import ActionButton from "../ActionButton";
import "./ItemsTable.css";

const ItemsTable = ({ list, setList }) => {
  const deleteStyle = {
    width: "100%",
    color: "white",
    backgroundColor: "red",
    margin: "2px",
    padding: "1px 3px",
    border: "none",
    borderRadius: "2px",
  };
  const editStyle = {
    width: "100%",
    color: "white",
    backgroundColor: "green",
    margin: "2px",
    padding: "1px 3px",
    border: "none",
    borderRadius: "2px",
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
      render: (count) => `${count}x`,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => `${discount}%`,
    },
    {
      title: "Final Price",
      dataIndex: "finalPrice",
      key: "finalPrice",
      render: (price) => `$${price}`,
    },
    {
      title: "Action",
      dataIndex: "key",
      render: (id) => {
        return (
          <div className="action">
            <ActionButton
              list={list}
              title="delete"
              id={id}
              setList={setList}
              deleteStyle={deleteStyle}
            />
            <ActionButton
              list={list}
              title="edit"
              id={id}
              setList={setList}
              editStyle={editStyle}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="Table">
      <Table
        dataSource={
          list.length === 0 ? JSON.parse(localStorage.getItem("data")) : list
        }
        columns={columns}
      />
    </div>
  );
};

export default ItemsTable;
