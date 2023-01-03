import { Button, Modal } from '@mui/material';
import { FunctionComponent } from 'react';
import { ActionsContainer } from '../ClientForm/ClientForm.styled';
import { ConfirmButton, ModalContent, ModalTitle, Message } from './ConfirmationModal.styled';

export type ClientModalProps = {
  title: string;
  message: string;
  cancelText?: string;
  confirmText: string;
  isOpen: boolean;
  onClose(): void;
  onConfirm(): void;
};

const ConfirmationModal: FunctionComponent<ClientModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  cancelText = 'Cancelar',
  confirmText,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="confirmation-modal"
      aria-describedby="confirmation-modal"
    >
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <Message>{message}</Message>
        <ActionsContainer>
          <Button color="info" onClick={onClose}>
            {cancelText}
          </Button>
          <ConfirmButton
            onClick={() => {
              onClose();
              onConfirm();
            }}
          >
            {confirmText}
          </ConfirmButton>
        </ActionsContainer>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
