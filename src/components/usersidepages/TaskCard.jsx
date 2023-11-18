import React from 'react'
// MUI components
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

function TaskCard(props){
    return (
        <Card elevation={10} sx={{ width: "90%", maxWidth: "500px" , m: '20px', borderRadius: '20px'}}> {/* Adjust maxWidth as needed */}
            <CardContent>
                <Typography variant='h5' color= "white" textAlign='center' style={{backgroundColor:"#0055A2",borderRadius: '15px'}}>{props.heading}</Typography>
                <Typography variant='body1' textAlign='justify' sx={{ p: '4%' }}>{props.details}</Typography>
            </CardContent>
            <CardActions>
                <Button variant='text' size='small'  sx={{ mx: 'auto' ,backgroundColor: '#0055A2', color:'white',borderRadius: '10px' ,'&:hover':{color:'blue'}}}>Apply Now </Button>
            </CardActions>
        </Card>
    );

}

export default TaskCard
