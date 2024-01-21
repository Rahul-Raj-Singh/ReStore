import { Product } from '../../app/models/Product'
import { Grid } from '@mui/material'
import ProductCard from './ProductCard'

type ProductListProps = {
    productList: Product[]
}

export default function ProductList({productList}: ProductListProps) {
  return (
    <Grid container spacing={4}>
        {productList.map(p => (
        <Grid item xs={3} key={p.productId}>
            <ProductCard product={p}/>
        </Grid> ))}
    </Grid>
  )
}
