import React from 'react';
import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import {
  Grid,
  Typography,
  Tab,
  Tabs,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { ExpandMore } from '@mui/icons-material';

import { getTestView } from './test-view.repository';

import { TestDashboardContainer } from 'pods/test-view/testsDashboard/test-dashboard.container';
import { StepsDashboardContainer } from 'pods/test-view/stepsDashboard/steps-dashboard.container';
import { AdvancedDashboardContainer } from './advancedDashboard/advanced-dashboard.container';

export const TestViewContainer: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [dashboardData, setDashboardData] = useState({
    porcentaje_disponibilidad_current: '4.07%',
    correcto_current: 9,
    erroneo_current: 212,
    total_current: 221,
    tiempo_medio_ejecucion_current: 13.93,
    porcentaje_disponibilidad_previous: '3.06%',
    correcto_previous: 7,
    erroneo_previous: 222,
    total_previous: 229,
    tiempo_medio_ejecucion_previous: 13.36,
    porcentaje_disponibilidad_difference: 1.01,
    correcto_difference: 2,
    erroneo_difference: -10,
    total_difference: -8,
    common_har_error: {},
    urlFailedTable: [],
    wordCloudData: [],
    mirrorChartData: [],
    har_table_list: [],
    tiempo_medio_ejecucion_difference: 0.57,
    mixedChartCategories: ['18-11-2023 09'],
    mixedChartData: [
      {
        name: 'Disponibilidad',
        type: 'area',
        data: [0.0],
      },
      {
        name: 'Tiempo',
        type: 'line',
        data: [14.26],
      },
    ],
    groupedResultTests: [
      {
        fecha: '18-11-2023 09',
        disponibilidad: 0.0,
        duracionMedia: 14.26,
        totalErrores: 6,
        totalMuestras: 6,
      },
      {
        fecha: '18-11-2023 10',
        disponibilidad: 0.0,
        duracionMedia: 14.05,
        totalErrores: 9,
        totalMuestras: 9,
      },
    ],
    timeChartSeries: [
      {
        name: 'Paso 1',
        data: [0.15],
      },
    ],

    resultSteps: [],
    timeCategories: ['18-11-2023 09'],
    availabilityChartSeries: [
      {
        name: 'Paso 1',
        data: [100.0],
      },
    ],
    radialChartLabels: ['Paso 1'],
    radialChartSeries: [100.0],
    pyramidChartLabels: ['Paso 1'],
    pyramidChartSeries: [{ name: '', data: [0] }],
    idTest: 'xxx',
    nombreTest: 'xxxx',
    tags: ['test', 'test'],
    entorno: 'xxxx',
  });
  const [tabValue, setTabValue] = useState('1');

  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue);
  };

  React.useEffect(() => {
    getTestView(id).then((dashboardDataResponse) => {
      if (dashboardDataResponse) {
        setDashboardData(dashboardDataResponse);
      }
    });
  }, []);

  return (
    <>
      <Grid
        container
        spacing={2}
        style={{
          display: 'flex',
          marginTop: '1em',
          backgroundColor: '#f3f3f3',
        }}
      >
        {/* row 1 */}

        <Grid item rowSpacing={4.5} xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">
            Dashboard del Test: {dashboardData.nombreTest}
          </Typography>

          <Grid item xs={6}>
            <Accordion
              sx={{
                marginBottom: '1em',
                borderColor: 'black',
                borderWidth: '2px',
                borderStyle: 'solid',
              }}
              defaultExpanded={false}
            >
              <AccordionSummary
                sx={{
                  border: '2px',
                  borderColor: 'black',
                }}
                expandIcon={<ExpandMore />}
              >
                <Typography variant="h6">Metadatos</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid item>
                  <List>
                    <ListItem>
                      <ListItemText>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold', display: 'inline' }}
                        >
                          Entorno:{' '}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ display: 'inline' }}
                        >
                          {dashboardData.entorno}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold', display: 'inline' }}
                        >
                          Tgas:{' '}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ display: 'inline' }}
                        >
                          {dashboardData.tags
                            ? dashboardData.tags.join(', ')
                            : ''}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold', display: 'inline' }}
                        >
                          Id test:{' '}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ display: 'inline' }}
                        >
                          {dashboardData.idTest}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  </List>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid xs={12}>
            <Box sx={{ width: '100%', typography: 'body1', margin: '1em' }}>
              <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    onChange={handleChangeTabValue}
                    aria-label="lab API tabs example"
                    textColor="inherit"
                    indicatorColor="secondary"
                  >
                    <Tab
                      sx={{
                        color: 'black',
                      }}
                      label="Tests"
                      value="1"
                    />
                    <Tab sx={{ color: 'black' }} label="Pasos" value="2" />
                    <Tab sx={{ color: 'black' }} label="Avanzado" value="3" />
                  </Tabs>
                </Box>
                <TabPanel value="1">
                  <TestDashboardContainer dashboardData={dashboardData} />
                </TabPanel>
                <TabPanel value="2">
                  <StepsDashboardContainer dashboardData={dashboardData} />
                </TabPanel>
                <TabPanel value="3">
                  <AdvancedDashboardContainer dashboardData={dashboardData} />
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
