import { Modal } from '@mui/material';
import Client, { TPartialClient } from '../../models/Client.model';
import ClientForm from '../ClientForm';
import { ModalContent, ModalTitle } from './ClientModal.styled';

export type ClientModalProps = {
  isOpen: boolean;
  onClose(): void;
  client?: Client;
  onSubmit(values: TPartialClient): void;
};

const ClientModal = ({ isOpen, onClose, onSubmit, client }: ClientModalProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="client-modal"
      aria-describedby="client-modal"
    >
      <ModalContent>
        <ModalTitle>Agregar Cliente</ModalTitle>
        <ClientForm onSubmit={onSubmit} client={client} onCancel={onClose} />
      </ModalContent>
    </Modal>
  );
};

export default ClientModal;
