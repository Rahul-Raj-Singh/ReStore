import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import { Product } from '../../app/models/Product'
import { Link } from 'react-router-dom'

type ProductCardProps = {
    product: Product
}

export default function ProductCard({product}: ProductCardProps) {
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
        <Button size="small">Add to cart</Button>
        <Button component={Link} to={`/catalog/${product.productId}`} size="small">View</Button>
      </CardActions>
    </Card>
  )
}
