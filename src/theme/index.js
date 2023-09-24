import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import palette from './palette';
import typography from './typography';
import components from './components';
import shadows from './shadows';

const theme = createTheme({
  palette: palette,
  typography: typography,
  components: components,
  shadows: shadows,
});

export default responsiveFontSizes(theme);
