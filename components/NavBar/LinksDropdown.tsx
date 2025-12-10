import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { LuAlignLeft } from 'react-icons/lu';
import Link from 'next/link';
import { Button } from '../ui/button';
import { links } from '@/utils/links';
import UserIcon from './UserIcon';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import SignOutLink from './SignOutLink';

function LinksDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className='flex gap-4 max-w-[100px]'>
                    <LuAlignLeft className='w-6 h-6' />
                    <UserIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-40' align='start' sideOffset={10}>
                <SignedOut>
                    <DropdownMenuItem>
                        <SignInButton mode="modal">
                            <button className='w-full text-left'>Log In</button>
                        </SignInButton>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <SignUpButton mode="modal">
                            <button className='w-full text-left'>Register</button>
                        </SignUpButton>
                    </DropdownMenuItem>
                </SignedOut>
                <SignedIn>
                    {links.map((link) => (
                        <DropdownMenuItem key={link.href}>
                            <Link className='capitalize w-full' href={link.href}>{link.label}</Link>
                        </DropdownMenuItem>
                    ))}</SignedIn>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <SignOutLink />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default LinksDropdown