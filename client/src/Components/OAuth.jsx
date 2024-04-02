import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../Firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../Redux/user/userslise";
import { useNavigate} from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navegate = useNavigate()
  const handelgoogleclick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navegate('/')

    } catch (error) {
      console.log("could not asign in with google", error);
    }
  };
  return (
    <button
      onClick={handelgoogleclick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg"
    >
      Continue With Google
    </button>
  );
}
