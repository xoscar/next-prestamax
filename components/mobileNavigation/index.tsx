import { ListItem, Divider } from '@mui/material';
import { FunctionComponent } from 'react';
import UserDropdown from '../userDropdown';
import {
  OptionLink,
  MobileDrawer,
  OptionText,
  NavHeading,
  NavHeadingItem,
  OptionsContainer,
} from './mobileNavigationStyled';

export type MobileNavigationProps = {
  isOpen: boolean;
  onClose(): void;
};

const MobileNavigation: FunctionComponent<MobileNavigationProps> = ({ isOpen, onClose }) => {
  return (
    <MobileDrawer open={isOpen} onClose={onClose}>
      <OptionsContainer>
        <NavHeadingItem>
          <OptionLink href="/home">
            <NavHeading>PrestaMax</NavHeading>
          </OptionLink>
        </NavHeadingItem>
        <ListItem>
          <OptionLink href="/home">
            <OptionText>Clientes</OptionText>
          </OptionLink>
        </ListItem>
        <ListItem>
          <OptionLink href="/loans">
            <OptionText>Loans</OptionText>
          </OptionLink>
        </ListItem>
        <Divider />
        <ListItem>
          <UserDropdown />
        </ListItem>
      </OptionsContainer>
    </MobileDrawer>
  );
};

export default MobileNavigation;
