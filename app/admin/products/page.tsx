import EmptyList from "@/components/Global/EmptyList";
import {deleteProductAction, fetchAdminProducts} from "@/utils/actions";
import Link from "next/link";

import {formatCurrency} from "@/utils/format";
import {TableBody, Table, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import FormContainer from "@/components/Form/FormContainer";
import {IconButton} from "@/components/Form/Buttons";

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
                                    <Link href={`/admin/products/${productID}/edit`}>
                                        <IconButton actionType={"edit"}/>
                                    </Link>
                                    <DeleteProduct productID={productID}/>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody></Table>

        </section>
    )
}

function DeleteProduct({productID}: { productID: string }) {
    const deleteProduct = deleteProductAction.bind(null, {productID})
    return (
        <FormContainer action={deleteProduct}>
            <IconButton actionType={"delete"}/>
        </FormContainer>
    )
}

export default AdminProductsPage