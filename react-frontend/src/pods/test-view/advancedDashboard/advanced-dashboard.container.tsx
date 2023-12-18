import React from 'react';
import {
  Grid,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

import ColumnLineChart from 'pods/test-view/testsDashboard/column-line-chart';
import StackCard from 'pods/test-view/advancedDashboard/stack-card';
import { HarsTable } from './hars-table.component';
import { UrlFailedTable } from './url-failed-table.component';
import WordCloudChart from './wordcloud-chart';
export const AdvancedDashboardContainer: React.FunctionComponent = (props) => {
  const { dashboardData } = props;

  return (
    <>
      <div>
        {/**<div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '1em',
          }}
        >
          <Button variant="contained">
            Descargar informe mensual de cálculos avanzados
          </Button>
        </div>*/}
        <Grid>
          <Typography variant="h5">Información sobre los HARS</Typography>
        </Grid>
        {/* First Stack */}

        {/* First Stack */}
        <Grid container xs={11} spacing={1} sx={{ margin: '1em' }}>
          <StackCard
            cardHeader="Error de HAR más común"
            value={
              dashboardData
                ? dashboardData.common_har_error.server_response_code
                : ''
            }
          />
          {/* Second Stack */}
          <StackCard
            cardHeader="Mesaje de error más común"
            value={
              dashboardData.common_har_error
                ? dashboardData.common_har_error.server_response_message
                : ''
            }
          />
          {/* Third Stack */}
          <StackCard
            cardHeader="Texto más común"
            value={
              dashboardData.common_har_error
                ? dashboardData.common_har_error.status_text
                : ''
            }
          />

          {/* Fourth Stack */}
          <StackCard
            cardHeader="Url más común"
            value={
              dashboardData.common_har_error
                ? dashboardData.common_har_error.url
                : ''
            }
          />

          {/* Fourth Stack */}
          <StackCard
            cardHeader="Número de Hars"
            value={
              dashboardData.common_har_error
                ? dashboardData.common_har_error.total
                : ''
            }
          />
        </Grid>

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
                <Typography variant="h6">Información de los HARS</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <HarsTable tests={dashboardData.har_table_list} />
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>

        <Grid>
          <Typography variant="h5">Análisis de las URL fallidas</Typography>
          <Typography>Clasificación de urls con Machine Learning</Typography>
        </Grid>

        <Grid container spacing={2} sx={{ margin: '1em' }}>
          <Grid item xs={7}>
            <UrlFailedTable
              tests={dashboardData.urlFailedTable}
            ></UrlFailedTable>
          </Grid>
          <Grid item xs={4}>
            <WordCloudChart data={dashboardData.wordCloudData} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
