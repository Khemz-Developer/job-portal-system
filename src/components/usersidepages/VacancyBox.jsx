import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Container, Paper, Typography } from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useVacancyContext } from '../../VacancyContext';
import TaskCard from './TaskCard';

// const cards = [
//     { heading: "Trainee Network Engineers", 
//       details: 'We  are   hiring   new   training   network   engineers   for SLTMobitel,  Only   an  associate   degree,  a   bachelor’s  degree  in  computer  science,  information   technology, computer engineering, or a related field  undergraduates  (3rd year, 4th year),  and fresh graduates  are  proffered' },
//     { heading: "ACCOUNTANT-FINANCIAL ACCOUNTING", details: 'Sri Lanka Telecom  is  in  search  of  high  caliber, result-oriented  and  qualified  individuals  capable of playing a key  role  in  the  finance  team. You will be engaged in a range  of  tasks  in  financial  accounting  in  a  highly IT-backed  work environment  and expected to collaborate with    subsidiary    companies    and    cross - functional departments  to  implement  key  business  drivers   and operational controls.' },
//     { heading: "ENGINEERS", details: 'As an Engineer of the pioneering ICT solutions provider, you will be a distinguished members of our team, which is mainly  responsible for planning, designing, operating and  maintaining  our  state of the art ICT infrastructure.' },
//     { heading: "TECHNICIANS", details: 'Technicians  are  mainly  responsible  in  install, maintain and   repair   electronic  communications  equipment   in telecommunication    networks    and    internet    supply systems.  Examine  telecommunications  equipment and systems to find and repair faults.  ' },
//     { heading: "Telecommunication Assistant", details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
//     { heading: "QA Engineer", details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetu' }
//   ];

const VacancyBox = () => {
      const {jobVacancies} = useVacancyContext();
      
      function createCard(card){
        return(
        <TaskCard key={card.key} heading={card.heading} details={card.details} details1 = {card.details1} />
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
