import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Container, Paper, Typography } from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useVacancyContext } from '../../VacancyContext';
import TaskCard from './TaskCard';



const VacancyBox = () => {
      const {jobVacancies} = useVacancyContext();
      
      function createCard(card){
        return(
        <TaskCard key={card.key} heading={card.heading} details={card.details} details1 = {card.details1} field = {card.field} position = {card.position}
        eduDetails = {card.eduDetails} olSubjects = {card.olSubjects} alSubjects = {card.alSubjects} salary={card.salary} dueDate={card.dueDate} workMethod = {card.workMethod}
        workLocation = {card.workLocation} workType = {card.workType}
        />
        )
      }
      
      const NextArrow = (props) => {
          const { className, onClick } = props;
          return (
            <ArrowForwardIosIcon className={className} onClick={onClick} style={{ fontSize: '2rem', color: '#0055A2' }} />
          );
      }
    
      const PrevArrow = (props) => {
        const { className, onClick } = props;
        return (
          <ArrowBackIosIcon className={className} onClick={onClick} style={{ fontSize: '2rem', color: '#0055A2' }} />
        );
      }
    
      const sliderSettings = {
        dots: true,
        infinite: true,
        slidesToShow: jobVacancies.length > 2 ? 3 : jobVacancies.length, // Show 3 cards at a time
        slidesToScroll: 1,
        accessibility: true,
        draggable: true,
    
      };
    
      return (
        <Container maxWidth="lg" >  
          <Paper elevation={0} sx={{ p: '2%'}}> 
          <Typography variant='h5' textAlign='center' fontWeight="medium" sx={{ my: '50px'}}>Find the Job that's prefer for you</Typography>
          {jobVacancies.length>0 ?(
            <Slider {...sliderSettings} nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
            {jobVacancies.map(createCard)}
            </Slider>
          ):(
            <Typography variant="body1" textAlign="center">
            No job vacancies available.
            </Typography>
          )};
          
          </Paper>
        </Container>
      );
    
}

export default VacancyBox
