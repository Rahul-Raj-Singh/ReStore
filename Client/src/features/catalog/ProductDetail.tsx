import { Divider, Grid, Table, TableCell, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Product } from '../../app/models/Product';

export default function ProductDetail() {

  const {productId} = useParams<{productId: string}>();

  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);

  console.log(productId)

  useEffect(() => {
    axios.get(`https://localhost:5000/api/product/${productId}`)
    .then(res => setProduct(res.data))
    .catch(err => console.error(err))
    .finally(() => setLoading(false))

  }, [productId])

  if (loading) return <Typography variant='h3'>Loading...</Typography>

  if (!product) return <Typography variant='h3'>Product does not exist!</Typography>

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.productName} style={{width: "100%"}}/>
      </Grid>
      <Grid item xs={6} alignSelf="center">
        <Typography variant='h3' gutterBottom>{product.productName}</Typography>

        <Table>
          <TableRow>
            <TableCell>Price </TableCell>
            <TableCell>${(product.productPrice / 100).toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Description </TableCell>
            <TableCell>{product.productDescription}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Type </TableCell>
            <TableCell>{product.productType}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Brand </TableCell>
            <TableCell>{product.productBrand}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Quantity in stock </TableCell>
            <TableCell>{product.quantityInStock}</TableCell>
          </TableRow>
        </Table>
      </Grid>
    </Grid>
  )
}
