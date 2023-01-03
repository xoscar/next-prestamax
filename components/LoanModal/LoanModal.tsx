import { Modal } from '@mui/material';
import Loan, { TPartialLoan } from '../../models/Loan.model';
import LoanForm from '../LoanForm';
import { ModalContent, ModalTitle } from './LoanModal.styled';

interface IProps {
  isOpen: boolean;
  onClose(): void;
  loan?: Loan;
  onSubmit(values: TPartialLoan): void;
}

const LoanModal = ({ isOpen, onClose, onSubmit, loan }: IProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="loan-modal"
      aria-describedby="loan-modal"
    >
      <ModalContent>
        <ModalTitle>Agregar Prestamo</ModalTitle>
        <LoanForm onSubmit={onSubmit} loan={loan} onCancel={onClose} />
      </ModalContent>
    </Modal>
  );
};

export default LoanModal;
