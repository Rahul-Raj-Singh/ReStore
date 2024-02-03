import { useState } from "react"
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import BasketSummary from "./BasketSummary";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { removeItem, setBasket } from "./basketSlice";

export default function BasketPage() {

    const [loadingStatus, setLoadingStatus] = useState({loading: false, name: ""});
    const {basket} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    function handleRemoveItem(productId: string, quantity: number, name: string) {
        setLoadingStatus({loading: true, name});

        agent.requests
        .delete(`basket?productId=${productId}&quantity=${quantity}`)
        .then(() => dispatch(removeItem({productId, quantity})))
        .catch(error => console.error(error))
        .finally(() => setLoadingStatus({loading: false, name: ""}))
    }
    
    function handleAddItem(productId: string, quantity: number, name: string) {
        setLoadingStatus({loading: true, name});

        agent.requests
        .post(`basket?productId=${productId}&quantity=${quantity}`, {})
        .then((basket) => dispatch(setBasket(basket)))
        .catch(error => console.error(error))
        .finally(() => setLoadingStatus({loading: false, name: ""}))
    }

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
                        <LoadingButton loading={loadingStatus.loading && loadingStatus.name === "rem" + item.productId} size="small" 
                            onClick={() => handleRemoveItem(item.productId, 1, "rem" + item.productId)}>
                            <Remove/>
                        </LoadingButton>
                        {item.quantity}
                        <LoadingButton loading={loadingStatus.loading && loadingStatus.name === "add" + item.productId} size="small" 
                            onClick={() => handleAddItem(item.productId, 1, "add" + item.productId)}>
                            <Add/>
                        </LoadingButton>
                    </TableCell>
                    <TableCell align="right">{((item.productPrice/100) * item.quantity).toFixed(2)}</TableCell>
                    <TableCell align="right">
                        <LoadingButton loading={loadingStatus.loading && loadingStatus.name === "delete" + item.productId} 
                            onClick={() => handleRemoveItem(item.productId, item.quantity, "delete" + item.productId)}>
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
