import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  '@global': {
    '*': {
      padding: 0,
      margin: 0,
      boxSizing: 'border-box',
    },
  },

  root: {
    height: '100vh',
  },
  homepageContainer: {
    height: '100%',
  },
  column: {
    padding: '2rem',
    height: '100%',
  },
  columnLeft: {
    backgroundColor: theme.palette.grey[100],
    backgroundColor: theme.palette.background.light,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  profileCard: {
    padding: '1.5rem',
  },
  profilesWrapper: {
    marginTop: '3rem',
  },
}));

export default useStyles;
