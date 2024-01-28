import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { BasketItem } from "../../app/models/basketItem";
import { getDecimalNumber } from "../../app/utils/util";

type BasketSummaryProps = {
    basketItems: BasketItem[]
};

export default function BasketSummary({basketItems}: BasketSummaryProps) {
    const subtotal = basketItems.reduce((sum, item) => sum + getDecimalNumber(item.productPrice) * item.quantity, 0);
    const deliveryFee = subtotal >= 100 ? 0 : 5;

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">${subtotal}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">${deliveryFee}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">${subtotal + deliveryFee}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3}>
                                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}