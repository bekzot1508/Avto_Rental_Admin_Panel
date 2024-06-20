/* eslint-disable react/jsx-key */
import {useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import { Modal, message, Button, Table, Form, Input, Upload  } from 'antd';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';


const Categories = () => {
  const [category, setCategory] = useState([])
  const [data, setdata] = useState({name_en:"", name_ru:"", images:null})
  const [datas, setdatas] = useState({name_en:"", name_ru:"", images:null})
  const [form] = Form.useForm();
  const [postopener, setpostopener] = useState(false)
  const [open, setOpen] = useState(false)
  const [id, setid] = useState(null)
  const [editOpen, setEditOpen] = useState(false)


 //   #########################    TOKEN   ############################
  const urlImage = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/"
  const token = localStorage.getItem("accessToken")


  //   #########################    GET Method   ############################
  const getCategory = () => {
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/categories')
    .then(res => res.json())
    .then(category => {
      setCategory(category?.data);
    })
  }


  //  #########################    POST Method   ###########################
  const createCategory = (e) => {
       e.preventDefault()   
       const formData = new FormData();
       formData.append("name_en", data.name_en)
       formData.append("name_ru", data.name_ru)
       formData.append("images", data.images)
       fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
         headers: {
            Authorization: `Bearer ${token}`
         },
         method: 'POST', 
         body: formData
       })
       .then(res => res.json())
       .then(res=>{
        setpostopener(false)
        getCategory()
        toast.success("yangi element qo'shildi")  
        document.getElementById("myForm").reset()
       })
       .catch(err => {
        console.log(err);
       })
  }

  useEffect(() => {
    getCategory()
  }, [])


  //   #########################    DELETE Method   ###########################
  const handleOpen = (id) => {
    setid(id)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setEditOpen(false)
  }

  const deleteCategory = (e) => {
    e.preventDefault()
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "DELETE",
    })
    .then(res => res.json())
    .then(res => {
      if(res.success) {
        setOpen(false)
        message.success("O'chirildi")
        const newCategory =  category.filter(item => item.id !== id)
        setCategory(newCategory)
      } else {
        message.error("O'chirilmadi")
      }
    })
    .catch((err) => {
      console.log("Xatolik", err);
    })
  }


  //   #########################    EDIT Method   ###########################
  const showEdit = (item) => {
    setid(item?.id)
    form.setFieldsValue({
      name_en: item?.name_en,
      name_ru: item?.name_ru,
      images: [{ uid: item?.id, name: 'image', status: 'done', url: `${urlImage}${item?.image_src}` }], 
    });
    setEditOpen(true)
  }

  const editCategory = (e) => {
    const formData2 = new FormData();
    formData2.append("name_en", e?.name_en)
    formData2.append("name_ru", e?.name_ru)
    if (e?.images && e.images?.length > 0) {
      e?.images.forEach((image) => {
          if (image && image.originFileObj) {
            formData2.append('images', image?.originFileObj, image?.name);
          }
      });
    }
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "PUT",
      body: formData2
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        setEditOpen(false)
        message.success("edited")
        getCategory()
      } else {
        message.error("xatolik")
      }
    })
    .catch(err => {
      console.log("error", err);
    })
  }

     // Image file validation
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
};


  //   #########################    Categories table Column  ###########################
  const columns = [
    {
        title: '№',
        dataIndex: 'number',
        key: 'number',
    },
    {
        title: 'Name En',
        dataIndex: 'name_en',
        key: 'name_en',
    },
    {
        title: 'Name Ru',
        dataIndex: 'name_ru',
        key: 'name_ru',
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


  //   #########################    Categories table dataSource  ###########################
  const dataSource = category.map((categ, index) => ({
    key: categ.id,
    number: index + 1,
    name_en: categ.name_en,
    name_ru: categ.name_ru,
    images: (
        <img className="w-[100px] h-[70px]" src={`${urlImage}${categ.image_src}`} alt="Error" />
        ),
    action: (
        <>
        <Button style={{ marginRight: '20px' }} type="primary"  onClick={() => showEdit(categ)}>Edit</Button>
        <Button type="primary" danger  onClick={() => handleOpen(categ.id)}>Delete</Button>
        </>
    )
  }));


  return (
    <div>

       {/* #########################    GET Method   ############################ */}
       <div className="relative">
         <button className="rounded-md bg-blue-700 hover:bg-blue-600 text-white py-1 px-3  absolute top-3 right-4 z-20"  onClick={() => setpostopener(true)}>add a Category</button>
         <Table dataSource={dataSource} columns={columns} pagination={{pageSize: 5}}/>
       </div>


        {/* #########################    POST Method   ############################ */}
        <Modal title="Add a new Category" open={postopener} onOk={() => setpostopener(true)} onCancel={() => setpostopener(false)} footer={null} >
            <form id="myForm" onSubmit={createCategory}>
               <div className="flex flex-col gap-4">
                 <div className="flex flex-col gap-1">
                    <label className="font-[600]">* Name en</label>
                    <input type="text" onChange={(e) => setdata({...data, name_en:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                 </div>
                 <div className="flex flex-col gap-1">
                   <label className="font-[600]">* Name ru</label>
                   <input type="text" onChange={(e) => setdata({...data, name_ru:e.target.value})} className="border-2 hover:border-blue-700 rounded-md px-3 py-1"/>
                 </div>
                 <div className="flex flex-col gap-1">
                   <label className="font-[600]">*Upload images</label>
                   <input type="file"  onChange={(e) => setdata({...data, images:e.target.files[0]})} />
                 </div>
               </div>
                 {/* buttons */}
                <div className="flex gap-5 mt-5 justify-end">
                  <button type='button' className="bg-blue-600 rounded-sm py-1 px-3 text-white" onClick={() => setpostopener(false)}>Cencel</button>
                  <button type='submit' className="bg-green-600 rounded-sm py-1 px-3 text-white">Send</button>
                </div>
            </form>
        </Modal>


        {/* #########################     DELETE Method   ############################ */}
        <Modal title="Delete" open={open} onOk={handleOpen} onCancel={handleClose} footer={null} className="w-[300px]">
            <h2 className="font-[600] text-base">would you like to delete this?</h2>
            <div className="flex gap-8 mt-4 justify-end">
                <button onClick={handleClose} className="bg-blue-600 rounded-sm py-1 px-3 text-white">Cancel</button> 
                <button onClick={deleteCategory} className="bg-red-600 rounded-sm py-1 px-3 text-white">Delete</button>
            </div>
        </Modal>


       {/* #########################     EDIT Method   ############################ */}
       <Modal title="edit the city" open={editOpen} onOk={showEdit} onCancel={handleClose} footer={null} >
        <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={editCategory}>
            <Form.Item name="name_en" label="Name_en" rules={[{ required: true, message: 'Please enter the name' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="name_ru" label="Name_ru" rules={[{ required: true, message: 'Please enter the text' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Upload Image" name="images" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: 'Please upload an image' }]}>
              <Upload
                customRequest={({ onSuccess }) => {
                  onSuccess("ok")
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
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Edit
              </Button>
            </Form.Item>
        </Form>
       </Modal>
       
    </div>
  )
}

export default Categories