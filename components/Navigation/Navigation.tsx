import { AppBar } from '@mui/material';
import { useCallback, useState } from 'react';
import {
  AppTitle,
  MenuLink,
  NavToolBar,
  OptionLink,
  OptionItem,
  OptionList,
  OptionText,
} from './Navigation.styled';
import MobileNavigation from '../MobileNavigation';
import UserDropdown from '../UserDropdown/UserDropdown';

const Navigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleOnClose = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return (
    <>
      <MobileNavigation isOpen={isDrawerOpen} onClose={handleOnClose} />
      <AppBar position="static">
        <NavToolBar>
          <MenuLink onClick={() => setIsDrawerOpen((isOpen) => !isOpen)} />
          <OptionLink href="/">
            <AppTitle>PrestaMax</AppTitle>
          </OptionLink>
          <OptionList>
            <OptionItem>
              <OptionLink href="/">
                <OptionText>Clientes</OptionText>
              </OptionLink>
            </OptionItem>
            <OptionItem>
              <OptionLink href="/loans">
                <OptionText>Prestamos</OptionText>
              </OptionLink>
            </OptionItem>
            <OptionItem>
              <UserDropdown isDesktop />
            </OptionItem>
          </OptionList>
        </NavToolBar>
      </AppBar>
    </>
  );
};

export default Navigation;
