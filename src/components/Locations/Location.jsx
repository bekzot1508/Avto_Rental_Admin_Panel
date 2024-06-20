/* eslint-disable no-unused-vars */
import { Button, Input, Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Location() {
  const img_url = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";
  const url = "https://autoapi.dezinfeksiyatashkent.uz/api/locations";
  const token = localStorage.getItem("accessToken")



  const [locations, setLocations] = useState([]);
  const [isopen, setIsopen] = useState(false);
  const [ischeck, setIscheck] = useState(false);
  const [warning, setWarning] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  useEffect(() => {
    getLocations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handelOpen = () => {
    setIsopen(true);
    setIscheck(true);
   
  };
  const handelCancel = () => {
    setIsopen(false);
    formReset();
  };
  const formReset = () =>{
    setName("");
    setImage(null);
    setText("");
  }
  // Method GET
  const getLocations = () => {
    fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          const data = res?.data;
          setLocations(data);
        } else {
          toast.warn(message.error);
        }
      })
      .catch((err) => {
        toast.warn(err);
      });
  };
  // Method POST
  const createLocations = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("name", name);
    form_data.append("images", image);
    form_data.append("text", text);
    if (image && name && text) {
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
            getLocations();
            handelCancel();
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
            setIsopen(false);
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
  // Method PUT
  const editLocations = () => {
    const form_data = new FormData();
    form_data.append("images", image);
    form_data.append("name",name);
    form_data.append("text", text);
    if(name&&image&&text){
      fetch(`${url}/${id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        },
        method:"PUT",
        body: form_data,
      }).then(res=>res.json())
      .then(res=>{
        if(res.success){
          getLocations();
          setIsopen(false);
          formReset();
          toast.success("Edited",{
            position:"top-center"
          })
        }
        else{
          toast.warning("Error")
        }
      })
    }
    else{
      toast.warning("Input is empty")
    }
   
  };
  const getItem = (item) =>{
    setId(item.id);
    setName(item.name);
    setText(item.text);
    setImage(item.image_src);
    setIsopen(true);
    setIscheck(false);
  }
  // Method DELETE
  const deleteLocations = () => {
    fetch(`${url}/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      },
      method:"DELETE",
    }).then(res=>res.json())
    .then(res=>{
      if(res.success){
        const data = locations.filter(item=>item.id!==id);
        setLocations(data);
        toast.success("Deleted",{
        position:"top-center"
        })
        setWarning(false);
      }
      else{
        toast.warning("Error")
      }
    })
  };
  const warningModal = (item) =>{
    setWarning(true);
    setId(item);
  }


  const dataSource = locations.map((item, index) => ({
    key: index,
    name: item.name,
    text: item.text,
    slug: item.id,
    images: (
      <img
        key={index}
        className="w-10 h-10"
        src={`${img_url}${item.image_src}`}
        alt={index}
      />
    ),
    action: (
      <>
        <button onClick={()=>warningModal(item.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2">
          <img src="/Images/delete.png" alt="error" />
        </button>
        <button onClick={()=>getItem(item)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
          <img src="/Images/edit-text.png" alt="error" />
        </button>
      </>
    ),
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: " Slug",
      dataIndex: "slug",
      key: " slug",
    },
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <div className="py-2">
      <div className="flex justify-between items-center py-4">
        <h2 className="text-2xl font-bold mb-4">Create</h2>
        <button
          onClick={handelOpen}
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
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 6 }}
      />
      <div className="modals">
        <Modal className="form-modal"
          open={isopen}
          title={ischeck ? "Add locations" : "Edit locations"}
          onCancel={handelCancel}
          footer={[
            <Button className="bg-orange-400" onClick={handelCancel} key="back">
              Cancel
            </Button>,
            ischeck ? (
              <Button
                type="submit"
                onClick={createLocations}
                className="bg-blue-500"
              >
                Add
              </Button>
            ) : (
              <Button onClick={editLocations} className="bg-blue-500">Edit</Button>
            ),
          ]}
        >
          <form action="">
            <Input
              onChange={(e) => setName(e.target.value)}
              className="my-4"
              type="text"
              placeholder="Name"
              value={name}
            />
            <Input
              onChange={(e) => setText(e.target.value)}
              className="my-4"
              type="text"
              placeholder="Text"
              value={text}
            />
            <Input
              onChange={(e) => setImage(e.target.files[0])}
              className="my-4"
              type="file"
              placeholder="Name"
            />
          </form>
        </Modal>
        <Modal className="warning-modal"
         open={warning}
         title="Delete it"
         onCancel={()=>setWarning(false)}
         footer={[
          <Button  onClick={()=>setWarning(false)} key="back">
          Cancel
        </Button>,
        <Button className="bg-blue-400" onClick={deleteLocations} key="submit">
        Delete
      </Button>,
         ]}
        >
          
        </Modal>
      </div>
    </div>
  );
}
