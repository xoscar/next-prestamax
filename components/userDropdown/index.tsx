import { FunctionComponent, MouseEvent, useCallback, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../selectors/userSelectors';
import { UserLink } from './userDropdownStyled';
import { logoutUser } from '../../reducers/UserReducer';

export type UserDropdownProps = {
  isDesktop?: boolean;
};

const UserDropdown: FunctionComponent<UserDropdownProps> = ({ isDesktop }) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const isOpen = !!anchorEl;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnLogOut = useCallback(() => {
    setAnchorEl(null);
    dispatch(logoutUser());
  }, [dispatch]);

  return (
    <>
      <UserLink
        isDesktop={isDesktop}
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleClick}
      >
        {user?.username}
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
