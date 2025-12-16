'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SignInButton } from '@clerk/nextjs';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { LuTrash2, LuPencil } from 'react-icons/lu';

type btnSize = 'default' | 'lg' | 'sm';

interface SubmitButtonProps {
    className?: string;
    text?: string;
    size?: btnSize;
}

function FormSubmitButton({ className = "", text = "submit", size = "lg" }: SubmitButtonProps) {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending} className={cn("capitalize", className)}>
            {pending ? <><ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> Please wait...</> : text}
        </Button>
    )
}

export default FormSubmitButton