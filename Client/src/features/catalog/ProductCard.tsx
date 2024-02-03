import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import { Product } from '../../app/models/product'
import { Link } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import agent from '../../app/api/agent'
import { useAppDispatch } from '../../app/store/store'
import { setBasket } from '../basket/basketSlice'

type ProductCardProps = {
    product: Product
}

export default function ProductCard({product}: ProductCardProps) {

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  function handleAddItem(productId: string) {
    setLoading(true);

    agent.requests
    .post(`basket?productId=${productId}&quantity=1`, {})
    .then(basket => dispatch(setBasket(basket)))
    .catch(error => console.error(error))
    .finally(() => setLoading(false));

  }

  return (
    <Card>

      <CardHeader avatar={
      <Avatar sx={{backgroundColor: "secondary.main"}}>
        {product.productName.charAt(0).toUpperCase()}
      </Avatar>} title={product.productName} titleTypographyProps={{sx: {fontWeight: "bold", color: "primary.main"}}}/>
        
      <CardMedia
        sx={{ height: 140, backgroundSize: "contain", backgroundColor: "grey.300"}}
        image={product.pictureUrl}
        title={product.productName}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" color="secondary">
          ${(product.productPrice / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {product.productBrand} / {product.productType}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={loading} onClick={() => handleAddItem(product.productId)} size="small">Add to cart</LoadingButton>
        <Button component={Link} to={`/catalog/${product.productId}`} size="small">View</Button>
      </CardActions>
    </Card>
  )
}
