import {fetchAdminProductById, updateProductAction, updateProductImageAction} from "@/utils/actions";
import FormContainer from "@/components/Form/FormContainer";
import FormInput from "@/components/Form/FormInput";
import PriceInput from "@/components/Form/PriceInput";
import TextAreaInput from "@/components/Form/TextAreaInput";
import {SubmitButton} from "@/components/Form/Buttons";
import CheckboxInput from "@/components/Form/CheckboxInput";
import {Input} from "@/components/ui/input";
import ImageInputContainer from "@/components/Form/ImageInputContainer";

async function EditItemPage({params}: { params: { id: string } }) {
    const {id: productID} = params;
    const product = await fetchAdminProductById(productID)
    const {name, company, description, featured, price, image} = product;
    return (
        <section>
            <h1 className={"text-2xl font-semibold mb-8 capitalize"}>update product</h1>
            <div className="border p-8 rounded">
                <ImageInputContainer image={image} name={name} text={"Update Image"} action={updateProductImageAction}>
                    <input type={"hidden"} name={"id"} value={productID}/>
                    <input type={"hidden"} name={"oldUrl"} value={image}/>
                </ImageInputContainer>
                <FormContainer action={updateProductAction}>
                    <div className={"grid gap-4 md:grid-cols-2 my-4"}>
                        <FormInput type="text" name="name" label="product name" defaultValue={name}/>
                        <FormInput type="text" name="company" defaultValue={company}/>
                        <Input name="id" className={"hidden"} value={productID}/>
                        <PriceInput defaultValue={price}/>
                    </div>
                    <TextAreaInput name="description" label="product description" defaultValue={description}/>
                    <div className={"mt-6"}>
                        <CheckboxInput name="featured" label="featured" defaultChecked={featured}/>
                    </div>
                    <SubmitButton text="Update Product" className={"mt-8"}/>
                </FormContainer>
            </div>
        </section>
    )
}

export default EditItemPage