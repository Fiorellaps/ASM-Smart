import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TestEntity } from './test-list.vm';
import { TestListFullComponent } from './test-list.component_full';
import { TestListLiteComponent } from './test-list.component_lite';

import { getTestCollection } from './test-list.repository';

import { useSnackbarContext } from 'common/components';
import { trackPromise } from 'react-promise-tracker';
import { mapTestCollectionFromApiToVm } from './test-list.mappers';
import { routes } from 'core/router';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';

import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  CardHeader,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PrintIcon from '@mui/icons-material/Print';

const editEmployeeId = '0';
const StyledDateTimePicker = styled(DateTimePicker)({
  marginLeft: '5px',
});

export const TestListContainer: React.FunctionComponent = () => {
  const initialStartDate = dayjs().subtract(1, 'day').toDate();
  const [selectedStartDate, setSelectedStartDate] =
    React.useState(initialStartDate);
  const initialEndDate = new Date();

  const [selectedEndDate, setSelectedEndDate] = React.useState(initialEndDate);
  const [refreshInterval, setRefreshInterval] = React.useState('30000');

  const [tests, setTests] = React.useState<TestEntity[]>([
    {
      name: 'Selenium',
      data: [
        {
          idTest: '263',
          porcentajeCorrecto: '100%',
          totalCorrecto: 171,
          totalError: 0,
          total: 171,
          fechaCalculo: '2023-11-05T22:41:00',
          activo: true,
          fechaUltimaEjecucion: '2023-11-05T22:34:39',
          duracionUltimaEjecucion: '10.17',
          tags: [
            'BET',
            'HBL',
            'Fitxers',
            'Firefox',
            'Robot',
            'Selenium',
            'Silk',
            'BPI',
          ],
          nombreTest: 'BETA_HBLO-02_Fitxers_Firefox',
          nombreRobot: 'RobotSeleniumSilkBPI',
          errorUltimaEjecucion: true,
        },
      ],
    },
    {
      name: 'Web',
      data: [
        {
          idTest: '263',
          porcentajeCorrecto: '100%',
          totalCorrecto: 171,
          totalError: 0,
          total: 171,
          fechaCalculo: '2023-11-05T22:41:00',
          activo: true,
          fechaUltimaEjecucion: '2023-11-05T22:34:39',
          duracionUltimaEjecucion: '10.17',
          tags: [
            'BET',
            'HBL',
            'Fitxers',
            'Firefox',
            'Robot',
            'Selenium',
            'Silk',
            'BPI',
          ],
          nombreTest: 'BETA_HBLO-02_Fitxers_Firefox',
          nombreRobot: 'RobotSeleniumSilkBPI',
          errorUltimaEjecucion: true,
        },
        {
          idTest: '263',
          porcentajeCorrecto: '100%',
          totalCorrecto: 171,
          totalError: 0,
          total: 171,
          fechaCalculo: '2023-11-05T22:41:00',
          activo: true,
          fechaUltimaEjecucion: '2023-11-05T22:34:39',
          duracionUltimaEjecucion: '10.17',
          tags: [
            'BET',
            'HBL',
            'Fitxers',
            'Firefox',
            'Robot',
            'Selenium',
            'Silk',
            'BPI',
          ],
          nombreTest: 'BETA_HBLO-02_Fitxers_Firefox',
          nombreRobot: 'RobotSeleniumSilkBPI',
          errorUltimaEjecucion: true,
        },
      ],
    },
  ]);

  const [tableCompression, setTableCompression] = React.useState('Lite');
  const { showMessage } = useSnackbarContext();
  const navigate = useNavigate();
  const handleTableCompression = () => {
    if (tableCompression == 'Full') {
      setTableCompression('Lite');
    } else {
      setTableCompression('Full');
    }
  };
  const handleEndDateChange = (newEndDate) => {
    if (dayjs(newEndDate).isBefore(selectedStartDate)) {
      return;
    }
    setSelectedEndDate(newEndDate);
  };

  const handlePrint = () => {
    window.print();
  };
  React.useEffect(() => {
    getTestCollection().then((testDetail) => setTests(testDetail)); //initial

    const intervalId = setInterval(() => {
      getTestCollection().then((testDetail) => setTests(testDetail));
    }, parseInt(refreshInterval));

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <Card>
        <CardContent>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h2">Resumen de Tests</Typography>
            </Grid>
            <Grid item></Grid>
            <Grid item>
              <Typography variant="subtitle1">Nombre Test:</Typography>

              <TextField label="Nombre Test" variant="outlined" />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">Tags:</Typography>
              <TextField label="Tags" variant="outlined" />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">Entornos:</Typography>

              <TextField label="Entornos" variant="outlined" />
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item>
                <Typography variant="subtitle1">Inicio</Typography>

                <DateTimePicker
                  value={selectedStartDate}
                  onChange={setSelectedStartDate}
                  maxDate={selectedEndDate}
                  inputFormat="DD/MM/YYYY hh:mm A"
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">Fin</Typography>

                <DateTimePicker
                  value={selectedEndDate}
                  onChange={handleEndDateChange}
                  minDate={selectedStartDate}
                  maxDate={new Date()}
                  inputFormat="DD/MM/YYYY hh:mm A"
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </LocalizationProvider>
          </Grid>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            marginTop={'2em'}
          >
            <Grid item>
              <Button variant="contained" color="primary">
                Enviar Filtros
              </Button>
            </Grid>
            <Grid item>
              <TextField
                select
                label="Refresh"
                value={refreshInterval}
                style={{ minWidth: 120, marginRight: '5px' }}
              >
                <MenuItem value="10000">10s</MenuItem>
                <MenuItem value="30000">30s</MenuItem>
                <MenuItem value="60000">1min</MenuItem>
                <MenuItem value="300000">5min</MenuItem>
              </TextField>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleTableCompression}
              >
                {tableCompression} Version
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <>
        {' '}
        {tests.map((entry, index) => {
          return (
            <Accordion
              sx={{ marginBottom: '1em' }}
              defaultExpanded={index == 0}
            >
              <AccordionSummary
                sx={{ backgroundColor: '#f3f3f3' }}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="h6">Entorno: {entry.name}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: '#f3f3f3' }}>
                {tableCompression === 'Lite' ? (
                  <TestListFullComponent
                    tests={entry.data}
                    nombreEntorno="Sel"
                  />
                ) : (
                  <TestListLiteComponent
                    tests={entry.data}
                    nombreEntorno="Sel"
                  />
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </>
    </>
  );
};
