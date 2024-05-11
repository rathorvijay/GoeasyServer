import "./App.css";
import {Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar"
import OpenRoute from "./components/core/Auth/OpenRoute"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error"
import Settings from "./components/core/Dashboard/Settings";
import { useDispatch, useSelector } from "react-redux";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse";
import AddOffer from "./components/core/Dashboard/AddOffer/AddOffer";
import AddCategory from "./components/core/Dashboard/AddCourse/AddCategory";
import MyCourses from "./components/core/Dashboard/MyCourses";
import MyOffer from "./components/core/Dashboard/MyOffers";
import MyCategories from "./components/core/Dashboard/MyCategories";
import EditCourse from "./components/core/Dashboard/EditCourse";
import EditOffer from "./components/core/Dashboard/EditOffer";
import EditCategory from "./components/core/Dashboard/EditCategory";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.profile)


  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="catalog/:catalogName" element={<Catalog/>} />
      <Route path="services/:serviceId" element={<CourseDetails/>} />
      
      <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

    <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />  

      <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  

    <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />  

    <Route
          path="/about"
          element={
            
              <About />
            
          }
        />
    <Route path="/contact" element={<Contact />} />

    <Route 
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    >
      <Route path="dashboard/my-profile" element={<MyProfile />} />
      
      <Route path="dashboard/Settings" element={<Settings />} />
      

      {
        user?.accountType === ACCOUNT_TYPE.CUSTOMER && (
          <>
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-services" element={<EnrolledCourses />} />
          </>
        )
      }

      {
        user?.accountType === ACCOUNT_TYPE.ADMIN && (
          <>
          <Route path="dashboard/admin" element={<Instructor />} />
          <Route path="dashboard/add-service" element={<AddCourse />} />
          <Route path="dashboard/my-services" element={<MyCourses />} />
          <Route path="dashboard/edit-service/:serviceId" element={<EditCourse />} />
          <Route path="dashboard/add-offer" element={<AddOffer />} />
          <Route path="dashboard/my-offers" element={<MyOffer />} />
          <Route path="dashboard/edit-offer/:offerId" element={<EditOffer />} />
          <Route path="dashboard/add-category" element={<AddCategory />} />
          <Route path="dashboard/my-categories" element={<MyCategories/>} />
          <Route path="dashboard/edit-category/:categoryId" element={<EditCategory />} />
          </>
        )
      }


    </Route>

    
      <Route element={
        <PrivateRoute>
          <ViewCourse />
        </PrivateRoute>
      }>

      {
        user?.accountType === ACCOUNT_TYPE.CUSTOMER && (
          <>
          <Route 
            path="view-service/:serviceId"
            element={<VideoDetails />}
          />
          </>
        )
      }

      </Route>



    <Route path="*" element={<Error />} />


    </Routes>

   </div>
  );
}

export default App;
