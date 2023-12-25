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
import { test_view_mocked_data } from './test-view.mock.data';

export const TestViewContainer: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [dashboardData, setDashboardData] = useState(test_view_mocked_data);
  const [tabValue, setTabValue] = useState('1');

  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue);
  };

  /**React.useEffect(() => {
    getTestView(id).then((dashboardDataResponse) => {
      if (dashboardDataResponse) {
        setDashboardData(dashboardDataResponse);
      }
    });
  }, []);*/

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
