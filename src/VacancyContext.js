import axios from "axios";
import { createContext, useContext, useState } from "react";
const VacancyContext = createContext();

export const useVacancyContext  = ()=>{
    return useContext(VacancyContext);
};

export const VacancyProvider = ({children})=>{
    const [jobVacancies, setJobVacancies] = useState([]);

    const addJobVacancy = (newJobVacancyData)=>{
        const uniqueVacancies = newJobVacancyData.filter(
            (newVacancy) => !jobVacancies.some((existingVacancy) => existingVacancy.key === newVacancy.key)
          );
        setJobVacancies([...jobVacancies, ...uniqueVacancies]);
    };
    const fetchVacancies = async () => {
        try {
          const response = await axios.get('http://localhost:3001/public/vacancies/get-all');
          const fetchedVacancies = response.data;
          const vacanciesToAdd = fetchedVacancies.map((vacancy) => ({
            key: vacancy._id,
            heading: `${vacancy.jobPosition} - ${vacancy.jobField}`,
            field: vacancy.jobField,
            position: vacancy.jobPosition,
            details: vacancy.jobDescription,
            salary: vacancy.salary,
            dueDate: vacancy.dueDate,
            workLocation: vacancy.workLocation,
            workType: vacancy.workType,
            workMethod: vacancy.workMethod,
            details1: vacancy.requiredSkills,
            eduDetails: vacancy.educationalQualifications,
            olSubjects: vacancy.educationalQualifications==='ol' ? vacancy.olSubjects : '',
            alSubjects: vacancy.educationalQualifications==='al' ? vacancy.alSubjects : '',
          }));
          
          addJobVacancy(vacanciesToAdd);
        } catch (error) {
          console.error('Error fetching vacancies:', error);
        }
      };
    
      // Fetch vacancies only if jobVacancies is empty
      if (jobVacancies.length === 0) {
        fetchVacancies();
      }

    return(
        <VacancyContext.Provider value={{jobVacancies,addJobVacancy}}>
            {children}
        </VacancyContext.Provider>
    );
};