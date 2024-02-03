import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { addItemToBasketAsync, removeItemFromBasketAsync } from "./basketSlice";

export default function BasketPage() {

    // const [loadingStatus, setLoadingStatus] = useState({loading: false, name: ""});
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    if (!basket) return <Typography variant="h4">Basket is empty!</Typography>

    return (
    <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price ($)</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Subtotal ($)</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {basket?.basketItems.map(item => (
                    <TableRow
                    key={item.productId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        <Box display="flex" alignItems="center">
                            <img src={item.pictureUrl} style={{height: 50, marginRight: 20}}></img>
                            <span>{item.productName}</span>
                        </Box>
                    </TableCell>
                    <TableCell align="right">{(item.productPrice/100).toFixed(2)}</TableCell>
                    <TableCell align="center">
                        <LoadingButton loading={status.includes("pendingRemove" + item.productId)} size="small" 
                            onClick={() => dispatch(removeItemFromBasketAsync({productId: item.productId, quantity: 1}))}>
                            <Remove/>
                        </LoadingButton>
                        {item.quantity}
                        <LoadingButton loading={status.includes("pendingAdd" + item.productId)} size="small" 
                            onClick={() => dispatch(addItemToBasketAsync({productId: item.productId, quantity: 1}))}>
                            <Add/>
                        </LoadingButton>
                    </TableCell>
                    <TableCell align="right">{((item.productPrice/100) * item.quantity).toFixed(2)}</TableCell>
                    <TableCell align="right">
                        <LoadingButton loading={status.includes("pendingRemove" + item.productId)} 
                            onClick={() => dispatch(removeItemFromBasketAsync({productId: item.productId, quantity: item.quantity}))}>
                            <Delete color="error"/>
                        </LoadingButton>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Grid container>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}><BasketSummary basketItems={basket.basketItems}/></Grid>
        </Grid>
    </>)
}
