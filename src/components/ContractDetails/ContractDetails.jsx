import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FinalizeContractDialog from './FinalizeContractDialog.jsx';
import FinalizeSuccessDialog from './FinalizeSuccessDialog.jsx';
import ConfirmDeclineDialog from '../RecipientView/ConfirmDeclineDialog.jsx';
import ContractStatusUpdateDialog from '../RecipientView/ContractStatusUpdateDialog.jsx';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ContractPreview from '../ContractPreview/ContractPreview';

function ContractDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const contractDetails = useSelector(store => store.contract.selectedContract)
  const { contractId } = useParams();
  const user = useSelector(store => store.user);

  const [secondPartySignature, setSecondPartySignature] = useState('');

  // variable and functions for FinalizeContractDialog
  const [openFinalize, setOpenFinalize] = useState(false);

  const handleClickOpenFinalize = () => {
    setOpenFinalize(true);
  }

  const handleClickCloseFinalize = () => {
    setOpenFinalize(false);
  }

  // variable and functions for FinalizeSuccessDialog
  const [openFinalizeSuccess, setOpenFinalizeSuccess] = useState(false);

  const handleClickOpenSuccess = () => {
    setOpenFinalizeSuccess(true);
  }

  const handleClickCloseSuccess = () => {
    setOpenFinalizeSuccess(false);
    history.push('/dashboard');
  }

  // variable and functions for ConfirmDeclineDialog
  const [openConfirmDecline, setOpenConfirmDecline] = useState(false);

  const handleClickOpenConfirmDecline = () => {
    console.log('in handleClickOpenConfirmDecline');
    setOpenConfirmDecline(true);
  }

  const handleClickCloseConfirmDecline = () => {
    setOpenConfirmDecline(false);
  }

  // variable and functions for ContractStatusUpdateDialog
  const [openStatusUpdate, setOpenStatusUpdate] = useState(false);

  const handleClickOpenStatusUpdate = () => {
    console.log('in handleClickOpenStatusUpdate');
    setOpenStatusUpdate(true);
  }

  const handleClickCloseStatusUpdate = () => {
    setOpenStatusUpdate(false);
    history.push('/dashboard');
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_CONTRACT_DETAILS', payload: contractId, checkForUserAction: checkForUserAction});
  }, [contractId])

  const [userAction, setUserAction] = useState(false);

  // checking if action is required from the logged in user
  const checkForUserAction = (contractInput) => {
    console.log('in checkForUserAction', contractInput.contract_status);
    if(contractInput.contract_status === 'pending_first_party_response' && contractInput.first_party_name === user.legal_name) {
      setUserAction(true);
    } else if (contractInput.contract_status === 'pending_second_party_response' && contractInput.second_party_name === user.legal_name) {
      setUserAction(true);
    }
  }

  // dispatches 'FINALIZE_CONTRACT' with payload of contract object and the function userAlert
  const finalizeContract = () => {
    console.log('in finalizeContract, second party signature:', secondPartySignature);
    if (!secondPartySignature) {
      handleClickOpenFinalize();
      return;
    }
    // dispatch to contract saga to update contract details in database
    dispatch({
      type: 'FINALIZE_CONTRACT',
      payload: {
        id: contractDetails.id,
        contract_status: 'accepted',
        contract_approval: true,
        second_party_signature: secondPartySignature
      },
      userAlert
    });
  }

  // alerts user to successful contract finalization and navigates the user to /dashboard
  const userAlert = () => {
    console.log('in userAlert');
    handleClickOpenSuccess();
  }

  // prompts recipient to confirm before contract is declined
  const confirmDecline = () => {
    console.log('in confirmDecline');
    handleClickOpenConfirmDecline();
  };

  // dispatches 'UPDATE_CONTRACT_STATUS' with payload of contract object and function handleContractStatusUpdate
  const declineContract = () => {
    console.log('in declineContract. Contract id to decline is:', contractDetails.id);
    dispatch({
      type: 'UPDATE_CONTRACT_STATUS',
      payload: {
        id: contractDetails.id,
        contract_status: 'declined',
        contract_approval: false,
        second_party_signature: null
      },
      handleContractStatusUpdate
    });
  }

  // passed as part of declineContract, contract by key re-renders in RecipientView with updated status and alerts recipient of successful decline
  const handleContractStatusUpdate = () => {
    console.log('in handleContractStatusUpdate');
    handleClickCloseConfirmDecline();
    handleClickOpenStatusUpdate();
  }

  return (
    <div>
      <FinalizeContractDialog 
        handleClickCloseFinalize={handleClickCloseFinalize}
        open={openFinalize}
      />
      <FinalizeSuccessDialog 
        open={openFinalizeSuccess}
        handleClickCloseSuccess={handleClickCloseSuccess}
      />
      <ConfirmDeclineDialog 
        handleClickCloseConfirmDecline={handleClickCloseConfirmDecline}
        open={openConfirmDecline}
        declineContract={declineContract}
      />
      <ContractStatusUpdateDialog 
        open={openStatusUpdate}
        handleClickCloseStatusUpdate={handleClickCloseStatusUpdate}
      />
      <Typography variant="h3" sx={{ textAlign: "center" }}>Contract Details</Typography>
      <Typography variant="h5" sx={{ textAlign: "center" }}>Status: {contractDetails.contract_status} </Typography>
      <br />
      <ContractPreview 
        contractDetails={contractDetails} 
      />
      <br />
      <br />
        {
          userAction ?  <>
                          <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                            <Grid item>
                              <TextField required fullWidth label='Your Signature' size='small' sx={{width: 400}} onChange={(event) => setSecondPartySignature(event.target.value)}/> 
                            </Grid>
                          </Grid>
                          <br />
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography sx={{width: 400, display:"flex", alignItems:"center", justifyContent:"center"}}>By typing your name, you are agreeing that your typed signature has the same authority as a handwritten signature.</Typography>
                          </Box>
                          <br />
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                              variant="contained"
                              onClick={finalizeContract}
                              sx={{ marginRight: 1, width: 200, height: 60 }}
                              color='green'
                            >
                              Sign and Finalize Contract
                            </Button>
                            <Button
                              variant="contained"
                              color="grey"
                              onClick={confirmDecline}
                              sx={{ marginLeft: 1, width: 200, height: 60, color: 'white' }}
                            >
                              Decline Contract
                            </Button> 
                          </Box>
                      </> : 
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                          variant="contained"
                          onClick={(event) => history.push('/dashboard')}
                          sx={{ marginRight: 1, width: 200 }}
                          color='green'
                        >
                          Back to Dashboard
                        </Button>
                      </Box>
        }
    </div>
  );
}
export default ContractDetails;