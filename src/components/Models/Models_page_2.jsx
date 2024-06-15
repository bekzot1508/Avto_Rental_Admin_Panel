/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, message } from 'antd';
import { NavLink, useNavigate} from "react-router-dom";

const Models_page_2 = () => {
    const [Models, setModels] = useState([])
    const [brands, setBrands] = useState([])
    const [postModels, setPostModels] = useState({name:"", brand_id:null})
    const [editModels, setEditModels] = useState({name:"", brand_title:"", brand_id:null})
    const [id, setId] = useState(null)
    const [postOpener, setPostOpener] = useState(false)
    const [open, setOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const navigate = useNavigate()
//    console.log(brands);
    const modelsPage_1 = Models.slice(10, 20)
   console.log(Models);

    // const urlImage = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxNzU3ODI4NywiZXhwIjoxNzQ5MTE0Mjg3fQ.I7H1QJJsao6-Ab9LkoyDq4t3WeP10L6XsD8zKWlYJno";
   
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
            getModels()
            setPostOpener(false)
            toast.success("yangi element qo'shildi") // bu funksiya chaqirilgani uchun re-fresh bermasa ham elemenrlar qo'shilaveradi
           document.getElementById("myForm").reset()
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

  return (
    <div>
        {/* GET */}
        <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div  class="overflow-hidden rounded-t-[5px]">
                            <table class="min-w-full text-left text-sm font-light text-surface dark:text-white ">
                                <thead class="border-b border-neutral-200   font-medium bg-gray-100 dark:border-white/10 relative">
                                    <tr>
                                        <th scope="col" class="px-6 py-4 ">Name</th>
                                        <th scope="col" class="px-6 py-4">Brand</th>
                                        <th scope="col" class="px-6 py-4">Actions</th> 
                                    </tr>
                                    <button className="rounded-md bg-blue-700 hover:bg-blue-600 text-white p-2  absolute top-2 right-4" onClick={() => setPostOpener(true)}>add model</button>
                                </thead>
                                {
                                   modelsPage_1.map((model, index) => (
                                        <tbody key={index}>
                                            <tr class="border-b border-neutral-200 dark:border-white/10">
                                                <td class="whitespace-nowrap px-6 py-4  font-[500]">{model.name}</td>
                                                <td class="whitespace-nowrap px-6 py-4 font-[500]">{model.brand_title}</td>
                                                <td class="whitespace-nowrap px-6 py-4">
                                                    <button className="mr-2 bg-blue-600 py-1 px-3 text-white rounded-md" onClick={() => showEdit(model)}>Edit</button>
                                                    <button className="bg-red-600 py-1 px-3 text-white rounded-md" onClick={() => handleOpen(model?.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))
                                }
                            </table>
                        </div>  
                       <div className="flex gap-4 mt-3 justify-end pr-20">
                            <button onClick={() => navigate("/home/models")} className={`bg-blue-500 px-4 py-1 rounded-sm text-white font-[600] hover:bg-blue-700`}>1</button>   
                            <button onClick={() => navigate("/home/models/models_2")} className={`bg-blue-500 px-4 py-1 rounded-sm text-white font-[600] hover:bg-blue-700`}>2</button>   
                            <button onClick={() => navigate("/home/models/models_3")} className={`bg-blue-500 px-4 py-1 rounded-sm text-white font-[600] hover:bg-blue-700`}>3</button>   
                       </div>
                </div>
            </div>
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
                    <select   className="border-2 hover:border-blue-700 rounded-md px-3 py-1">
                        {
                            brands.map((brand, index) => (
                                <option 
                                key={index} 
                                onChange={(e) => setEditModels({...editModels, brand_id:e.target.value})}
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

export default Models_page_2