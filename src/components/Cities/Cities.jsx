import { useState,useEffect } from "react"
import { Modal, message,  Button, Table, Switch  } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cities = () => {
  const [GetCitiesData, setGetCitiesData] = useState([])
  const [PostCity, setPostCity] = useState({name:'', images:null, text:""})
  const [EditCity, setEditCity] = useState({name:'', images:null, text:""})
  const [id, setId] = useState(null)
  const [postCityOpener, setPostCityOpener] = useState(false)
  const [deleteOpener, setDeleteOpener] = useState(false)
  const [editCityOpener, setEditCityOpener] = useState(false)
  

  //   #########################    TOKEN   ############################
  const token = localStorage.getItem("accessToken")
  const urlImage = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/"


  //   #########################    GET Method   ############################
  const getCities = () => {
      fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities")
      .then(cities => cities.json())
      .then(cities => setGetCitiesData(cities.data))
  }


  //  #########################    POST Method   ###########################
  const createCities = (event) => {
    event.preventDefault() 
    const formData = new FormData();
    formData.append("name", PostCity.name)
    formData.append("text", PostCity.text)
    formData.append("images", PostCity.images)
      fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(res=>{
        if (res.success== true) {
          getCities()
          setPostCityOpener(false)
          toast.success("yangi element qo'shildi")  
          document.getElementById("myCityForm").reset()
        } else {
          toast.error("xatolik")
        } 
      })
      .catch(err => {
        console.log(err);
      })
  }


  //   #########################    DELETE Method   ###########################
  const deleteCity = () => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cities/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(res => {
        if(res.success) {
            setDeleteOpener(false)
            message.success("O'chirildi")
            const newCities =  GetCitiesData.filter(item => item.id !== id)
            setGetCitiesData(newCities)
          } else {
            message.error("O'chirilmadi")
          }
    })
  }

  const deleteCityId = (id) => {
    setId(id)
    setDeleteOpener(true)
  }


  //   #########################    EDIT Method   ###########################
  const editCities = (event) => {
    event.preventDefault() 
    const formData = new FormData();
    formData.append("name", EditCity.name)
    formData.append("text", EditCity.text)
    formData.append("images", EditCity.images)
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cities/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'PUT',
        body: formData
    })
    .then(res => res.json())
    .then(res => {
    if (res.success) {
        setEditCityOpener(false)
        message.success("edited")
        getCities()
    } else {
        message.error("xatolik")
    }
    })
    .catch(err => {
    console.log("error", err);
    })
  }

  const showEditCity = (city) => {
    setId(city.id)
    setEditCity({...EditCity, name:city.name, text:city.text, images:city.images})
    setEditCityOpener(true)
  }


  useEffect(() => {
      getCities()
  }, [])


  //   #########################    Cities table Column  ###########################
  const columns = [
      {
        title: '№',
        dataIndex: 'number',
        key: 'number',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Text',
        dataIndex: 'text',
        key: 'text',
      },
      {
        title: 'Images',
        dataIndex: 'images',
        key: 'images',
      },
      {
        title: 'Actions',
        dataIndex: 'action',
        key: 'action',
      },
  ];
    
  //   #########################    Cities table dataSource  ###########################
  const dataSource = GetCitiesData.map((city, index) => ({
      key: city.id,
      number: index + 1,
      name: city.name,
      text: city.text,
      images: (
          <img className="w-[100px] h-[70px]" src={`${urlImage}${city.image_src}`} alt="Error" />
        ),
      action: (
        <>
          <Button style={{ marginRight: '20px' }} type="primary"  onClick={() => showEditCity(city)}>Edit</Button>
          <Button type="primary" danger  onClick={() => deleteCityId(city.id)}>Delete</Button>
        </>
      )
  }));


  return (
    <div>

      {/* #########################    GET Method   ############################ */}
      <div className="relative">
        <button className="rounded-md bg-blue-700 hover:bg-blue-600 text-white py-1 px-3  absolute top-3 right-4 z-20"  onClick={() => setPostCityOpener(true)}>add a City</button>
        <Table dataSource={dataSource} columns={columns} pagination={{pageSize: 5}}/>
      </div>

      {/* #########################    POST Method   ############################ */}
      <Modal title="Add a new model" open={postCityOpener} onOk={() => setPostCityOpener(true)} onCancel={() => setPostCityOpener(false)} footer={null} >
          <form id="myCityForm" onSubmit={createCities}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Name</label>
                  <input type="text" onChange={(e) => setPostCity({...PostCity, name:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Text</label>
                  <input type="text" onChange={(e) => setPostCity({...PostCity, text:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">*Upload images</label>
                  <input type="file" onChange={(e) => setPostCity({...PostCity, images:e.target.files[0]})} />
                </div>
              </div>
                {/* buttons */}
              <div className="flex gap-5 mt-5 justify-end">
                <button type='button' className="bg-blue-600 rounded-sm py-1 px-3 text-white" onClick={() => setPostCityOpener(false)}>Cencel</button>
                <button type='submit' className="bg-green-600 rounded-sm py-1 px-3 text-white">Send</button>
              </div>
          </form>
      </Modal>

      {/* #########################     DELETE Method   ############################ */}
      <Modal title="Delete" open={deleteOpener} onOk={() => setDeleteOpener(true)} onCancel={() => setDeleteOpener(false)} footer={null} className="w-[300px]">
        <h2 className="font-[600] text-base">would you like to delete this?</h2>
        <div className="flex gap-8 mt-4 justify-end">
            <button onClick={() => setDeleteOpener(false)} className="bg-blue-600 rounded-sm py-1 px-3 text-white">Cancel</button> 
            <button onClick={deleteCity} className="bg-red-600 rounded-sm py-1 px-3 text-white">Delete</button>
        </div>
      </Modal>

      {/* #########################     EDIT Method   ############################ */}
      <Modal title="edit the city" open={editCityOpener} onOk={() => setEditCityOpener(true)} onCancel={() => setEditCityOpener(false)} footer={null} >
          <form id="myCityForm" onSubmit={editCities}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Name</label>
                  <input type="text" value={EditCity.name} onChange={(e) => setEditCity({...EditCity, name:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Text</label>
                  <input type="text" value={EditCity.text} onChange={(e) => setEditCity({...EditCity, text:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">*Upload images</label>
                  <input type="file"  onChange={(e) => setEditCity({...EditCity, images:e.target.files[0]})} />
                </div>
              </div>
                {/* buttons */}
              <div className="flex gap-5 mt-5 justify-end">
                <button type='button' className="bg-blue-600 rounded-sm py-1 px-3 text-white" onClick={() => setEditCityOpener(false)}>Cencel</button>
                <button type='submit' className="bg-green-600 rounded-sm py-1 px-3 text-white">Send</button>
              </div>
          </form>
      </Modal>

    </div>
  )
}

export default Cities