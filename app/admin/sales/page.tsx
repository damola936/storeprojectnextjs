import { fetchAdminOrders } from "@/utils/actions"
import SectionTitle from "@/components/Global/SectionTitle"
import { Order } from "@prisma/client"
import { formatCurrency, formatDate } from "@/utils/format"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

async function SalesPage() {
    const orders = await fetchAdminOrders()
    return (
        <div>
            <SectionTitle title="Current Orders"/>
            <Table>
                <TableCaption>Total Orders : {orders.length}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead>Order Total</TableHead>
                        <TableHead>Tax</TableHead>
                        <TableHead>Shipping</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order:Order) => {
                        const {id, products, orderTotal, tax, shipping, createdAt, email} = order
                        return <TableRow key={id}>
                            <TableCell>{email}</TableCell>
                            <TableCell>{products}</TableCell>
                            <TableCell>{formatCurrency(orderTotal)}</TableCell>
                            <TableCell>{formatCurrency(tax)}</TableCell>
                            <TableCell>{formatCurrency(shipping)}</TableCell>
                            <TableCell>{formatDate(createdAt)}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </div>
    )
}
export default SalesPage