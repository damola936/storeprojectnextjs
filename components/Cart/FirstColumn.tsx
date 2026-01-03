import Image from "next/image"
import Link from "next/link"

function FirstColumn({ name, image, company, productId }: { name: string, image: string, company: string, productId: string }) {
    return (
        <div className="md:col-span-4">
            <div className="flex items-center gap-4">
                <div className={"relative h-24 w-24 sm:h-32 sm:w-32"}>
                    <Image src={image} alt={name} layout="fill"
                        sizes={"(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"} priority
                        className="rounded-md w-full object-cover" />
                </div>
                <div className={"sm:w-48"}>
                    <Link href={`/products/${productId}`}>
                        <h3 className="capitalize font-medium hover:underline">{name}</h3>
                    </Link>
                    <h4 className="text-xs capitalize mt-2">{company}</h4>
                </div>
            </div>
        </div>

    );
}

export default FirstColumn;