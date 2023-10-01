import React, { useState } from 'react';
import clsx from 'clsx';

import { Typography, Grid, Stack, Paper } from '@mui/material';

import { green, blue, red, orange } from '@mui/material/colors';

import PanelCalculation from './PanelCalculation';
import Map from './Map';

import { _MAP_CENTER_FR_ } from './config';

import useStyles from '../../styles';
import AddressFormDialog from './AddressFormDialog';

const _COLORS_ = [green[500], blue[500], red[500], orange[500]];

function Home() {
  const classes = useStyles();

  const [center, setCenter] = useState(_MAP_CENTER_FR_);

  const [panelsState, setPanelsState] = useState({
    pans: [{ nb: 1, color: _COLORS_[0], surface: 0 }],
    activePan: 0,
  });
  const { pans = [], activePan = 0 } = panelsState;

  const setActivePan = index => evt => {
    evt.preventDefault();
    evt.stopPropagation();
    setPanelsState(s => ({ ...s, activePan: index }));
  };

  const addPan = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    console.log('In addPan !');
    setPanelsState(s => {
      const newPans = {
        pans: [
          ...s.pans,
          {
            color: _COLORS_.find(c => !s.pans.some(p => p?.color === c)),
            surface: 0,
            nb: s.pans.length + 1,
          },
        ],
        activePan: s.pans.length, // since new index is old size
      };
      console.log('>> newPans : ', newPans);
      return newPans;
    });
  };

  const deletePan = index => evt => {
    evt.preventDefault();
    evt.stopPropagation();
    setPanelsState(s => ({
      pans: [...s.pans].filter((item, i) => i !== index),
      // if the deleted one is before the displayed, would get wrong order or > total
      activePan:
        s.activePan === index // if we delete the selected, back to start
          ? 0
          : index < s.activePan
          ? activePan - 1
          : activePan,
    }));
  };

  const submitAddress = location => {
    setCenter(location);
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.homepageContainer}>
        <Grid item md={6} className={clsx(classes.column, classes.columnLeft)}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            spacing={2}
          >
            <Typography variant='h5' component='h1'>
              Calculer rendement solaire
            </Typography>
            <AddressFormDialog submitAddress={submitAddress} />
          </Stack>
          <div className={classes.profilesWrapper}>
            <Grid container spacing={2}>
              {Array.from({ length: 4 }).map((_, i) => (
                <Grid item md={4} key={i}>
                  <Paper elevation={'card'} className={classes.profileCard}>
                    <p>Test</p>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
        </Grid>
        <Grid item md={6}>
          <Map
            classes={classes}
            center={center}
            setSurface={surface =>
              setPanelsState({
                ...panelsState,
                pans: pans.map((pan, index) =>
                  index === activePan ? { ...pan, surface } : pan,
                ),
              })
            }
            {...panelsState}
            activePan={activePan}
            pans={pans}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;

// Content for PanelCalculation
// {pans.map((pan, index) => (
//   <PanelCalculation
//     key={index}
//     pan={pan}
//     addPan={addPan}
//     isActive={activePan === index}
//     setActivePan={setActivePan(index)}
//     deletePan={deletePan(index)}
//     nbPans={pans.length}
//   />
// ))}
