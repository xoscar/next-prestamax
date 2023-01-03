import { ReactNode } from 'react';
import { PanelContainer } from './TabPanel.styled';

interface IProps {
  children: ReactNode;
  selectedTab: number;
  tabIndex: number;
}

const TabPanel = ({ children, selectedTab, tabIndex }: IProps) => {
  const isDisplayed = selectedTab === tabIndex;

  return (
    <PanelContainer
      role="tabpanel"
      hidden={!isDisplayed}
      id={`tabpanel-${tabIndex}`}
      aria-labelledby={`tabpanel-${tabIndex}`}
    >
      {isDisplayed && children}
    </PanelContainer>
  );
};

export default TabPanel;
