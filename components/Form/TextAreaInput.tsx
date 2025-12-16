import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface TextAreaInputProps {
    label?: string
    name: string
    defaultValue?: string
    placeholder?: string
}

function TextAreaInput({ label, name, defaultValue, placeholder }: TextAreaInputProps) {
    return (
        <div className="mb-2">
            <Label htmlFor={name} className="capitalize">{label || name}</Label>
            <Textarea id={name} name={name} defaultValue={defaultValue} placeholder={placeholder || "Enter description"} rows={5} required />
        </div>
    )
}
export default TextAreaInput