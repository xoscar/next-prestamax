import { useMemo, useState } from 'react';
import Client from '../../../../models/Client.model';
import { useLoan } from '../../../../providers/Loan/Loan.provider';
import LoanCard from '../../../LoanCard/LoanCard';
import LoanModal from '../../../LoanModal';
import {
  ActionsContainer,
  AddButton,
  CardContainer,
  FinishedSwitch,
  FinishedSwitchContainer,
  FinishedText,
} from '../../ClientDetailsTabs.styled';

interface IProps {
  client: Client;
}

const Loans = ({ client: { loans }, client }: IProps) => {
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [showFinished, setShowFinished] = useState(false);

  const list = useMemo(
    () => (showFinished ? loans : loans.filter((loan) => !loan.finished)),
    [loans, showFinished],
  );

  const { onCreate } = useLoan();

  return (
    <>
      <ActionsContainer>
        <FinishedSwitchContainer>
          <FinishedSwitch
            checked={showFinished}
            onChange={(_, isChecked) => setShowFinished(isChecked)}
          />
          <FinishedText>Mostrar Liquidados</FinishedText>
        </FinishedSwitchContainer>
        <AddButton onClick={() => setIsLoanModalOpen(true)}>Agregar Prestamo</AddButton>
      </ActionsContainer>
      <CardContainer>
        {list.map((loan) => (
          <LoanCard loan={loan} client={client} key={loan.id} />
        ))}
      </CardContainer>
      <LoanModal
        isOpen={isLoanModalOpen}
        onClose={() => setIsLoanModalOpen(false)}
        onSubmit={(draft) => {
          onCreate(draft);
          setIsLoanModalOpen(false);
        }}
      />
    </>
  );
};

export default Loans;
