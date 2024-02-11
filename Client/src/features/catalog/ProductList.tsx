import { Product } from '../../app/models/product'
import { Grid } from '@mui/material'
import ProductCard from './ProductCard'

type ProductListProps = {
    productList: Product[]
}

export default function ProductList({productList}: ProductListProps) {
  return (
    <Grid container spacing={4}>
        {productList.map(p => (
        <Grid item xs={4} key={p.productId}>
            <ProductCard product={p}/>
        </Grid> ))}
    </Grid>
  )
}
