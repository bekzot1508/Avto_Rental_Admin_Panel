/* eslint-disable no-dupe-keys */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react"
import { Modal, message,  Button, Table, Switch, Form, Input, Upload, Select} from 'antd';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';

 

const Cars = () => {
    const [GetCarsData, setGetCarsData] = useState([])
    const [GetBrandsData, setBrandsData] = useState([])
    const [GetModelsData, setModelsData] = useState([])
    const [GetCitiesData, setGetCitiesData] = useState([])
    const [GetCategoryData, setGetCategoryData] = useState([])
    const [GetLocationData, setGetLocationData] = useState([])
    const [postCarModels, setPostCarModels] = useState({
      brand_id:null, 
      model_id:null, 
      city_id:null, 
      category_id:null, 
      location_id:null, 
      color:"", 
      year:null, 
      seconds:null,
      max_speed:null,
      max_people:null,
      transmission:"",
      motor:"",
      drive_side:"",
      petrol:"",
      limitperday:"",
      deposit:null,
      premium_protection:"",
      price_in_aed:null,
      price_in_usd:null,
      price_in_aed_sale:null,
      price_in_usd_sale:null,
      inclusive:false,
      images:null,
      images:null,
      cover:null
    })
   
    const [EditCarModels, setEditCarModels] = useState({
      brand_id:null, 
      model_id:null, 
      city_id:null, 
      category_id:null, 
      location_id:null, 
      color:"", 
      year:null, 
      seconds:null,
      max_speed:null,
      max_people:null,
      transmission:"",
      motor:"",
      drive_side:"",
      petrol:"",
      limitperday:"",
      deposit:null,
      premium_protection:"",
      price_in_aed:null,
      price_in_usd:null,
      price_in_aed_sale:null,
      price_in_usd_sale:null,
      inclusive:false,
      images:null,
      images:null,
      cover:null
    })
    const [form] = Form.useForm();
    const [id, setId] = useState(null)
    const [postCarOpener, setPostCarOpener] = useState(false)
    const [open, setOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [inclusive, setInclusive] = useState(false);
 
 
   //   #########################    TOKEN    ############################
  const token = localStorage.getItem("accessToken")
  const urlImage = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/"

  // #########################    Get Cars    ############################
  const getCars = () => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars")
        .then(response => response.json())
        .then(data => setGetCarsData(data?.data))
  }

  // #########################    Get Brands   ############################
  const getBrands = () => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
        .then(res => res.json())
        .then(res => setBrandsData(res?.data))
       
  }

  // #########################    Get Models    ############################
  const getModels = () => {
      fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models")
       .then(model => model.json())
       .then(model => setModelsData(model?.data))
  }

  // #########################    Get Cities    ############################
   const getCities = () => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities")
        .then(response => response.json())
        .then(data =>setGetCitiesData(data?.data))
  }

  // #########################    Get Categories    ############################
   const getCategory = () => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
        .then(response => response.json())
        .then(data =>setGetCategoryData(data?.data))
  }

  // #########################    Get Locations   ############################
  const getLocation = () => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/locations")
        .then(response => response.json())
        .then(data =>setGetLocationData(data?.data))
  }

 useEffect(() => {
        getCars()
        getBrands()
        getModels()
        getCities()
        getCategory()
        getLocation()
 }, [])


  // #########################    POST Method   ############################
  const postCar = (event) => {
    event.preventDefault() 
    const formData = new FormData();
    formData.append("brand_id", postCarModels?.brand_id)
    formData.append("model_id", postCarModels?.model_id)
    formData.append("city_id", postCarModels?.city_id)
    formData.append("category_id", postCarModels?.category_id)
    formData.append("location_id", postCarModels?.location_id)
    formData.append("color", postCarModels?.color)
    formData.append("year", postCarModels?.year)
    formData.append("seconds", postCarModels?.seconds)
    formData.append("max_speed", postCarModels?.max_speed)
    formData.append("max_people", postCarModels?.max_people)
    formData.append("transmission", postCarModels?.transmission)
    formData.append("motor", postCarModels?.motor)
    formData.append("drive_side", postCarModels?.drive_side)
    formData.append("petrol", postCarModels?.petrol)
    formData.append("limitperday", postCarModels?.limitperday)
    formData.append("deposit", postCarModels?.deposit)
    formData.append("premium_protection", postCarModels?.premium_protection)
    formData.append("price_in_aed", postCarModels?.price_in_aed)
    formData.append("price_in_usd", postCarModels?.price_in_usd)
    formData.append("price_in_aed_sale", postCarModels?.price_in_aed_sale)
    formData.append("price_in_usd_sale", postCarModels?.price_in_usd_sale)
    formData.append("inclusive", postCarModels?.inclusive)
    formData.append("images", postCarModels?.images)
    formData.append("images", postCarModels?.images)
    formData.append("cover", postCarModels?.cover)
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars", {
      headers: {
        Authorization: `Bearer ${token}`
     },
     method: 'POST',
     body: formData
    })
    .then(res => res.json())
    .then(res=>{
        getCars()
        setPostCarOpener(false)
        message?.success("yangi element qo'shildi") // bu funksiya chaqirilgani uchun re-fresh bermasa ham elemenrlar qo'shilaveradi
        document?.getElementById("myCarForm").reset()
    })
    .catch(err => {
     console.log(err);
    })
  }


  // #########################    DELETE Method    ############################
  const deleteModel = () => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cars/${id}`, {
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
          const newCars =  GetCarsData?.filter(item => item?.id !== id)
          setGetCarsData(newCars)
        } else {
          message.error("O'chirilmadi")
        }
    })
  }

  const deleteCars = (id) => {
    setId(id)
    setOpen(true)
  }


  // #########################   EDIT Method   ############################
    const editCar = (event) => {
      const formData2 = new FormData();
      formData2.append("brand_id", event?.brand_id)
      formData2.append("model_id", event?.model_id)
      formData2.append("city_id", event?.city_id)
      formData2.append("category_id", event?.category_id)
      formData2.append("location_id", event?.location_id)
      formData2.append("color", event?.color)
      formData2.append("year", event?.year)
      formData2.append("seconds", event?.seconds)
      formData2.append("max_speed", event?.max_speed)
      formData2.append("max_people", event?.max_people)
      formData2.append("transmission", event?.transmission)
      formData2.append("motor", event?.motor)
      formData2.append("drive_side", event?.drive_side)
      formData2.append("petrol", event?.petrol)
      formData2.append("limitperday", event?.limitperday)
      formData2.append("deposit", event?.deposit)
      formData2.append("premium_protection", event?.premium_protection)
      formData2.append("price_in_aed", event?.price_in_aed)
      formData2.append("price_in_usd", event?.price_in_usd)
      formData2.append("price_in_aed_sale", event?.price_in_aed_sale)
      formData2.append("price_in_usd_sale", event?.price_in_usd_sale)
      formData2.append('inclusive', inclusive);
      if (event.images1 && event.images1.length > 0) {
        event.images1.forEach((image) => {
          if (image && image.originFileObj) {
            formData2.append('images', image.originFileObj, image.name);
          }
        });
      }
      if (event.images2 && event.images2.length > 0) {
        event.images2.forEach((image) => {
          if (image && image.originFileObj) {
            formData2.append('images', image.originFileObj, image.name);
          }
        });
      }
      if (event.cover && event.cover.length > 0) {
        event.cover.forEach((image) => {
          if (image && image.originFileObj) {
            formData2.append('cover', image.originFileObj, image.name);
          }
        });
      }
      // formData2.append("images", EditCarModels?.images)
      // formData2.append("images", EditCarModels?.images)
      // formData2.append("cover", EditCarModels?.cover)
      fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
       },
       method: 'PUT',
       body: formData2
      })
      .then(res => res.json())
      .then(res=>{
        if (res?.success == true) {
          setEditOpen(false)
          message.success("edited") 
          getCars()
          // document.getElementById("myCarForm").reset()
        } else {
          message.error("Xatolik")
        }
       
      })
      .catch(err => {
       console.log(err);
      })
    }

    const showCarEdit = (item) => {
      setId(item.id)
      console.log(item);
      form.setFieldsValue({
        brand_id: item.brand_id,
        model_id: item.model_id,
        city_id: item.city_id,
        color: item.color,
        year: item.year,
        seconds: item.seconds,
        category_id: item.category_id,
        max_speed: item.max_speed,
        max_people: item.max_people,
        transmission: item.transmission,
        motor: item.motor,
        drive_side: item.drive_side,
        petrol: item.petrol,
        limitperday: item.limitperday,
        deposit: item.deposit,
        premium_protection: item.premium_protection,
        price_in_aed: item.price_in_aed,
        price_in_usd: item.price_in_usd,
        price_in_aed_sale: item.price_in_aed_sale,
        price_in_usd_sale: item.price_in_usd_sale,
        location_id: item.location_id,
        inclusive: item.inclusive,
        images: [{ uid: item?.id, name: 'image', status: 'done', url: `${urlImage}${item?.car_images[0]?.image?.src}` }], 
        images: [{ uid: item?.id, name: 'image', status: 'done', url: `${urlImage}${item?.car_images[1]?.image?.src}` }], 
        cover: [{ uid: item?.id, name: 'image', status: 'done', url: `${urlImage}${item?.car_images[2]?.image?.src}` }], 
      });
      // setEditCarModels({...EditCarModels, brand_id:item?.brand_id, model_id:item?.model_id, city_id:item?.city_id, category_id:item?.category_id, location_id:item?.location_id, color:item?.color, year:item?.year, seconds:item?.seconds, max_speed:item?.max_speed, max_people:item?.max_people, transmission:item?.transmission, motor:item?.motor, drive_side:item?.drive_side, petrol:item?.petrol, limitperday:item?.limitperday, deposit:item?.deposit, premium_protection:item?.premium_protection, price_in_aed:item?.price_in_aed, price_in_usd:item?.price_in_usd, price_in_aed_sale:item?.price_in_aed_sale, price_in_usd_sale:item?.price_in_usd_sale, inclusive:item?.inclusive, images:item?.images, images:item?.images, cover:item?.cover})
      setEditOpen(true)
    }

    const beforeUpload = (file) => {
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const isValidFile = allowedExtensions.includes(fileExtension);
  
      if (!isValidFile) {
        message.error('You can only upload JPG/JPEG/PNG files!');
      }
  
      return isValidFile;
    };
  
    // Handle file upload events
    const normFile = (e) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    }


  // #########################    cars table Column    ############################
  const columns = [
      {
        title: '№',
        dataIndex: 'number',
        key: 'number',
      },
      {
        title: 'Rangi',
        dataIndex: 'rangi',
        key: 'rangi',
      },
      {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
      },
      {
        title: 'Model',
        dataIndex: 'model',
        key: 'model',
      },
      {
        title: 'Kategoriya',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: 'Lokatsiya',
        dataIndex: 'location',
        key: 'location',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
      },
  ];

    // Cars table dataSource
  const dataSource = GetCarsData?.map((item, index) => ({
      key: item?.id,
      number: index + 1,
      rangi: item?.color,
      brand: item?.brand.title,
      model: item?.model.name,
      category: item?.category?.name_en,
      location: item?.location?.name,
      action: (
        <>
          <Button style={{ marginRight: '20px' }} type="primary" onClick={() => showCarEdit(item)}>Edit</Button>
          <Button type="primary" danger onClick={() => deleteCars(item?.id)}>Delete</Button>
        </>
      )
  }));
  return (
    <div>
      {/*  #########################    GET Method    ############################  */}
      <div className="relative">
        <button className="rounded-md bg-blue-700 hover:bg-blue-600 text-white py-1 px-3  absolute top-3 right-4 z-20" onClick={() => setPostCarOpener(true)}>add a Car</button>
        <Table dataSource={dataSource} columns={columns}/>
      </div>

      {/*  #########################    POST Method     ############################  */}
      <Modal title="Add a New Car" open={postCarOpener} onOk={() => setPostCarOpener(true)} onCancel={() => setPostCarOpener(false)} footer={null} >
          <form id="myCarForm" onSubmit={postCar}>
              <div className="flex flex-col gap-5">

                {/* category */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Category</label>
                    <select  onChange={(e) => setPostCarModels({...postCarModels, category_id:e?.target?.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1">
                        {
                            GetCategoryData.map((category, index) => (
                                <option key={index} value={category?.id}> 
                                  {category?.name_en}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* Brand */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Brand</label>
                    <select  onChange={(e) => setPostCarModels({...postCarModels, brand_id:e?.target?.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1">
                        {
                            GetBrandsData.map((brand, index) => (
                                <option key={index} value={brand?.id}> 
                                  {brand?.title}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* Models */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Model</label>
                    <select  onChange={(e) => setPostCarModels({...postCarModels, model_id:e?.target?.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1">
                        {
                            GetModelsData.map((model, index) => (
                                <option key={index} value={model?.id}> 
                                  {model?.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Location</label>
                    <select  onChange={(e) => setPostCarModels({...postCarModels, location_id:e?.target?.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1">
                        {
                            GetLocationData.map((location, index) => (
                                <option key={index} value={location?.id}> 
                                  {location?.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* Cities */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* City</label>
                    <select  onChange={(e) => setPostCarModels({...postCarModels, city_id:e?.target?.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1">
                        {
                            GetCitiesData?.map((city, index) => (
                                <option key={index} value={city?.id}> 
                                  {city?.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* Color */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Color</label>
                  <input type="text" onChange={(e) => setPostCarModels({...postCarModels, color:e?.target?.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1" />
                </div>

                {/* Yil */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Yil</label>
                  <input type="text" onChange={(e) => setPostCarModels({...postCarModels, year:e?.target?.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                </div>

                {/* Seconds */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Seconds</label>
                  <input type="text" onChange={(e) => setPostCarModels({...postCarModels, seconds:e?.target?.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                </div>

                {/* Speed */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Max Speed</label>
                  <input type="text" onChange={(e) => setPostCarModels({...postCarModels, max_speed:e?.target?.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                </div>

                {/* Max People */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Max People</label>
                  <input type="text" onChange={(e) => setPostCarModels({...postCarModels, max_people:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                </div>

                {/* Motor */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Motor</label>
                  <input type="text" onChange={(e) => setPostCarModels({...postCarModels, motor:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                </div>

                {/* Transmission */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Transmission</label>
                  <input type="text" onChange={(e) => setPostCarModels({...postCarModels, transmission:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                </div>

                {/* Drive side */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Drive Side </label>
                  <input type="text" onChange={(e) => setPostCarModels({...postCarModels, drive_side:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                </div>

                {/* Yoqilg'i */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Yoqilg'i  </label>
                  <input type="text" onChange={(e) => setPostCarModels({...postCarModels, petrol:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                </div>

                {/* Limit Per Day */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Limit Per Day </label>
                  <input type="text" onChange={(e) => setPostCarModels({...postCarModels, limitperday:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                </div>

                {/* Deposit */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Deposit</label>
                  <input type="text" onChange={(e) => setPostCarModels({...postCarModels, deposit:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                </div>

                {/* Premium Protection Price */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Premium Protection Price</label>
                  <input type="text" onChange={(e) => setPostCarModels({...postCarModels, premium_protection:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                </div>

                {/* Price in AED */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Price in AED</label>
                  <input type="text" onChange={(e) => setPostCarModels({...postCarModels, price_in_aed:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                </div>

                {/* Price in USD */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Price in USD</label>
                  <input type="text" onChange={(e) => setPostCarModels({...postCarModels, price_in_usd:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                </div>

                {/* Price in AED (Otd) */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Price in AED (Otd)</label>
                  <input type="text" onChange={(e) => setPostCarModels({...postCarModels, price_in_aed_sale:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                </div>

                {/* Price in USD (OTD)*/}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Price in USD(Otd)</label>
                  <input type="text" onChange={(e) => setPostCarModels({...postCarModels, price_in_usd_sale:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                </div>

                {/* Inclusive */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Inclusive</label>
                  <Switch  onChange={(e) =>  setPostCarModels({...postCarModels, inclusive:e})}/> 
                  {/* setPostCarModels({...postCarModels, inclusive:e.target.value}) */}
                </div>

                {/* Upload car images */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Upload car images</label>
                  <input type="file" onChange={(e) => setPostCarModels({...postCarModels, images:e.target.files[0]})}/>
                </div>

                {/* Upload the main image */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Upload the main image</label>
                  <input type="file" onChange={(e) => setPostCarModels({...postCarModels, images:e.target.files[0]})}/>
                </div>

                {/* Upload the cover image */}
                <div className="flex flex-col gap-1">
                  <label className="font-[600]">* Upload the cover image</label>
                  <input type="file" onChange={(e) => setPostCarModels({...postCarModels, cover:e.target.files[0]})}/>
                </div>

              </div>

                {/* buttons */}
              <div className="flex gap-5 mt-5 justify-end">
                <button type='button' className="bg-blue-600 rounded-sm py-1 px-3 text-white" onClick={() => setPostCarOpener(false)}>Cencel</button>
                <button type='submit' className="bg-green-600 rounded-sm py-1 px-3 text-white">Send</button>
              </div>
          </form>
      </Modal>


      {/*  #########################    DELETE Method     ############################  */}
      <Modal title="Delete" open={open} onOk={deleteCars} onCancel={() => setOpen(false)} footer={null} className="w-[300px]">
        <h2 className="font-[600] text-base">would you like to delete this?</h2>
        <div className="flex gap-8 mt-4 justify-end">
            <button onClick={() => setOpen(false)} className="bg-blue-600 rounded-sm py-1 px-3 text-white">Cancel</button> 
            <button onClick={deleteModel} className="bg-red-600 rounded-sm py-1 px-3 text-white">Delete</button>
        </div>
      </Modal>

      {/*  #########################    EDIT Method     ############################  */}
      <Modal title="Edit Car" open={editOpen} onOk={() => setEditOpen(true)} onCancel={() => setEditOpen(false)} footer={null} >
        <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} onFinish={editCar}>
          <Form.Item
            label="Category"
            name="category_id"
            rules={[{ required: true, message: 'Please select a category!', }]}
            style={{ display: "block", width:"100%"}}
          >
            <Select placeholder="Select Category">
              {GetCategoryData.map(item => (
                <Select.Option key={item.id} value={item.id} disabled={item.disabled}>
                  {item.name_en}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Brand"
            name="brand_id"
            rules={[{ required: true, message: 'Please input!', }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Select placeholder="Select Brand">
              {GetBrandsData.map(item => (
                <Select.Option key={item.id} value={item.id} disabled={item.disabled}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Model"
            name="model_id"
            rules={[{ required: true, message: 'Please input!', }]}
            style={{ flex: '0 0 33%' }}
          >
            <Select placeholder="Select Model">
              {GetModelsData.map(item => (
                <Select.Option key={item.id} value={item.id} disabled={item.disabled}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Location"
            name="location_id"
            rules={[{ required: true, message: 'Please input!', }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Select placeholder="Select Location" >
              {GetLocationData.map(item => (
                <Select.Option key={item.id} value={item.id} disabled={item.disabled}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="City"
            name="city_id"
            rules={[{ required: true, message: 'Please input!', }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Select placeholder="Select City">
              {GetCitiesData.map(item => (
                <Select.Option key={item.id} value={item.id} disabled={item.disabled}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true, message: 'Please enter the name' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="year"
            label="Yil"
            rules={[{ required: true, message: 'Please enter the year' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="seconds"
            label="Seconds"
            rules={[{ required: true, message: 'Please enter the color' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="max_speed"
            label="Speed"
            rules={[{ required: true, message: 'Please enter the speed' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="max_people"
            label="Max People"
            rules={[{ required: true, message: 'Please enter the max people' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="motor"
            label="Motor"
            rules={[{ required: true, message: 'Please enter the motor' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="transmission"
            label="Transmission"
            rules={[{ required: true, message: 'Please enter the transmission' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="drive_side"
            label="Drive Side"
            rules={[{ required: true, message: 'Please enter the drive side' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="petrol"
            label="Yoqilg'i"
            rules={[{ required: true, message: 'Please enter the yoqilg\'i' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="limitperday"
            label="Limit Per Day"
            rules={[{ required: true, message: 'Please enter the limit per day' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="deposit"
            label="Deposit"
            rules={[{ required: true, message: 'Please enter the deposit' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="premium_protection"
            label="Premium Protection Price"
            rules={[{ required: true, message: 'Please enter the premium protection price' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price_in_aed"
            label="Price in AED"
            rules={[{ required: true, message: 'Please enter the price in AED' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price_in_usd"
            label="Price in USD(Otd)"
            rules={[{ required: true, message: 'Please enter the price in USD(Otd)' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price_in_aed_sale"
            label="Price in AED (Otd)"
            rules={[{ required: true, message: 'Please enter the price in AED (Otd)' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price_in_usd_sale"
            label="Price in USD"
            rules={[{ required: true, message: 'Please enter the price in USD' }]}
            style={{ flex: '0 0 33%', paddingRight: '8px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="inclusive"
            label="Inclusive"
            style={{ flex: '0 0 15%', paddingRight: '8px' }}
            initialValue={inclusive} 
            valuePropName="checked"
          >
          <Switch onChange={(checked) => setInclusive(checked)} /> 
          </Form.Item>

          {/* Picture */}
          <Form.Item
            name="images1"
            label="Upload car images"
            rules={[{ required: true, message: 'Please upload images' }]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            style={{ flex: '0 0 25%', paddingRight: '8px' }}
          >
            <Upload
              customRequest={({ onSuccess }) => {
                onSuccess('ok');
              }}
              beforeUpload={beforeUpload}
              listType="picture-card"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            name="images2"
            label="Upload the main image"
            rules={[{ required: true, message: 'Please upload the main image' }]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            style={{ flex: '0 0 25%', paddingRight: '8px' }}
          >
            <Upload
              customRequest={({ onSuccess }) => {
                onSuccess('ok');
              }}
              beforeUpload={beforeUpload}
              listType="picture-card"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          
          <Form.Item
            name="cover"
            label="Upload the cover image"
            rules={[{ required: true, message: 'Please upload the cover image' }]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            style={{ flex: '0 0 25%', paddingRight: '8px' }}
          >
            <Upload
              customRequest={({ onSuccess }) => {
                onSuccess('ok');
              }}
              beforeUpload={beforeUpload}
              listType="picture-card"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          
          <Form.Item style={{ flex: '0 0 100%' }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
          
      </Modal>

    </div>
  )
}

export default Cars