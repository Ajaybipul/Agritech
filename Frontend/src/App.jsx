import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './User/Navbar'
import Uservices from './User/Uservices.jsx'
import AddCrop from './User/CropManagement/AddCrop.jsx'
import GetCrops from './User/CropManagement/GetCrops'
import UpdateCrop from './User/CropManagement/UpdateCrop.jsx'
import Ulogin from './User/Ulogin.jsx'
import Usignup from './User/Usignup.jsx'
import AddFarm from './User/FarmManagement/AddFarm.jsx'
import GetFarms from './User/FarmManagement/GetFarms.jsx'
import UpdateFarm from './User/FarmManagement/UpdateFarm.jsx'
import Weather from './User/Weather.jsx'
import CropsDetails from './User/Cropsdetails.jsx'
import Uhome from './User/Uhome.jsx'
import ViewCropData from './User/ViewCropData.jsx'
import Uproducts from './User/Uproducts.jsx'
import AddProduct from './Admin/AddProduct.jsx'
import GetProducts from './Admin/GetProducts.jsx'
import BuyProduct from './User/BuyProduct.jsx'
import Mybookings from './User/MyBookings.jsx'
import Alogin from './Admin/Alogin.jsx'
import Asignup from './Admin/Asignup.jsx'
import Home from './Components/Home.jsx'
import Ahome from './Admin/Ahome.jsx'
import Users from './Admin/Users.jsx'
import UserEdit from './Admin/UserEdit.jsx'
import EditProduct from './Admin/EditProduct.jsx'


function App() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />


                    {/* Admin */}
                    <Route path='/alogin' element={<Alogin />} />
                    <Route path='/asignup' element={<Asignup />} />
                    <Route path='/ahome' element={<Ahome />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/useredit/:id' element={<UserEdit />} />
                    <Route path='/addproduct' element={<AddProduct />} />
                    <Route path='/getproducts' element={<GetProducts />} />
                    <Route path='/editproduct/:id' element={<EditProduct />} />


                    {/* User Routes */}
                    <Route path='/unav' element={<Uservices />} />
                    <Route path='/uhome' element={<Uhome />} />
                    <Route path='/crop/:name' element={<ViewCropData />} />
                    <Route path='/uproducts' element={<Uproducts />} />
                    <Route path='/buyproduct/:id' element={<BuyProduct />} />
                    <Route path='/mybookings' element={<Mybookings />} />
                    <Route path='/ulogin' element={<Ulogin />} />
                    <Route path='/usignup' element={<Usignup />} />

                    {/* Farm Routes */}
                    <Route path='/addfarm' element={<AddFarm />} />
                    <Route path='/getfarms' element={<GetFarms />} />
                    <Route path='/updatefarm/:id' element={<UpdateFarm />} />

                    {/*Crops Routes */}
                    <Route path='/addcrop' element={<AddCrop />} />
                    <Route path='/getcrops' element={<GetCrops />} />
                    <Route path='/updatecrop/:id' element={<UpdateCrop />} />

                </Routes>
            </BrowserRouter>
        </div>

    )
}

export default App
