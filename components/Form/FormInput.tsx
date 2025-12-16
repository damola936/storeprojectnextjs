import { Label } from "../ui/label"
import { Input } from "../ui/input"

interface FormInputProps {
    label?: string
    name: string
    type: string
    defaultValue?: string
    placeholder?: string
}

function FormInput({ label, name, type, defaultValue, placeholder }: FormInputProps) {
    return (
        <div className="mb-2">
            <Label htmlFor={name} className="capitalize">{label || name}</Label>
            <Input id={name} name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} required />
        </div>
    )
}
export default FormInput