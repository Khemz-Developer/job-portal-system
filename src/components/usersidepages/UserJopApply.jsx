import { Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'
import UserSidebar from '../UserSidebar'
import ApplicationForm from './ApplicationForm'
const UserJopApply = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <div>
        <br></br>
        <br></br>
        <br></br>
      <UserSidebar>
        <br></br>
        <br></br>
        {state && state.jobTitle ? (
          <ApplicationForm
            jobTitle={state.jobTitle}
            jobField={state.jobField}
            jobPosition={state.jobPosition}
            eduDetails= {state.eduDetails}
            olSubjects={state.olSubjects}
            alSubjects={state.alSubjects}
          />
        ) : (
          <Typography variant="h5" textAlign="center">
            Please select a Vacancy from Dashboard & Apply
          </Typography>
        )}

        <br></br>
        <br></br>
      </UserSidebar>
      
    </div>
  )
}

export default UserJopApply

