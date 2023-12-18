import React from 'react';
import { useState, useEffect } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
  TextField,
  MenuItem,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PrintIcon from '@mui/icons-material/Print';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import dayjs from 'dayjs';

import SemiCircleGauge from 'pods/submodule-list/semi_circle_gauge_chart';
import BarChart from 'pods/submodule-list/bar_chart';
import LineChart from 'pods/submodule-list/line_chart';
import DonutChart from 'pods/submodule-list/donut_chart';
import BasicTable from 'pods/submodule-list/summary_table';
import HorizontalBarChart from './horizontal_bar_chart';
import StatCard from './stat_card';

export const SubmoduleListContainer: React.FunctionComponent = () => {
  const initialStartDate = dayjs().subtract(1, 'day').toDate();
  const [selectedStartDate, setSelectedStartDate] = useState(initialStartDate);
  const initialEndDate = new Date();
  const [selectedEndDate, setSelectedEndDate] = useState(initialEndDate);

  const [refreshInterval, setRefreshInterval] = useState('30000');
  const [dashboardData, setDashboardData] = useState({
    total_errors_names: ['Sin error', 'Con error'],
    total_errors_list: [0, 0],
    bar_enviroments_list: ['Selenium'],
    bar_enviroments_values_list: [{ data: [0] }],
    total_number_errors_stat: 0,
    total_number_inactive_stat: 0,
    by_enviroment_donut_chart_data: [
      { Selenium: { 'Sin error': 0, 'Con error': 0 } },
    ],
    by_tag_donut_chart_data: [
      { Robot: { 'Sin error': 0, 'Con error': 0 } },
      { Selenium: { 'Sin error': 0, 'Con error': 0 } },
      { Silk: { 'Sin error': 0, 'Con error': 0 } },
      { LANPROV: { 'Sin error': 0, 'Con error': 0 } },
      { BET: { 'Sin error': 0, 'Con error': 0 } },
      { Chrome: { 'Sin error': 0, 'Con error': 0 } },
      { HBL: { 'Sin error': 0, 'Con error': 0 } },
      { Jubilacion: { 'Sin error': 0, 'Con error': 0 } },
    ],
    bar_robots_list: [
      'RobotSeleniumSilk40',
      'RobotSeleniumSilk28',
      'RobotSeleniumPlantillaNuevaCaixa',
      'RobotSeleniumSilk33',
      'RobotSeleniumSilk2',
    ],
    bar_robots_values_list: [{ data: [0, 0, 0, 0, 0] }],
    by_robot_donut_chart_data: [
      { RobotSeleniumSilk40: { 'Sin error': 0, 'Con error': 0 } },
      { RobotSeleniumSilk28: { 'Sin error': 0, 'Con error': 9 } },
      {
        RobotSeleniumPlantillaNuevaCaixa: {
          'Sin error': 0,
          'Con error': 0,
        },
      },
      { RobotSeleniumSilk33: { 'Sin error': 0, 'Con error': 0 } },
      { RobotSeleniumSilk2: { 'Sin error': 0, 'Con error': 0 } },
    ],
  });

  const StyledDateTimePicker = styled(DateTimePicker)({
    marginLeft: '5px',
  });

  const handleRefreshIntervalChange = (event) => {
    setRefreshInterval(event.target.value);
    // Aquí puedes realizar las acciones correspondientes al cambio de intervalo de actualización
  };
  const handleEndDateChange = (newEndDate) => {
    if (dayjs(newEndDate).isBefore(selectedStartDate)) {
      return;
    }
    setSelectedEndDate(newEndDate);
  };
  /*
  // ---- APARTADO 1: ESTADO GENERAL
  // GRAFICA 1: Donut Chart
  const generalStateDonutChartLabels = dashboardData.total_errors_names;
  const generalStateDonutChartSeries = dashboardData.total_errors_list;

  // GRAFICA 2: Diagarama de barras horizontal
  const top3_enviroments_bar_chart_categories =
    dashboardData.bar_enviroments_list;
  const top3_enviroments_bar_chart_series =
    dashboardData.bar_enviroments_values_list;

  // GRAFICA 3: Stat de erroes
  const total_stat_error = dashboardData.total_number_errors_stat;

  // GRAFICA 4: Stat de inactivos
  const total_stat_inactive = dashboardData.total_number_inactive_stat;

  // ---- APARTADO 2: ESTADO POR ENTORNOS

  const by_enviroment_donut_chart_list =
    dashboardData.by_enviroment_donut_chart_data.flatMap((item) =>
      Object.entries(item).map(([name, values]) => ({
        tags: Object.keys(values),
        values_list: Object.values(values),
        name: name,
      }))
    );

  // ---- APARTADO 3: ESTADO POR TAGS

  const by_tag_donut_chart_list = dashboardData.by_tag_donut_chart_data.flatMap(
    (item) =>
      Object.entries(item).map(([name, values]) => ({
        tags: Object.keys(values),
        values_list: Object.values(values),
        name: name,
      }))
  );

  // ---- APARTADO 4: OTROS

  const top3_robots_bar_chart_categories = dashboardData.bar_robots_list;
  const top3_robots_bar_chart_series = dashboardData.bar_robots_values_list;

  const by_robot_donut_chart_list =
    dashboardData.by_robot_donut_chart_data.flatMap((item) =>
      Object.entries(item).map(([name, values]) => ({
        tags: Object.keys(values),
        values_list: Object.values(values),
        name: name,
      }))
    );
*/
  const handlePrint = () => {
    window.print();
  };
  /*useEffect(() => {
    if (refreshInterval !== 'None') {
      const interval = setInterval(() => {
        setSelectedStartDate(initialStartDate);
        setSelectedEndDate(initialEndDate);
      }, getMillisecondsFromRefreshInterval(refreshInterval));
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);*/

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:8000/get_dashboard/`;

      const response = await fetch(url);
      const json = await response.json();
      setDashboardData(json);
    };

    fetchData(); // Fetch data initially

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 2 minutes
    }, parseInt(refreshInterval));

    return () => clearInterval(intervalId);

    /*const promise = new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setDashboardData(data);
          } else {
            console.error('Error recogiendo datos de la base de datos');
            resolve([]);
          }
        })
        .catch((error) => {
          console.error('Error recogiendo datos de la base de datos:', error);
          resolve([]);
        });
    });*/

    /*fetch(url, {
      method: 'GET',
    })
      .then((response) => console.log(response.json()))
      .catch((error) => {
        console.error('Error recogiendo usuarios de la base de datos:', error);
      });*/
  }, []);

  const getMillisecondsFromRefreshInterval = (interval) => {
    switch (interval) {
      case '10s':
        return 10000;
      case '30s':
        return 30000;
      case '1min':
        return 60000;
      case '5min':
        return 300000;
      default:
        return 60000; // Default value of 1 minute
    }
  };

  return (
    <>
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', padding: '1em' }}
      >
        <TextField
          select
          label="Refresh"
          value={refreshInterval}
          onChange={handleRefreshIntervalChange}
          style={{ minWidth: 120, marginRight: '5px' }}
        >
          <MenuItem value="10000">10s</MenuItem>
          <MenuItem value="30000">30s</MenuItem>
          <MenuItem value="60000">1min</MenuItem>
          <MenuItem value="300000">5min</MenuItem>
        </TextField>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StyledDateTimePicker
            label="Fecha Inicio"
            value={selectedStartDate}
            onChange={setSelectedStartDate}
            maxDate={selectedEndDate}
            inputFormat="DD/MM/YYYY hh:mm A"
            renderInput={(params) => <TextField {...params} />}
            style={{ marginRight: '5px', minWidth: 120 }}
          />
          <StyledDateTimePicker
            label="Fecha Fin"
            value={selectedEndDate}
            onChange={handleEndDateChange}
            minDate={selectedStartDate}
            maxDate={new Date()}
            inputFormat="DD/MM/YYYY hh:mm A"
            style={{ marginRight: '5px', minWidth: 120 }}
            renderInput={(params) => <TextField {...params} />}
          />
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginLeft: '5px', minWidth: 120 }}
            onClick={handlePrint}
          >
            <Typography style={{ marginRight: '5px' }}>Imprimir</Typography>{' '}
            <PrintIcon color="secondary"></PrintIcon>
          </Button>
        </LocalizationProvider>
      </div>
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Estado General</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: '#f3f3f3' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100vw',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ padding: '10px' }}>
              <DonutChart
                labels={dashboardData.total_errors_names}
                series={dashboardData.total_errors_list}
                title="En ejecución"
              />
            </div>
            <div style={{ padding: '10px' }}>
              <HorizontalBarChart
                categories={dashboardData.bar_enviroments_list}
                series={dashboardData.bar_enviroments_values_list}
                title="Top 3 entornos"
              />
            </div>
            <div style={{ padding: '10px' }}>
              <StatCard
                title="Con errores:"
                value={dashboardData.total_number_errors_stat}
                stat_color="#ff6366"
              ></StatCard>
            </div>
            <div style={{ padding: '10px' }}>
              <StatCard
                title="Inactivos:"
                value={dashboardData.total_number_inactive_stat}
                stat_color="#ffd299"
              ></StatCard>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Estado Por Entornos</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: '#f3f3f3' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100vw',
              flexWrap: 'wrap',
            }}
          >
            {dashboardData.by_enviroment_donut_chart_data
              .flatMap((item) =>
                Object.entries(item).map(([name, values]) => ({
                  tags: Object.keys(values),
                  values_list: Object.values(values),
                  name: name,
                }))
              )
              .map((donut_chart, index) => (
                <div key={index} style={{ padding: '10px' }}>
                  <DonutChart
                    labels={donut_chart.tags}
                    series={donut_chart.values_list}
                    title={donut_chart.name}
                  />
                </div>
              ))}
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Estado Por Tags (Top 8)</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: '#f3f3f3' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100vw',
              flexWrap: 'wrap',
            }}
          >
            {dashboardData.by_tag_donut_chart_data
              .flatMap((item) =>
                Object.entries(item).map(([name, values]) => ({
                  tags: Object.keys(values),
                  values_list: Object.values(values),
                  name: name,
                }))
              )
              .map((donut_chart, index) => (
                <div key={index} style={{ padding: '10px' }}>
                  <DonutChart
                    labels={donut_chart.tags}
                    series={donut_chart.values_list}
                    title={donut_chart.name}
                  />
                </div>
              ))}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Otros</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: '#f3f3f3' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100vw',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ padding: '10px' }}>
              <HorizontalBarChart
                categories={dashboardData.bar_robots_list}
                series={dashboardData.bar_robots_values_list}
                title="Top 3 Robots"
              />
            </div>
            {dashboardData.by_robot_donut_chart_data
              .flatMap((item) =>
                Object.entries(item).map(([name, values]) => ({
                  tags: Object.keys(values),
                  values_list: Object.values(values),
                  name: name,
                }))
              )
              .map((donut_chart, index) => (
                <div key={index} style={{ padding: '10px' }}>
                  <DonutChart
                    labels={donut_chart.tags}
                    series={donut_chart.values_list}
                    title={donut_chart.name}
                  />
                </div>
              ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
