import React from 'react';
// MUI components
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authContext';
function TaskCard(props){
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
    return (
        <Card elevation={10} sx={{ width: "90%", maxWidth: "500px" , m: '20px', borderRadius: '20px'}}> {/* Adjust maxWidth as needed */}
            <CardContent>
                <Typography variant='h5' color= "white" textAlign='center' style={{backgroundColor:"#0055A2",borderRadius: '15px'}}>{props.heading}</Typography>
                <Typography variant='body1' textAlign='justify' sx={{ p: '4%' }}>{props.details}</Typography>
                {props.details1 && props.details1.length >0 &&(
                <div style={{ textAlign: 'justify', paddingLeft: '4%' }}>
                <h6>Required Skills</h6>
                
                <ul>
                    {props.details1.map((skill, index) => (
                    <li key={index}>{skill}</li>
                    ))}
                </ul>
                </div>
                )}
            </CardContent>
            <CardActions>

                <Button variant='text' size='small'  
                sx={{ mx: 'auto' ,backgroundColor: '#0055A2', color:'white',borderRadius: '10px' ,'&:hover':{color:'blue'}}}
                onClick={handleButtonClick}
                >
                Apply Now 
                </Button> 
                
                        
            </CardActions>
        </Card>
    );

}

export default TaskCard
