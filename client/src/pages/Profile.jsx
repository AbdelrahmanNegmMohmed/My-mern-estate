import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase";
import {
  updateuserFailure,
  ubdateuserSuccess,
  ubdateuserStart,
  deleteuserStart,
deleteuserSuccess,
deleteuserFailure,
sidnoutuserStart,
sidnoutuserSuccess,
sidnoutuserFailure,
} from "../Redux/user/userslise.js";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setfile] = useState(undefined);
  const [fileperc, setfileperc] = useState(0);
  const [fileerror, setfileerror] = useState(false);
  const [formdata, setformdata] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handelfileuploade(file);
    }
  }, [file]);
  const handelfileuploade = (file) => {
    const storge = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storgeRef = ref(storge, filename);
    const uploadtask = uploadBytesResumable(storgeRef, file);
    uploadtask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setfileperc(Math.round(progress));
      },
      (error) => {
        setfileerror(true);
      },
      () => {
        getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) =>
          setformdata({
            ...formdata,
            avatar: downloadURL,
          })
        );
      }
    );
  };
  const handelchange = (e) => {
    setformdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  const handelsubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(ubdateuserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateuserFailure(data.message));
        return;
      }
      dispatch(ubdateuserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateuserFailure(error.message));
    }
  };

  const handeldeleteuser = async () => {
    try {
      dispatch(deleteuserFailure())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:"DELETE",

      });
      const data=await res.json();
      if (data.success === false){
        dispatch(deleteuserFailure(data.message))
        return;
      }
      dispatch(deleteuserSuccess(data))
    } catch (error) {
      dispatch(deleteuserFailure(error.message))
    }
  };
  const handelsignout = async() =>{
    try {
      dispatch(sidnoutuserStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        dispatch(sidnoutuserFailure(data.message))
      }
      dispatch(sidnoutuserSuccess(data))
      
    } catch (error) {
      dispatch(sidnoutuserFailure(data.message))
      
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handelsubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setfile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formdata.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileerror ? (
            <span className="text-red-700">
              Error Image uploade (image must be less than 2 mb)
            </span>
          ) : fileperc > 0 && fileperc < 100 ? (
            <span className="text-slate-700">{`Uploading ${fileperc}%`}</span>
          ) : fileperc === 100 ? (
            <span className="text-green-700">Image Successfully Uploaded</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.username}
          onChange={handelchange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.email}
          onChange={handelchange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handelchange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handeldeleteuser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>
        <span onClick={handelsignout} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>
    </div>
  );
}
