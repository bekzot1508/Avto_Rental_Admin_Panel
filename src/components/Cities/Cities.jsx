import { useState,useEffect } from "react"
import { Modal, message,  Button, Table, Switch  } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cities = () => {
    const [GetCitiesData, setGetCitiesData] = useState([])
    const [PostCity, setPostCity] = useState({name:'', images:null, text:""})
    const [postCityOpener, setPostCityOpener] = useState(false)
  
    console.log(GetCitiesData);
    const token = localStorage.getItem("accessToken")
    const urlImage = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/"

    // Get Method cities
    const getCities = () => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities")
        .then(cities => cities.json())
        .then(cities => setGetCitiesData(cities.data))
    }

    // POST Method cities
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
            toast.success("yangi element qo'shildi") // bu funksiya chaqirilgani uchun re-fresh bermasa ham elemenrlar qo'shilaveradi
            document.getElementById("myCityForm").reset()
          } else {
            toast.error("xatolik")
          } 
        })
        .catch(err => {
         console.log(err);
        })
    }

    useEffect(() => {
        getCities()
    }, [])

        // cars table Column
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
    
        // Cars table dataSource
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
                <Button style={{ marginRight: '20px' }} type="primary"  >Edit</Button>
                <Button type="primary" danger  >Delete</Button>
              </>
            )
          }));
  return (
    <div>
         {/* Get Cities */}
       <div className="relative">
         <button className="rounded-md bg-blue-700 hover:bg-blue-600 text-white py-1 px-3  absolute top-3 right-4 z-20"  onClick={() => setPostCityOpener(true)}>add a City</button>
         <Table dataSource={dataSource} columns={columns} pagination={{pageSize: 5}}/>
       </div>

         {/* Post City */}
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

    </div>
  )
}

export default Cities