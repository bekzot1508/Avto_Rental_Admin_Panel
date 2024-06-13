import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login_page = () => {
    const navigate = useNavigate()
    const [phone, setPhone] = useState("")
    const [parol, setParol] = useState("")
  
    const tokenJon = localStorage.getItem("accessToken")
    useEffect(()=> {
        if(tokenJon?.length > 27) {
            navigate("/home")
        } else {
            localStorage.removeItem("accessToken")
            navigate("/")
        }
    })

  const logInSubmit = (e) => {
    e.preventDefault()
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin", {
        method: "POST",
        body: JSON.stringify({
            phone_number: phone,
            password: parol
        }),
        headers: {
            "content-type": "application/json; charset=UTF-8"
        }
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.success === true) {
            localStorage.setItem("accessToken", data?.data?.tokens?.accessToken?.token)
            toast.success(data?.message)
            navigate("/home")
        } else {
            toast.error(data?.message)
        }
       
    })
    .catch((error) => {
        console.log(error.message);
    })
    
  }

  return (
    <div className=' w-screen h-screen py-[10%] '>
        <form >
          <div className='grid grid-cols-1 gap-5  w-[300px] px-[48px] py-12  mx-auto shadow-2xl'>
            <div>
              <label htmlFor="">* User name</label>
              <input type="text" required onChange={(e) => setPhone(e?.target?.value)}  className='border-2 border-black rounded-xl px-2 py-1'/>
            </div>
            <div className=' mx-auto'>
              <label htmlFor="">* password</label>
              <input type="password" required onChange={(e) => setParol(e?.target?.value)} className='border-2 border-black rounded-xl px-2 py-1'/>
            </div>
            <button onClick={logInSubmit} type='submit' className=' border-2 border-black rounded-xl bg-blue-500 py-1 mt-5 text-white'>Log in</button>
          </div>
        </form>
    </div>
  )
}

export default Login_page