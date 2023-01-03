import { ListItem, Divider } from '@mui/material';
import UserDropdown from '../UserDropdown/UserDropdown';
import {
  OptionLink,
  MobileDrawer,
  OptionText,
  NavHeading,
  NavHeadingItem,
  OptionsContainer,
} from './MobileNavigation.styled';

export interface IProps {
  isOpen: boolean;
  onClose(): void;
}

const MobileNavigation = ({ isOpen, onClose }: IProps) => {
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
            <OptionText>Prestamos</OptionText>
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
