import { FunctionComponent, SyntheticEvent, useCallback, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import TabPanel from '../tabPanel';
import {
  ActionsContainer,
  AddButton,
  CardContainer,
  FinishedSwitch,
  FinishedSwitchContainer,
  FinishedText,
  TabsContainer,
} from './clientDetailsTabsStyled';
import {
  loanListHasMoreItemsSelector,
  loanListSelector,
  loanLoadingStateSelector,
} from '../../selectors/loanSelectors';
import LoanCard from '../loanCard';
import NoMoreItems from '../noMoreItems';
import { useSelector } from 'react-redux';
import { LoadingState } from '../../enums/common';
import InfiniteScroll from '../infiniteScroll';
import {
  chargeListHasMoreItemsSelector,
  chargeListSelector,
  chargeLoadingStateSelector,
} from '../../selectors/chargeSelector';
import ChargeList from '../chargeList';
import LoanModal from '../loanModal';
import ChargeModal from '../chargeModal';
import { FormDataLoanType } from '../../records/Loan';
import { FormDataChargeType } from '../../records/Charge';
import Client from '../../records/Client';

export type ClientDetailsTabsProps = {
  client: Client;
  showFinished: boolean;
  onFinishedChange(isChecked: boolean): void;
  onLoansNextPage(): void;
  onChargesNextPage(): void;
  onAddLoan(values: FormDataLoanType): void;
  onAddCharge(values: FormDataChargeType): void;
};

const getA11yProps = (index: number) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
});

const ClientDetailsTabs: FunctionComponent<ClientDetailsTabsProps> = ({
  client,
  showFinished,
  onFinishedChange,
  onLoansNextPage,
  onChargesNextPage,
  onAddLoan,
  onAddCharge,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState<boolean>(false);
  const [isChargeModalOpen, setIsChargeModalOpen] = useState<boolean>(false);

  // loans
  const loanList = useSelector(loanListSelector);
  const areLoansLoading = useSelector(loanLoadingStateSelector) !== LoadingState.SUCCESS;
  const hasMoreLoans = useSelector(loanListHasMoreItemsSelector);

  // charges
  const chargeList = useSelector(chargeListSelector);
  const areChargeLoading = useSelector(chargeLoadingStateSelector) !== LoadingState.SUCCESS;
  const hasMoreCharges = useSelector(chargeListHasMoreItemsSelector);

  const handleChange = useCallback((event: SyntheticEvent, newValue: number) => {
    setSelectedIndex(newValue);
  }, []);

  return (
    <>
      <TabsContainer>
        <Tabs value={selectedIndex} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Prestamos" {...getA11yProps(0)} />
          <Tab label="Cargos" {...getA11yProps(1)} />
        </Tabs>
        <FinishedSwitchContainer>
          <FinishedSwitch
            checked={showFinished}
            onChange={(_, isChecked) => onFinishedChange(isChecked)}
          />
          <FinishedText>Liquidados</FinishedText>
        </FinishedSwitchContainer>
      </TabsContainer>
      <TabPanel selectedTab={selectedIndex} tabIndex={0}>
        {!showFinished && (
          <ActionsContainer>
            <AddButton onClick={() => setIsLoanModalOpen(true)}>Agregar Prestamo</AddButton>
          </ActionsContainer>
        )}
        <CardContainer>
          {loanList.map((loan) => (
            <LoanCard loan={loan} key={loan.id} />
          ))}
          <InfiniteScroll
            isLoading={areLoansLoading}
            callback={onLoansNextPage}
            hasMoreItems={hasMoreLoans}
            noMoreItemsComponent={<NoMoreItems />}
          />
        </CardContainer>
      </TabPanel>
      <TabPanel selectedTab={selectedIndex} tabIndex={1}>
        {!showFinished && (
          <ActionsContainer>
            <AddButton onClick={() => setIsChargeModalOpen(true)}>Agregar Cargo</AddButton>
          </ActionsContainer>
        )}
        <ChargeList
          client={client}
          chargeList={chargeList}
          hasMoreItems={hasMoreCharges}
          onNextPage={onChargesNextPage}
          isLoading={areChargeLoading}
        />
      </TabPanel>
      <LoanModal
        isOpen={isLoanModalOpen}
        onClose={() => setIsLoanModalOpen(false)}
        onSubmit={(values) => {
          onAddLoan(values);
          setIsLoanModalOpen(false);
        }}
      />
      <ChargeModal
        isOpen={isChargeModalOpen}
        onClose={() => setIsChargeModalOpen(false)}
        onSubmit={(values) => {
          onAddCharge(values);
          setIsChargeModalOpen(false);
        }}
      />
    </>
  );
};

export default ClientDetailsTabs;
