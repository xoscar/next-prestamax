import { FunctionComponent, SyntheticEvent, useCallback, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import TabPanel from '../tabPanel';
import { ActionsContainer, AddButton, TabsContainer } from './loanDetailsTabsStyled';
import { useSelector } from 'react-redux';
import Loan from '../../records/Loan';
import { FormDataPaymentType } from '../../records/Payment';
import { paymentListSelector } from '../../selectors/paymentSelectors';
import PaymentList from '../paymentList';
import PaymentModal from '../paymentModal';

export type LoanDetailsTabsProps = {
  loan: Loan;
  onAddPayment(values: FormDataPaymentType): void;
};

const getA11yProps = (index: number) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
});

const LoanDetailsTabs: FunctionComponent<LoanDetailsTabsProps> = ({ loan, onAddPayment }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { finished } = loan;

  const paymentList = useSelector(paymentListSelector);

  const handleChange = useCallback((event: SyntheticEvent, newValue: number) => {
    setSelectedIndex(newValue);
  }, []);

  return (
    <>
      <TabsContainer>
        <Tabs value={selectedIndex} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Pagos" {...getA11yProps(0)} />
        </Tabs>
      </TabsContainer>
      <TabPanel selectedTab={selectedIndex} tabIndex={0}>
        {!finished && (
          <ActionsContainer>
            <AddButton onClick={() => setIsModalOpen(true)}>Agregar Pago</AddButton>
          </ActionsContainer>
        )}
        <PaymentList paymentList={paymentList} loan={loan} />
      </TabPanel>
      <PaymentModal
        onSubmit={(values) => {
          onAddPayment(values);
          setIsModalOpen(false);
        }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default LoanDetailsTabs;
