import { AppBar } from '@mui/material';
import { FunctionComponent, useCallback, useState } from 'react';
import {
  AppTitle,
  MenuLink,
  NavToolBar,
  OptionLink,
  OptionItem,
  OptionList,
  OptionText,
} from './navigationStyled';
import MobileNavigation from '../mobileNavigation';
import UserDropdown from '../userDropdown';

const Navigation: FunctionComponent = () => {
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
          <AppTitle>PrestaMax</AppTitle>
          <OptionList>
            <OptionItem>
              <OptionLink href="/home">
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
