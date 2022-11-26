import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { effectTypes } from 'redux-saga/effects';
import contractSaga from '../../redux/sagas/contract.saga';

function ContractDetails() {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const contractDetails = useSelector()
  const {contractId} = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_CONTRACT_DETAILS', payload: contractId })
  })

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
// }

  return (
    <div>
      <h1>Contract Details</h1>
      {/* // <div key={contract.id}> */}

      <div>
        <h3>Date Created :</h3>
          <p>11/25/2022</p>

        <h3>Deadline :  </h3>
          <p>12/9/2022</p>

        <h3>Status :</h3>
          <p>Pending</p>

        <h3>Party Name 1 :  </h3>
          <p>Johnny B. Goode</p>
        <h3>Party Name 2 :  </h3>
          <p>Johnny Guitar</p>

        <h3>Item Description :  </h3>
          <p>Fender Stratocaster 60s Road Worn 6 String Electric Guitar</p>

        <h3>Item Prices : </h3>
          <p>$799.99</p>

        <h3>Pick-up Date : </h3>
          <p>12/9/2022</p>

        <h3>Pick-up Loaction : </h3>
          <p> 701 N 1st Ave, Minneapolis, MN 55403</p>
          
        <h3>Notes </h3>
          <p>notes here</p>

        <h3>Signatures</h3>
          <p>signatures display here</p>
        <img 
          src ="https://i.ebayimg.com/images/g/ZUkAAOSw0x1jd7sn/s-l500.jpg"
          alt = "guitar"
        />
      </div>

      <div>
        <button>Back to Dashboard</button>
      </div>

    </div>





  );
}
export default ContractDetails;