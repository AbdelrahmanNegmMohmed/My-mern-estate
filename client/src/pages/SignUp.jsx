import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";

export default function SignUp() {
  const [formData,setformData]=useState({})
  const [error,seterror]=useState(null);
  const [loading,setloading]=useState(false);
  const navegate =useNavigate()

  const handelChange=(e)=>{
    setformData({
      ...formData,
    [e.target.id]:e.target.value
    })
  };
  console.log(formData);
 
 
 
  const handelSubmit=async(e)=>{
    e.preventDefault();
    try {
      setloading(true)
      const res =await fetch('/api/auth/signup',{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData),
      });
      const data =await res.json();
      if(data.success === false ){
        seterror(data.message);
        setloading(false)
        return;
  
      }
      setloading(false)
      seterror(null);
      navegate('/sign-in')
      console.log(data);
      
    } catch (error) {
      setloading(false);
      seterror(error.message)
    }
  } 

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handelSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handelChange}

        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handelChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handelChange}

        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'loading....':'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
