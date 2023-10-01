import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Stack,
  Chip,
  Typography,
} from '@mui/material';

import AddLocationAltIconOutlined from '@mui/icons-material/AddLocationAltOutlined';
import AddressForm from './AddressForm';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const AddressFormDialog = props => {
  const { submitAddress } = props;
  const [open, setOpen] = useState(false);

  const addressForm = useForm({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        startIcon={<AddLocationAltIconOutlined />}
        onClick={handleClickOpen}
      >
        Ajouter une localisation
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullWidth
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>
          Ajouter une localisation
          <Stack direction='row' justifyContent='flex-end'>
            <Typography variant='caption'>Champs obligatoire *</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <AddressForm
            {...addressForm}
            centerMap={submitAddress}
            handleClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddressFormDialog;
