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
import StackCard from 'pods/test-view/testsDashboard/stack-card';
import BoxplotChart from 'pods/test-view/testsDashboard/boxplot-chart-steps';
import MirrorPlotChart from 'pods/test-view/testsDashboard/mirror-bar-chart';
import { TestViewFullComponent } from 'pods/test-view/testsDashboard/test-view.component_full';

export const TestDashboardContainer: React.FunctionComponent = (props) => {
  const { dashboardData } = props;
  const [tableCompression, setTableCompression] = React.useState('Lite');

  const handleTableCompression = () => {
    if (tableCompression == 'Full') {
      setTableCompression('Lite');
    } else {
      setTableCompression('Full');
    }
  };

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
            Descargar informe mensual de tests
          </Button>
        </div>
        {/* First Stack */}
        <Grid container xs={11} spacing={1} sx={{ margin: '1em' }}>
          <StackCard
            cardHeader="Tiempo medio de ejecución"
            difference={dashboardData.tiempo_medio_ejecucion_difference}
            value={dashboardData.tiempo_medio_ejecucion_current}
            previousValue={dashboardData.tiempo_medio_ejecucion_previous}
            invertColors={true}
          />
          {/* Second Stack */}
          <StackCard
            cardHeader="Disponibilidad Media"
            difference={dashboardData.porcentaje_disponibilidad_difference}
            value={dashboardData.porcentaje_disponibilidad_current}
            previousValue={dashboardData.porcentaje_disponibilidad_previous}
          />
          {/* Third Stack */}
          <StackCard
            cardHeader="Número de errores"
            difference={dashboardData.erroneo_difference}
            value={dashboardData.erroneo_current}
            previousValue={dashboardData.erroneo_previous}
            invertColors={true}
          />

          {/* Fourth Stack */}
          <StackCard
            cardHeader="Número total de tests"
            difference={dashboardData.correcto_difference}
            value={dashboardData.correcto_current}
            previousValue={dashboardData.correcto_previous}
          />
        </Grid>
        {/* Mixed LineColumn Chart Row */}
        <Grid container spacing={2} sx={{ margin: '1em' }}>
          <Grid item xs={11}>
            <ColumnLineChart
              data={dashboardData.mixedChartData}
              categories={dashboardData.mixedChartCategories}
              title="Tiempo y disponibilidad por tramo temporal"
            />
          </Grid>
        </Grid>

        {/* Boxplot Chart Row */}
        <Grid container spacing={2} sx={{ margin: '1em' }}>
          <Grid item xs={5}>
            <BoxplotChart
              series={dashboardData.boxplotSeries}
              categories={dashboardData.mixedChartCategories}
              title="Errores por tramo temporal"
            />
          </Grid>
          <Grid item xs={6}>
            <MirrorPlotChart
              series={dashboardData.mirrorChartData}
              categories={dashboardData.mixedChartCategories}
              title="Errores por tramo temporal"
            />
          </Grid>
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
                <Typography variant="h6">Tabla detallada</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid item>
                  {/*<Button
                    variant="contained"
                    color="secondary"
                    onClick={handleTableCompression}
                  >
                    {tableCompression} Version
                  </Button>*/}
                </Grid>
                <TestViewFullComponent
                  tests={dashboardData.groupedResultTests}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
