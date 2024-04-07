import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from 'react';
import { app } from "../Firebase";

export default function CreateListing() {
  const [files, setfiles] = useState([]);
  const [formdata, setformdata] = useState({ imgeUrls: [] });
  const [imageuploadeerror, setimageuploadeerror] = useState(false);
  const [uploading, setUploading] = useState(false);
  console.log(formdata);

  const handelimagesubmit = (e) => {
    if (files.length > 0 && files.length + formdata.imgeUrls.length < 7) {
      setUploading(true);
      setimageuploadeerror(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setformdata({
            ...formdata,
            imgeUrls: formdata.imgeUrls.concat(urls),
          });
          setimageuploadeerror(false);
          setUploading(false);
        })
        .catch((err) => {
          setimageuploadeerror("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setimageuploadeerror("You can only upload 6 images per listing");
      setUploading(false);
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storge = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storgeRef = ref(storge, filename);
      const uploadetask = uploadBytesResumable(storgeRef, file);
      uploadetask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadetask.snapshot.ref).then((dowenloadeurl) => {
            resolve(dowenloadeurl);
          });
        }
      );
    });
  };
  const handleRemoveImage = (index) => {
    setformdata({
      ...formdata,
      imgeUrls: formdata.imgeUrls.filter((_, i) => i !== index),
    });
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Discounted price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setfiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handelimagesubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageuploadeerror && imageuploadeerror}
          </p>
          {formdata.imgeUrls.length > 0 &&
            formdata.imgeUrls.map((url,index) => {
            return(
              <div
              key={url}
              className='flex justify-between p-3 border items-center'
            >
              <img
                src={url}
                alt='listing image'
                className='w-20 h-20 object-contain rounded-lg'
              />
              <button
                type='button'
                className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                onClick={() => handleRemoveImage(index)}

              >
                Delete
              </button>
            </div>
            )
            })}
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
