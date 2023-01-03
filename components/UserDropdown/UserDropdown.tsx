import { FunctionComponent, MouseEvent, useCallback, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { UserLink } from './UserDropdown.styled';
import { useUser } from '../../providers/User/User.provider';

export type UserDropdownProps = {
  isDesktop?: boolean;
};

const UserDropdown: FunctionComponent<UserDropdownProps> = ({ isDesktop }) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const { user, onLogout } = useUser();
  const isOpen = !!anchorEl;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnLogOut = useCallback(() => {
    setAnchorEl(null);
    onLogout();
  }, []);

  return (
    <>
      <UserLink
        isDesktop={isDesktop}
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleClick}
      >
        {user.username}
      </UserLink>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleOnLogOut}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserDropdown;
