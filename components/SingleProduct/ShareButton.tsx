"use client"

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Button} from "@/components/ui/button";
import {LuShare} from "react-icons/lu";

import {
    TwitterShareButton,
    EmailShareButton,
    LinkedinShareButton,
    TwitterIcon,
    EmailIcon,
    LinkedinIcon,
} from "react-share"

function ShareButton({productID, name}: {productID: string, name: string}) {
    const url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const shareUrl = `${url}/products/${productID}`
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} size={"icon"} className={"p-2"}>
                    <LuShare/>
                </Button>
            </PopoverTrigger>
            <PopoverContent side={"top"} align={"end"} sideOffset={10} className={"flex items-center gap-x-2 justify-center w-full"}>
                <TwitterShareButton url={shareUrl} title={name}>
                    <TwitterIcon size={32} round={true}/>
                </TwitterShareButton>
                <LinkedinShareButton url={shareUrl} title={name}>
                    <LinkedinIcon size={32} round={true}/>
                </LinkedinShareButton>
                <EmailShareButton url={shareUrl} subject={name}>
                    <EmailIcon size={32} round={true}/>
                </EmailShareButton>
            </PopoverContent>
        </Popover>
    )
}

export default ShareButton