import EmptyList from "@/components/Global/EmptyList";
import {fetchAdminProducts} from "@/utils/actions";
import Link from "next/link";

import {formatCurrency} from "@/utils/format";
import {TableBody, Table, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

async function AdminProductsPage() {
    const adminProducts = await fetchAdminProducts();
    if (!adminProducts) {
        return (
            <EmptyList/>
        )
    }
    return (
        <section>
            <Table>
                <TableCaption className="capitalize">
                    total products: {adminProducts.length}
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {adminProducts.map((product) => {
                        const {id: productID, name, company, price} = product;
                        return (
                            <TableRow key={productID}>
                                <TableCell>
                                    <Link href={`/products/${productID}`}
                                          className="underline text-muted-foreground tracking-wide capitalize">
                                        {name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {company}
                                </TableCell>
                                <TableCell>
                                    {formatCurrency(price)}
                                </TableCell>
                                <TableCell className="flex items-center gap-x-2">
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody></Table>

        </section>
    )
}

export default AdminProductsPage