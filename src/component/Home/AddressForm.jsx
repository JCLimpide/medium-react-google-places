import React, { useEffect, useRef } from 'react';
import { Button, FormControl, TextField, Stack } from '@mui/material';
import useGooglePlaceAutoComplete from '../../service/google_place_autocomplete';

// all args besides centerMap are spread from react-hook-form's useForm
const AddressForm = ({
  handleSubmit,
  register,
  setFocus,
  setValue,
  formState = {},
  centerMap,
}) => {
  const address1Ref = useRef();
  const googleAutoCompleteSvc = useGooglePlaceAutoComplete();
  let autoComplete = '';

  const { errors } = formState;

  const handleAddressSelect = async () => {
    let addressObj = await googleAutoCompleteSvc.getFullAddress(autoComplete);
    console.log('>> addressObj : ', addressObj);
    address1Ref.current.value = addressObj.address1;
    setValue('address1', addressObj.address1);
    setValue(
      'locality',
      `${addressObj.locality}, ${addressObj.adminArea1Long}`,
    );
    setValue('country', addressObj.countryLong);
    setValue('postalCode', addressObj.postalCode);
    setValue('location', addressObj.location);
    setFocus('address2');
  };

  const onSubmit = value => {
    console.log('Success!', { value, formState });
    centerMap(value.location);
  };

  useEffect(() => {
    async function loadGoogleMaps() {
      // initialize the Google Place Autocomplete widget and bind it to an input element.
      // eslint-disable-next-line
      autoComplete = await googleAutoCompleteSvc.initAutoComplete(
        address1Ref.current,
        handleAddressSelect,
      );
    }
    loadGoogleMaps();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormControl>
          <TextField
            ref={address1Ref}
            variant='filled'
            label='Adresse 1 *'
            {...register('address1', { required: true })}
            {...(errors.address1
              ? {
                  error: true,
                  helperText: 'Street address is required.',
                }
              : {})}
          />
        </FormControl>

        <FormControl>
          <TextField
            variant='filled'
            label='Adresse 2'
            {...register('address2')}
          />
        </FormControl>

        <Stack direction='row' spacing={2}>
          <FormControl>
            <TextField
              variant='filled'
              label='Ville/Province *'
              {...register('locality', { required: true })}
              {...(errors.locality
                ? {
                    error: true,
                    helperText: 'Locality is required.',
                  }
                : {})}
            />
          </FormControl>

          <FormControl>
            <TextField
              variant='filled'
              label='Pays *'
              {...register('country', { required: true })}
              {...(errors.country
                ? {
                    error: true,
                    helperText: 'Country is required.',
                  }
                : {})}
            />
          </FormControl>

          <FormControl>
            <TextField
              variant='filled'
              label='Code postal *'
              {...register('postalCode', { required: true })}
              {...(errors.postalCode
                ? {
                    error: true,
                    helperText: 'Postal code is required.',
                  }
                : {})}
            />
          </FormControl>
        </Stack>
        <Stack direction='row' justifyContent='flex-end'>
          <Button variant='contained' color='primary' type='submit'>
            Rechercher
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default AddressForm;
