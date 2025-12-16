import { Label } from "../ui/label"
import { Input } from "../ui/input"

function ImageInput() {
    const name = "image"
    return (
        <div>
            <Label htmlFor={name} className="capitalize">Image</Label>
            <Input id={name} name={name} type="file" accept="image/*" required />
        </div>
    )
}
export default ImageInput