import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/DropdownMenu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/NavigationMenu';
import { useAuth } from '@/contexts/authContext';
import { handleSignOut } from '@/config/auth';
import { ChevronDown, ChevronUp, LogOut } from 'lucide-react';

type UserDropdownMenuProps = {
  avatarUsername: string;
};

function UserDropdownMenu({ avatarUsername }: UserDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-row gap-1">
      <Avatar>
        <AvatarImage />
        <AvatarFallback>{avatarUsername}</AvatarFallback>
      </Avatar>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>Profile</DropdownMenuItem>
          <DropdownMenuItem disabled>Setting</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex flex-row gap-2">
            <LogOut />
            <Link to="/">
              <button onClick={() => handleSignOut()}>Logout</button>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function Navbar() {
  const { currentUser } = useAuth();

  const avatarUsername: string =
    currentUser && currentUser.email ? currentUser.email.charAt(0) : '';

  return (
    <div className="w-full px-4 py-2 flex flex-row justify-between items-center shadow-xl shadow-indigo-50">
      <Link to="/">
        <h2 className="font-thin text-indigo-600">LOGO</h2>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {currentUser ? (
            <NavigationMenuItem className="flex flex-row">
              <UserDropdownMenu avatarUsername={avatarUsername} />
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem>
              <Link to="/login">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Login
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default Navbar;
