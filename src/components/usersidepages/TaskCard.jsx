import React, { useState } from 'react';
// MUI components
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authContext';
import CustomModal from '../SidePages/modal';
function TaskCard(props){

    const [isModalOpen,setModalOpen] = useState(false);
    const [selectedVacancy, setSelectedVacancy] = useState(null);
    const navigate = useNavigate();
    const {authData} = useAuth();
    const handleButtonClick = () => {
        if (authData) {
          navigate('/users/apply', {
          state: {
            jobTitle: props.heading,
            jobField: props.field,
            jobPosition: props.position,
            eduDetails: props.eduDetails,
            olSubjects: props.olSubjects,
            alSubjects: props.alSubjects
          },
          });
          
        } else {
          navigate('/users/login');
        }
      };

    const handleView = ()=>{
      setSelectedVacancy({props});
      console.log(props);
      setModalOpen(true);
    }
    const handleModalClose = () => {
      // Clear the selectedVacancy and close the modal
      setModalOpen(false);
  };
    return (
        <Card elevation={10} sx={{ width: "90%", maxWidth: "500px" , m: '20px', borderRadius: '20px'}}> {/* Adjust maxWidth as needed */}
            <CardContent>
                <Typography variant='h5' color= "white" textAlign='center' style={{backgroundColor:"#0055A2",borderRadius: '15px'}}>{props.heading}</Typography>
                <Typography variant='body2' textAlign='justify' sx={{ p: '4%' }}>{props.details}</Typography>
                {props.details1 && props.details1.length >0 &&(
                <div style={{ textAlign: 'justify', paddingLeft: '4%' }}>
                <h6>Required Skills</h6>
                
                <ul>
                    {props.details1.map((skill, index) => (
                    <li  key={index}>
                      <Typography variant='body2'>{skill}</Typography>
                    </li>
                    ))}
                </ul>
                <div style={{ textAlign: 'center', width: '100%'}}>
                <Button  variant='text' size='small'  sx={{ mx: 'auto' ,backgroundColor: '#0055A2', color:'white',borderRadius: '10px' ,'&:hover':{color:'white',backgroundColor: 'black'}}} onClick={handleView}>
                  View More
                </Button>
                </div>
                </div>
                )}
            </CardContent>
            <CardActions>
                <div style={{ textAlign: 'center', width: '100%',paddingLeft: '4%'}}>
                <Button variant='text' size='large' 
                sx={{ mx: 'auto' ,backgroundColor: 'green', color:'white',borderRadius: '10px' ,'&:hover':{color:'red'}}}
                onClick={handleButtonClick}
                >
                Apply Now 
                </Button> 
                </div>
                
                
                        
            </CardActions>
            {isModalOpen && (
                <CustomModal open={isModalOpen} onClose={handleModalClose} Data={selectedVacancy} onCancel={handleModalClose} scenario="view2" />
            )}
        </Card>
        
    );

}

export default TaskCard
