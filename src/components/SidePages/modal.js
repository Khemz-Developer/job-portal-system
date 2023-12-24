import { Box, Fade, Modal, Paper } from '@mui/material';
import React from 'react';
import ViewVacancy from '../pages/ViewVacancy';
import UpdateVacancyForm from './UpdateVacancyForm';
import ViewApplications from './ViewApplications';

const CustomModal = ({ open, onClose, Data, onUpdate, onCancel, scenario }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      backdrop
    >
      <Fade in={open}>
        <Paper elevation={4} component={Box} p={3} style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '100%', maxHeight: '80%', overflowY: 'auto' }}>
         {scenario ==='update' && <UpdateVacancyForm  vacancyData={Data} onUpdate={onUpdate} onCancel={onCancel} /> }
         {scenario ==='view' && <ViewApplications  applicationData={Data} onCancel={onCancel} /> }
         {scenario ==='view2' && <ViewVacancy vacancyData={Data} onCancel={onCancel} /> }
        </Paper>
      </Fade>
    </Modal>
  );
};

export default CustomModal;