import FormInput from "@/components/Form/FormInput"
import PriceInput from "@/components/Form/PriceInput"
import { faker } from "@faker-js/faker"
import TextAreaInput from "@/components/Form/TextAreaInput"
import FormContainer from "@/components/Form/FormContainer"
import { createProductAction } from "@/utils/actions"
import ImageInput from "@/components/Form/ImageInput"
import CheckboxInput from "@/components/Form/CheckboxInput"
import FormSubmitButton from "@/components/Form/FormSubmitButton"


function CreateProductPage() {
    const name = faker.commerce.productName()
    const price = parseInt(faker.commerce.price())
    const company = faker.company.name()
    const description = faker.lorem.sentence({ min: 30, max: 80 })
    return (
        <section>
            <h1 className="text-2xl font-semibold mb-8 capitalize">Create Product</h1>
            <div className="border p-8 rounded-md">
                <FormContainer action={createProductAction}>
                    <div className="grid gap-4 md:grid-cols-2 my-4">
                        <FormInput type="text" name="name" label="product name" defaultValue={name} />
                        <FormInput type="text" name="company" label="company" defaultValue={company} />
                        <PriceInput defaultValue={price} />
                        <ImageInput />
                    </div>
                    <TextAreaInput name="description" label="description" defaultValue={description} />
                    <div className="mt-6">
                        <CheckboxInput name="featured" label="featured" />
                    </div>
                    <FormSubmitButton text="Create Product" className="mt-8" />
                </FormContainer>
            </div>
        </section>
    )
}
export default CreateProductPage