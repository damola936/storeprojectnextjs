"use client"

import React from 'react';
import {useState} from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import FormContainer from "@/components/Form/FormContainer";
import ImageInput from "@/components/Form/ImageInput";
import {SubmitButton} from "@/components/Form/Buttons";
import {type actionFunction} from "@/utils/types";

interface ImageInputContainerProps {
    image: string;
    name: string;
    text: string;
    action: actionFunction;
    children?: React.ReactNode;
}

function ImageInputContainer(props: ImageInputContainerProps) {
    const {image, name, text, action} = props;
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
    return (
        <div className={"mb-8"}>
            <Image src={image} width={200} height={200} alt={name}
                   className={"rounded object-cover mb-4 w-[200px] h-[200px]"} priority/>
            <Button variant={"outline"} size={"sm"} onClick={() => setIsUpdateFormVisible((prev) => !prev)}>
                {text}
            </Button>
            {isUpdateFormVisible && (
                <div className={"max-w-md mt-4"}>
                    <FormContainer action={action}>
                        {props.children}
                    <ImageInput/>
                    <SubmitButton size={"sm"} text={text} className={"mt-2"}/>
                </FormContainer></div>

            )}
        </div>
    );
}

export default ImageInputContainer;