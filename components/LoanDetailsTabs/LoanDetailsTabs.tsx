import { SyntheticEvent, useCallback, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import TabPanel from '../TabPanel/TabPanel';
import { TabsContainer } from './LoanDetailsTabs.styled';
import Loan from '../../models/Loan.model';
import Payments from './tabs/Payments/Payments';
import PaymentProvider from '../../providers/Payment/Payment.provider';

interface IProps {
  loan: Loan;
}

const getA11yProps = (index: number) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
});

const LoanDetailsTabs = ({ loan }: IProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleChange = useCallback((event: SyntheticEvent, newValue: number) => {
    setSelectedIndex(newValue);
  }, []);

  return (
    <>
      <TabsContainer>
        <Tabs value={selectedIndex} onChange={handleChange}>
          <Tab label="Pagos" {...getA11yProps(0)} />
        </Tabs>
      </TabsContainer>
      <TabPanel selectedTab={selectedIndex} tabIndex={0}>
        <PaymentProvider clientId={loan.client.id} loanId={loan.id}>
          <Payments loan={loan} />
        </PaymentProvider>
      </TabPanel>
    </>
  );
};

export default LoanDetailsTabs;
