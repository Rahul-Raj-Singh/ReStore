import { useEffect } from 'react';
import ProductList from './ProductList'
import Loading from '../../app/layout/Loading';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import { fetchProductsAsync, productSelectors } from './catalogSlice';


export default function Catalog() {

  const productList = useAppSelector(productSelectors.selectAll)
  const {status, productsCached} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsCached) dispatch(fetchProductsAsync())
  }, [dispatch, productsCached]);

  if (status.includes("pending")) return <Loading/>
  
  return (
    <ProductList productList={productList}/>
  )
}
