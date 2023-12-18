import React, { useState } from 'react';

import {
  Grid,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tab,
  Tabs,
  Box,
} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { ExpandMore } from '@mui/icons-material';

import { StepsViewTable } from 'pods/test-view/stepsDashboard/steps-view.table';
import RadialChart from 'pods/test-view/stepsDashboard/radial-bar.chart';
import LineChartSteps from 'pods/test-view/stepsDashboard/line-chart-steps';
import StackedChartSteps from 'pods/test-view/stepsDashboard/stacked-chart-steps';
import StackedAreaChartSteps from 'pods/test-view/stepsDashboard/stacked-area-chart-steps';
import PyramidChartSteps from 'pods/test-view/stepsDashboard/pyramid-chart-steps';

export const StepsDashboardContainer: React.FunctionComponent = (props) => {
  const { dashboardData } = props;
  const [timetabValue, setTimeTabValue] = useState('time1');

  const handleChangeTimeTabValue = (event, newValue) => {
    setTimeTabValue(newValue);
  };

  const [availabilitytabValue, setAvailabilityTabValue] =
    useState('availability1');

  const handleChangeAvailabilityTabValue = (event, newValue) => {
    setAvailabilityTabValue(newValue);
  };
  const lineChartTitle = 'Duración media por paso y periodo';
  const areaChartTitle = 'Disponiblidad media por paso y periodo';
  const radialChartTitle = 'Disponibilidad media por pasos';
  const pyramidChartTitle = 'Pasos con más errores';

  return (
    <>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '1em',
          }}
        >
          <Button variant="contained">
            Descargar informe mensual de pasos
          </Button>
        </div>
        <Grid xs={12}>
          <Box sx={{ width: '100%', typography: 'body1', margin: '1em' }}>
            <TabContext value={timetabValue}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  onChange={handleChangeTimeTabValue}
                  aria-label="lab API tabs example"
                  textColor="inherit"
                  indicatorColor="secondary"
                >
                  <Tab
                    sx={{
                      color: 'black',
                    }}
                    label="Timeline"
                    value="time1"
                  />
                  <Tab sx={{ color: 'black' }} label="BarChart" value="time2" />
                </Tabs>
              </Box>
              <TabPanel value="time1">
                <Grid item xs={11}>
                  <LineChartSteps
                    series={dashboardData.timeChartSeries}
                    categories={dashboardData.timeCategories}
                    title={lineChartTitle}
                  />
                </Grid>
              </TabPanel>
              <TabPanel value="time2">
                <Grid item xs={11}>
                  <StackedChartSteps
                    series={dashboardData.timeChartSeries}
                    categories={dashboardData.timeCategories}
                    title={lineChartTitle}
                  />
                </Grid>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>

        <Grid xs={12}>
          <Box sx={{ width: '100%', typography: 'body1', margin: '1em' }}>
            <TabContext value={availabilitytabValue}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  onChange={handleChangeAvailabilityTabValue}
                  aria-label="lab API tabs example"
                  textColor="inherit"
                  indicatorColor="secondary"
                >
                  <Tab
                    sx={{
                      color: 'black',
                    }}
                    label="AreaChart"
                    value="availability1"
                  />
                  <Tab
                    sx={{ color: 'black' }}
                    label="BarChart"
                    value="availability2"
                  />
                </Tabs>
              </Box>
              <TabPanel value="availability1">
                <Grid item xs={11}>
                  <StackedAreaChartSteps
                    series={dashboardData.availabilityChartSeries}
                    categories={dashboardData.timeCategories}
                    title={areaChartTitle}
                    type={'area'}
                  />
                </Grid>
              </TabPanel>
              <TabPanel value="availability2">
                <Grid item xs={11}>
                  <StackedAreaChartSteps
                    series={dashboardData.availabilityChartSeries}
                    categories={dashboardData.timeCategories}
                    title={areaChartTitle}
                    type={'bar'}
                  />
                </Grid>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
        {/* Stacked Area chart */}
        <Grid container spacing={2} sx={{ margin: '1em' }}></Grid>

        {/* Table */}
        <Grid container spacing={2} sx={{ margin: '1em' }}>
          <Grid item xs={11}>
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
                <Typography variant="h6">Tabla detallada</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <StepsViewTable tests={dashboardData.resultSteps} />
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ margin: '1em' }}>
          <Grid item xs={6}>
            <RadialChart
              labels={dashboardData.radialChartLabels}
              series={dashboardData.radialChartSeries}
              title={radialChartTitle}
            />
          </Grid>

          {
            <Grid item xs={5}>
              <PyramidChartSteps
                series={dashboardData.pyramidChartSeries}
                categories={dashboardData.pyramidChartLabels}
                title={pyramidChartTitle}
              />
            </Grid>
          }
        </Grid>
      </div>
    </>
  );
};
