import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Anavbar from './Anavbar';

const GetProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:7000/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const deleteProduct =(id)=>{
    axios.delete(`http://localhost:7000/deleteproduct/${id}`)
    .then(()=>{
      alert("Deleted Sucessfully")
      window.location.assign('/getproducts')
    })
    .catch(()=>{
      console.log("Error in Deleteing")
    })
  }

  return (
    <div>
      <Anavbar />
      <div className="container mx-auto p-4 bg-[url('/back.jpg')] bg-cover bg-center bg-no-repeat relative">
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <h1 className="text-3xl font-bold mb-4 text-center text-white relative z-10">Products List</h1>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="bg-green-100 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className='flex justify-end p-2 text-red-600'>
              <Link to={`/editproduct/${product._id}`} className='px-4 text-blue-700'><FaEdit/></Link>
              <button onClick={()=>deleteProduct(product._id)}><FaTrash/></button>
              </div>
              <div className="w-full h-60 rounded-t-lg overflow-hidden flex items-center justify-center">
                <img src={product.imgUrl} alt={product.name} className="max-h-full w-full border-none" />
              </div>
              <div className="mt-2">
                <h2 className="text-2xl font-semibold text-center">{product.name}</h2>
              </div>
              <div className="p-4">
                <p className="text-black mb-2">
                  Category: <span className='font-bold'>{product.category}</span>
                </p>
                <p className="text-black mb-2">
                  Price: <span className='font-bold'>₹{product.price}</span>
                </p>
                <p className="text-black mb-4">
                  Description: <span className='font-bold'>{product.description}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetProducts;
