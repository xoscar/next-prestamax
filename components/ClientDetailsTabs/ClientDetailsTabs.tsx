import { SyntheticEvent, useCallback, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import TabPanel from '../TabPanel';
import { TabsContainer } from './ClientDetailsTabs.styled';
import Client from '../../models/Client.model';
import Loans from './Tabs/Loans';
import LoanProvider from '../../providers/Loan';
import Charges from './Tabs/Charges';
import ChargeProvider from '../../providers/Charge';

interface IProps {
  client: Client;
}

const getA11yProps = (index: number) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
});

const ClientDetailsTabs = ({ client }: IProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleChange = useCallback((event: SyntheticEvent, newValue: number) => {
    setSelectedIndex(newValue);
  }, []);

  return (
    <>
      <TabsContainer>
        <Tabs value={selectedIndex} onChange={handleChange}>
          <Tab label="Prestamos" {...getA11yProps(0)} />
          <Tab label="Cargos" {...getA11yProps(1)} />
        </Tabs>
      </TabsContainer>
      <TabPanel selectedTab={selectedIndex} tabIndex={0}>
        <LoanProvider clientId={client.id}>
          <Loans client={client} />
        </LoanProvider>
      </TabPanel>
      <TabPanel selectedTab={selectedIndex} tabIndex={1}>
        <ChargeProvider clientId={client.id}>
          <Charges client={client} />
        </ChargeProvider>
      </TabPanel>
    </>
  );
};

export default ClientDetailsTabs;
