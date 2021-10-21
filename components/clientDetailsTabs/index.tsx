import { FunctionComponent, SyntheticEvent, useCallback, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import TabPanel from '../tabPanel';
import { CardContainer } from './clientDetailsTabsStyled';

const getA11yProps = (index: number) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
});

const ClientDetailsTabs: FunctionComponent = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleChange = useCallback((event: SyntheticEvent, newValue: number) => {
    setSelectedIndex(newValue);
  }, []);

  return (
    <>
      <Box>
        <Tabs value={selectedIndex} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Prestamos" {...getA11yProps(0)} />
          <Tab label="Cargos" {...getA11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel selectedTab={selectedIndex} tabIndex={0}>
        <CardContainer>Prestamos</CardContainer>
      </TabPanel>
      <TabPanel selectedTab={selectedIndex} tabIndex={1}>
        Cargos
      </TabPanel>
    </>
  );
};

export default ClientDetailsTabs;
