import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';
import { handleAuthSuccessMessage } from '@/utils/toastMessage';
import { handleSignOut } from '@/config/auth';

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
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/NavigationMenu';
import { ChevronDown, ChevronUp, LogOut } from 'lucide-react';

type UserDropdownMenuProps = {
  avatarUsername: string;
};

function UserDropdownMenu({ avatarUsername }: UserDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { setLoading } = useToast();

  async function doSignOut() {
    setLoading(true);

    await handleSignOut();
    handleAuthSuccessMessage({ type: 'logout' });

    setLoading(false);
  }

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
              <button onClick={doSignOut}>Logout</button>
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
              <Link to="/login" className={navigationMenuTriggerStyle()}>
                Login
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default Navbar;
