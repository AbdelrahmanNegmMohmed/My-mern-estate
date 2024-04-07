import {BrowserRouter, Route, Routes}from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import About from "./pages/About"
import Header from "./Components/Header"
import PrivetRoute from "./Components/PrivetRoute"
import CreateListing from "./pages/Create.Listing"

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route element={<PrivetRoute/>}>
      <Route path="/profile" element={<Profile/>}/>
      <Route path='/create-listing' element={<CreateListing />} />

      </Route>
      <Route path="/about" element={<About/>}/>
    </Routes>
    </BrowserRouter>
 
  )
}
