import { useEffect, useState } from 'react';
import { Product } from '../../app/models/Product'
import ProductList from './ProductList'
import axios from 'axios';


export default function Catalog() {

  const [productList, setProductList] =  useState<Product[]>([]);

  useEffect(() => {
    axios.get("https://localhost:5000/api/product")
    .then(res => setProductList(res.data))
    .catch(err => console.error(err))
  }, []);
  
  return (
    <ProductList productList={productList}/>
  )
}
