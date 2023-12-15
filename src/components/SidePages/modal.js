import { Box, Fade, Modal, Paper } from '@mui/material';
import React from 'react';
import UpdateVacancyForm from './UpdateVacancyForm';

const CustomModal = ({ open, onClose, vacancyData, onUpdate, onCancel }) => {
  return (
    <Modal 
      open={open}
      onClose={onClose}
      closeAfterTransition
      backdrop
    >
      <Fade in={open}>
        <Paper elevation={4} component={Box} p={3} style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '100%', maxHeight: '80%', overflowY: 'auto' }}>
          <UpdateVacancyForm  vacancyData={vacancyData} onUpdate={onUpdate} onCancel={onCancel} />
        </Paper>
      </Fade>
    </Modal>
  );
};

export default CustomModal;