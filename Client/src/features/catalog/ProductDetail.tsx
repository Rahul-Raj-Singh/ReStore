import { Button, Grid, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Product } from '../../app/models/product';
import agent from '../../app/api/agent';
import Loading from '../../app/layout/Loading';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import { addItemToBasketAsync, removeItemFromBasketAsync } from '../basket/basketSlice';

export default function ProductDetail() {

  const {productId} = useParams<{productId: string}>();

  const {basket, status} = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(0);

  const existingItem = basket?.basketItems.find(x => x.productId == productId);

  useEffect(() => {
    agent.requests.get(`product/${productId}`)
    .then(res => setProduct(res))
    .catch(err => console.error(err))
    .finally(() => setLoading(false))
  }, [productId])

  useEffect(() => {
    if (existingItem) 
      setQuantity(existingItem.quantity);
    else
      setQuantity(1)
  }, [existingItem])

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (+event.target.value < 0) return;
    setQuantity(+event.target.value);
  }

  function handleQuantityUpdate() {
    if (existingItem && quantity < existingItem.quantity) // remove item from basket
    {
      dispatch(removeItemFromBasketAsync({productId: productId!, quantity: existingItem.quantity - quantity}))
    }
    else // add item to basket
    {
      dispatch(addItemToBasketAsync({productId: productId!, quantity: quantity - (existingItem?.quantity ?? 0)}))
    }
  }

  if (loading || (status.includes("pendingAdd"))) return <Loading/>

  if (!product) return <Typography variant='h3'>Product does not exist!</Typography>

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.productName} style={{width: "100%"}}/>
      </Grid>
      <Grid item xs={6} alignSelf="center">
        <Typography variant='h3' gutterBottom>{product.productName}</Typography>

        <Table>
          <TableBody>
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
          </TableBody>
        </Table>
        <Grid container marginTop={2} spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Quantity in cart"
              type="number"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" fullWidth 
              disabled={existingItem?.quantity == quantity || (!existingItem && quantity === 0)} sx={{height: 55}} 
              onClick={handleQuantityUpdate}>{
              existingItem ? "Update cart" : "Add to cart"
            }</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
