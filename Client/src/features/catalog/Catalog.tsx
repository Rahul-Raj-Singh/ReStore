import { useEffect, useState } from 'react';
import { Product } from '../../app/models/product'
import ProductList from './ProductList'
import agent from '../../app/api/agent';
import Loading from '../../app/layout/Loading';


export default function Catalog() {

  const [productList, setProductList] =  useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.requests.get("product")
    .then(res => setProductList(res))
    .catch(err => console.error(err))
    .finally(() => setLoading(false))
  }, [loading]);

  if (loading) return <Loading/>
  
  return (
    <ProductList productList={productList}/>
  )
}
