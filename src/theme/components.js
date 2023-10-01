import palette from './palette';

const labelStyles = {
  root: {
    color: palette.formLabel,
    fontWeight: 500,
    fontSize: '14px',
  },
};

const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '.5rem',
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: '1rem',
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: labelStyles,
  },
  MuiFormLabel: {
    styleOverrides: labelStyles,
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        borderRadius: '.5rem !important',
        overflow: 'hidden',
      },
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        '&:before': {
          display: 'none',
        },
      },
    },
  },
};

export default components;
