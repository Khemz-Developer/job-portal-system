import React from 'react'
import Sidebar from '../Sidebar'
import RejectedApplications from './RejectedApplications'
const RejectedCVs = () => {
    return (
        <div>
           
            <br></br>
            <br></br>
            <br></br>
         <Sidebar>
          <h3>Rejected CVs</h3>
              <br></br>
              <RejectedApplications/>
          </Sidebar> 
        </div>
      )
}

export default RejectedCVs
