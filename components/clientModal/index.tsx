import { Modal } from '@mui/material';
import { FunctionComponent } from 'react';
import Client, { FormDataClientType } from '../../records/Client';
import ClientForm from '../clientForm';
import { ModalContent, ModalTitle } from './clientModalStyled';

export type ClientModalProps = {
  isOpen: boolean;
  onClose(): void;
  client?: Client;
  onSubmit(values: FormDataClientType): void;
};

const ClientModal: FunctionComponent<ClientModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  client,
}) => {
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
