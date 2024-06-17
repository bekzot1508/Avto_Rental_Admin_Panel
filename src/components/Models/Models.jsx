/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, message,  Button, Table,  } from 'antd';


const Models = () => {
    const [Models, setModels] = useState([])
    const [brands, setBrands] = useState([])
    const [postModels, setPostModels] = useState({name:"", brand_id:null})
    const [editModels, setEditModels] = useState({name:"", brand_title:"", brand_id:null})
    const [id, setId] = useState(null)
    const [postOpener, setPostOpener] = useState(false)
    const [open, setOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
//    console.log(brands);
  
  //  console.log(Models);

    // const urlImage = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";
    const token = localStorage.getItem("accessToken")
   
    // Get Models
    const getModels = () => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models")
        .then(response => response.json())
        .then(data => setModels(data?.data))
    }

    // Get brands
    const getBrands = () => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
        .then(response => response.json())
        .then(data => setBrands(data?.data))
       
    }

    useEffect(() => {
        getModels()
        getBrands()
    }, [])

    // POST method

    const createModels = (event) => {
        event.preventDefault() 
        const formData = new FormData();
        formData.append("name", postModels.name)
        formData.append("brand_id", postModels.brand_id)
        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models`, {
            headers: {
                Authorization: `Bearer ${token}`
             },
             method: 'POST',
             body: formData
        })
        .then(res => res.json())
        .then(res=>{
          if (res.success== true) {
            getModels()
            setPostOpener(false)
            toast.success("yangi element qo'shildi") // bu funksiya chaqirilgani uchun re-fresh bermasa ham elemenrlar qo'shilaveradi
            document.getElementById("myForm").reset()
          } else {
            toast.error("xatolik")
          } 
        })
        .catch(err => {
         console.log(err);
        })
    }

    // const createModelOpen = () => {

    // }

    // DELETE method
    const deleteModel = () => {
        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(res => {
            if(res.success) {
                setOpen(false)
                message.success("O'chirildi")
                const newModels =  Models.filter(item => item.id !== id)
                setModels(newModels)
              } else {
                message.error("O'chirilmadi")
              }
        })
    }

    const handleOpen = (id) => {
        setId(id)
        setOpen(true)
      }
    //   const handleClose = () => {
    //     setOpen(false)
    //     // setEditOpen(false)
    //   }
    

    // EDIT method
    const editModel = (event) => {
        event.preventDefault() 
        const formData = new FormData();
        formData.append("name", editModels.name)
        formData.append("brand_id", editModels.brand_id)
        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'PUT',
            body: formData
        })
        .then(res => res.json())
        .then(res => {
        if (res.success) {
            setEditOpen(false)
            message.success("edited")
            getModels()
        } else {
            message.error("xatolik")
        }
        })
        .catch(err => {
        console.log("error", err);
        })
    }
    
    const showEdit = (item) => {
        setId(item.id)
        setEditModels({...editModels, name:item.name, brand_title:item.brand_title, brand_id:item.brand_id})
        setEditOpen(true)
    }

      // post table column
      const columns = [
        {
          title: '№',
          dataIndex: 'number',
          key: 'number',
        },
        {
          title: 'Model',
          dataIndex: 'model',
          key: 'model',
        },
        {
            title: 'Brand Name',
            dataIndex: 'brand_name',
            key: 'brand_name',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
        },
      ];
      
        // post table DataSource
        const dataSource = Models.map((model, index) => ({
            key: model.id,
            number: index + 1,
            brand_name: model.brand_title,
            model: model.name,
            action: (
              <>
                <Button className="mr-[20px]" type="primary"  onClick={() => showEdit(model)}>Edit</Button>
                <Button type="primary" danger onClick={() => handleOpen(model.id)}>Delete</Button>
              </>
            )
          }));

  return (
    <div>
        {/* GET */}
      <div className="relative">
       <button className="rounded-md bg-blue-700 hover:bg-blue-600 text-white py-1 px-3  absolute top-1 right-4 z-10" onClick={() => setPostOpener(true)}>add Model</button>
        <Table size="small"  columns={columns} dataSource={dataSource}   pagination={{pageSize: 9}} />
      </div>

        {/* Post Modal */}
        <Modal title="Add a new model" open={postOpener} onOk={() => setPostOpener(true)} onCancel={() => setPostOpener(false)} footer={null} >
            <form id="myForm" onSubmit={createModels}>
               <div className="flex flex-col gap-4">
                 <div className="flex flex-col gap-1">
                    <label className="font-[600]">* Model Name</label>
                    <input type="text" onChange={(e) => setPostModels({...postModels, name:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                 </div>
                 <div className="flex flex-col gap-1">
                   <label className="font-[600]">* Brand Name</label>
                    <select  onChange={(e) => setPostModels({...postModels, brand_id:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1">
                        {
                            brands.map((brand, index) => (
                                <option 
                                key={index} 
                                value={brand.id} 
                                >
                                    {brand.title}
                                </option>
                            ))
                        }
                    </select>
                 </div>
               </div>
                 {/* buttons */}
                <div className="flex gap-5 mt-5 justify-end">
                  <button type='button' className="bg-blue-600 rounded-sm py-1 px-3 text-white" onClick={() => setPostOpener(false)}>Cencel</button>
                  <button type='submit' className="bg-green-600 rounded-sm py-1 px-3 text-white">Send</button>
                </div>
            </form>
       </Modal>

        {/* Delete Modal */}
        <Modal title="Delete" open={open} onOk={handleOpen} onCancel={() => setOpen(false)} footer={null} className="w-[300px]">
            <h2 className="font-[600] text-base">would you like to delete this?</h2>
            <div className="flex gap-8 mt-4 justify-end">
                <button onClick={() => setOpen(false)} className="bg-blue-600 rounded-sm py-1 px-3 text-white">Cancel</button> 
                <button onClick={deleteModel} className="bg-red-600 rounded-sm py-1 px-3 text-white">Delete</button>
            </div>
       </Modal>

         {/* Edit Modal */}
        <Modal title="Add a new model" open={editOpen} onOk={() => setEditOpen(true)} onCancel={() => setEditOpen(false)} footer={null} >
            <form id="myForm" onSubmit={editModel}>
               <div className="flex flex-col gap-4">
                 <div className="flex flex-col gap-1">
                    <label className="font-[600]">* Model Name</label>
                    <input type="text" value={editModels.name}  onChange={(e) => setEditModels({...editModels, name:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                 </div>
                 <div className="flex flex-col gap-1">
                   <label className="font-[600]">* Brand Name</label>
                    <select onChange={(e) => setEditModels({...editModels, brand_id:e.target.value})}  className="border-2 hover:border-blue-700 rounded-md px-3 py-1">
                        {
                            brands.map((brand, index) => (
                                <option 
                                  key={index} 
                                  value={brand.id}
                                >
                                    {brand.title}
                                </option>
                            ))
                        }
                    </select>
                 </div>
               </div>
                 {/* buttons */}
                <div className="flex gap-5 mt-5 justify-end">
                  <button type='button' className="bg-blue-600 rounded-sm py-1 px-3 text-white" onClick={() => setEditOpen(false)}>Cencel</button>
                  <button type='submit' className="bg-green-600 rounded-sm py-1 px-3 text-white">Edit</button>
                </div>
            </form>
       </Modal>

    </div>
  )
}

export default Models