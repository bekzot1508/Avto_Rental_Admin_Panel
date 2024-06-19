// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Modal, Table } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Brand() {
  const [brand, setBrand] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [warning, setWarning] = useState(false);
  const [show, setShow] = useState(null);
  const [index, setIndex] = useState(null);
  const [title, setTitle] = useState("");
  const [images, setImages] = useState(null);
  const img_url = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";
  const url = "https://autoapi.dezinfeksiyatashkent.uz/api/brands";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxNzU3ODI4NywiZXhwIjoxNzQ5MTE0Mjg3fQ.I7H1QJJsao6-Ab9LkoyDq4t3WeP10L6XsD8zKWlYJno";
  // Method get
  const getBrands = () => {
    fetch(`${url}`)
      .then((res) => res.json())
      .then((item) => setBrand(item?.data))
      .catch((err) => {
        console.log(err);
      });
  };
  // Method post
  const postBrands = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("title", title);
    form_data.append("images", images);
    if (images && title) {
      fetch(`${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: form_data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            getBrands();
            handleCancel();
            toast.success("Added successfully", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            formReset();
          } else {
            toast.warning("Error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.warn("Input is empty");
    }
  };
  // Method put
  const putBrands = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("title", title);
    form_data.append("images", images);
    if (images && title) {
      fetch(`${url}/${index}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: form_data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            getBrands();
            handleCancel();
            toast.success("Edited");
            formReset();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.warning("Input is empty");
    }
  };
  // DELETE brand
  const deleteBrands = () => {
    fetch(`${url}/${index}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          const newBrand = brand.filter((item) => item.id !== index);
          setBrand(newBrand);
          setWarning(false);
          toast.success("Deleted", {
            position: "top-center",
          });
        } else {
          toast.warn("No deleted");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setWarning(false);
  };
  useEffect(() => {
    getBrands();
  }, []);
  //Form reset
  const formReset = () => {
    setTitle("");
    setImages(null);
  };
  // MODALGA OID FUNKSIYALAR
  const addModal = () => {
    setIsModalOpen(true);
    setShow(true);
  };
  const editModal = (item) => {
    setIndex(item.id);
    setIsModalOpen(true);
    setTitle(item.title);
    setImages(item.image_src);
    setShow(false);
  };
  const warningModal = (id) => {
    setIndex(id);
    setWarning(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    formReset();
  };
  const dataSource = brand.map((item, index) => ({
    key: item.id,
    number: index + 1,
    title: item.title,
    images: item.image_src,
    action: (
      <>
        <button
          onClick={() => warningModal(item.id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2"
        >
          <img src="/Images/delete.png" alt="error" />
        </button>
        <button
          onClick={() => editModal(item)}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          <img src="/Images/edit-text.png" alt="error" />
        </button>
      </>
    ),
  }));

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (item, index) => (
        <img className="w-10 h-10" src={`${img_url}${item}`} alt={index} />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Created</h2>
        <button
          onClick={addModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <svg
            className="h-6 w-6 p-1  inline-block rounded-full border border-white border-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
        </button>
      </div>
      <div className="overflow-x-auto">
        <Table
          className="my-8"
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 8 }}
        />
      </div>

      <div className="modals">
        <form action="">
          <Modal
            title={`${show ? "Add car brand" : "Edit car brand"}`}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,
              show ? (
                <Button key="submit" type="primary" onClick={postBrands}>
                  Add
                </Button>
              ) : (
                <Button
                  key="submit"
                  onClick={putBrands}
                  className="bg-orange-400 "
                  type="primary"
                >
                  Edit
                </Button>
              ),
            ]}
          >
            <Input
              onChange={(e) => setTitle(e.target.value)}
              className="my-4"
              type="text"
              placeholder="Brand name"
              value={title}
              required
            />
            <Input
              aria-label="File browser example"
              onChange={(e) => setImages(e.target.files[0])}
              className="my-4 "
              type="file"
              placeholder="Basic usage"
              required
            />
          </Modal>
        </form>
        <Modal
          open={warning}
          title="Delete item"
          onCancel={() => setWarning(false)}
          footer={[
            <Button onClick={() => setWarning(false)} key="back" type="default">
              Cancel
            </Button>,
            <Button onClick={deleteBrands} key="submit" type="primary">
              Delete
            </Button>,
          ]}
        ></Modal>
      </div>
    </div>
  );
}
