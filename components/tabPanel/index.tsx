import { FunctionComponent, ReactNode } from 'react';
import { PanelContainer } from './tabPanelStyled';

export type TabPanelProps = {
  children: ReactNode;
  selectedTab: number;
  tabIndex: number;
};

const TabPanel: FunctionComponent<TabPanelProps> = ({ children, selectedTab, tabIndex }) => {
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
