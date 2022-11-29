import React, { useState,} from 'react';
import { useParams, useHistory } from 'react-router-dom';

import {useSelector} from 'react-redux';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import contractReducer from '../../redux/reducers/contract.reducer';
import ContractCard from '../ContractCard/ContractCard';


function Dashboard() {

  const history = useHistory();
  const user = useSelector((store) => store.user);
  const userContracts = useSelector((store) => store.contract.userContracts);
  



  return (
    <div>
        <h1>Hello, {user.legal_name}</h1>
        <button onClick={() => {history.push(`/create-contract-details`)}}>New Contract</button>

        <h2>Accepted Contracts</h2>
        <div>
          {userContracts.map(contract => {
            //renders accepted contracts
            if (contract.contract_status === 'accepted')
              return <ContractCard contract={contract} key={contract.id}/>
          })}
        </div>

        <h2 >Pending Contracts</h2>
        <div>
          {userContracts.map(contract => {
            //renders pending contracts
            if (contract.contract_status === 'pending')
              return <ContractCard contract={contract} key={contract.id}/>
          })}
        </div>

        <h2>Expired Contracts</h2>
        <div>
          {userContracts.map(contract => {
            //renders expired contracts
            if (contract.contract_status === 'expired')
              return <ContractCard contract={contract} key={contract.id}/>
          })}
        </div>


    </div>
  );
}
export default Dashboard;