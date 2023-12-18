import React from 'react';
import { useState, useEffect } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField, MenuItem, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import PrintIcon from '@mui/icons-material/Print';

import dayjs from 'dayjs';

import SemiCircleGauge from 'pods/submodule-list/semi_circle_gauge_chart';
import BarChart from 'pods/submodule-list/bar_chart';
import LineChart from 'pods/submodule-list/line_chart';
import DonutChart from 'pods/submodule-list/donut_chart';
import BasicTable from 'pods/submodule-list/summary_table';

export const SubmoduleListContainer: React.FunctionComponent = () => {
  const initialStartDate = dayjs().subtract(1, 'day').toDate();
  const [selectedStartDate, setSelectedStartDate] = useState(initialStartDate);
  const initialEndDate = new Date();
  const [selectedEndDate, setSelectedEndDate] = useState(initialEndDate);

  const [refreshInterval, setRefreshInterval] = useState('None');
  const [dashboardData, setDashboardData] = useState({
    total_actual_tours: 61120,
    total_previous_tours: 80407,
    total_actual_errors: 1575,
    total_previous_errors: 1304,
    bar_tours_list: [
      'LANPROVA_DUMMY_SELENIUM',
      'HBPOR-33_Donativos',
      'LANPROVA_TEST_ICP_VOLDXP_PRO_Liferay',
      'LANPROVA_BETA_HBLO-34_MyBox_Jubilacion_Chrome',
      'LANPROVA_PSD2-01_ExtracteCompte_Firefox',
    ],
    bar_plot_list: [
      { name: 'Paso 1', data: [123, 0, 0, 0, 0] },
      { name: 'Paso 2', data: [0, 29, 141, 0, 0] },
      { name: 'Paso 3', data: [0, 0, 0, 0, 0] },
      { name: 'Paso 4', data: [0, 0, 0, 26, 23] },
      { name: 'Paso 5', data: [0, 0, 0, 0, 0] },
      { name: 'Paso 6', data: [0, 0, 0, 38, 0] },
      { name: 'Paso 7', data: [0, 4, 0, 93, 120] },
    ],
    top_5_errormsg_list: [
      'Elemento no encontrado',
      'Error Desconocido',
      'Error de posici\u00f3n',
    ],
    top_5_count_list: [{ name: 'Errores', data: [1233, 217, 125] }],
    line_dates_list: [
      '28-10-2023 22',
      '28-10-2023 23',
      '29-10-2023 00',
      '29-10-2023 01',
      '29-10-2023 02',
      '29-10-2023 03',
      '29-10-2023 04',
      '29-10-2023 05',
      '29-10-2023 06',
      '29-10-2023 07',
      '29-10-2023 08',
      '29-10-2023 09',
      '29-10-2023 10',
      '29-10-2023 11',
      '29-10-2023 13',
      '29-10-2023 14',
      '29-10-2023 15',
      '29-10-2023 16',
    ],
    line_plot_list: [
      {
        name: 'LANPROVA_BETA_HBLO-34_MyBox_Jubilacion_Chrome',
        data: [1, 8, 18, 9, 17, 9, 9, 9, 9, 8, 9, 8, 9, 8, 9, 8, 9, 0],
      },
      {
        name: 'LANPROVA_PSD2-01_ExtracteCompte_Firefox',
        data: [1, 7, 16, 7, 17, 9, 9, 7, 7, 7, 6, 8, 8, 8, 8, 9, 8, 1],
      },
      {
        name: 'LANPROVA_TEST_ICP_VOLDXP_PRO_Liferay',
        data: [1, 8, 15, 8, 16, 7, 8, 7, 8, 8, 8, 8, 7, 8, 8, 7, 8, 1],
      },
      {
        name: 'LANPROVA_DUMMY_SELENIUM',
        data: [1, 7, 14, 8, 13, 6, 7, 6, 7, 6, 6, 8, 7, 7, 6, 6, 6, 2],
      },
      {
        name: 'HBPOR-33_Donativos',
        data: [0, 1, 1, 2, 20, 6, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1],
      },
    ],
    top_8_tags_list: [
      'Robot',
      'Selenium',
      'Silk',
      'HBL',
      'BET',
      'LANPROV',
      'Firefox',
      'Chrome',
    ],
    top_8_tags_count_list: [1575, 1575, 1434, 737, 680, 636, 425, 409],
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

  const gauges = [
    {
      value: dashboardData.total_actual_tours,
      text: `${dashboardData.total_actual_tours}`,
      title: 'Ejecuciones totales',
    },
    {
      value: dashboardData.total_actual_errors,
      text: `${dashboardData.total_actual_errors}`,
      title: 'Ejecuciones con errores',
    },
  ];

  const top5_tours_bar_chart_categories = dashboardData.bar_tours_list;
  const top5_tours_bar_chart_series = dashboardData.bar_plot_list;

  const top5_erromsg_bar_chart_categories = dashboardData.top_5_errormsg_list;

  const top5_erromsg_bar_chart_series = dashboardData.top_5_count_list;

  const lineChartCategories = dashboardData.line_dates_list;

  const lineChartSeries = dashboardData.line_plot_list;

  const donutChartLabels = dashboardData.top_8_tags_list;
  const donutChartSeries = dashboardData.top_8_tags_count_list;

  const handlePrint = () => {
    window.print();
  };
  useEffect(() => {
    if (refreshInterval !== 'None') {
      const interval = setInterval(() => {
        setSelectedStartDate(initialStartDate);
        setSelectedEndDate(initialEndDate);
      }, getMillisecondsFromRefreshInterval(refreshInterval));
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);

  useEffect(() => {
    const promise = new Promise((resolve, reject) => {
      const url = `http://localhost:8000/get_dashboard/${selectedStartDate}/${selectedEndDate}`;
      fetch(url, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            const jsonObject = JSON.parse(data);
            //setDashboardData(jsonObject);
          } else {
            console.error('Error recogiendo usuarios de la base de datos');
            resolve([]);
          }
        })
        .catch((error) => {
          console.error(
            'Error recogiendo usuarios de la base de datos:',
            error
          );
          resolve([]);
        });
    });

    /*fetch(url, {
      method: 'GET',
    })
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
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="10s">10s</MenuItem>
          <MenuItem value="30s">30s</MenuItem>
          <MenuItem value="1min">1min</MenuItem>
          <MenuItem value="5min">5min</MenuItem>
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100vw',
          flexWrap: 'wrap',
        }}
      >
        {gauges.map((gauge, index) => (
          <div key={index} style={{ padding: '10px' }}>
            <SemiCircleGauge
              key={index}
              value={gauge.value}
              text={gauge.text}
              title={gauge.title}
            />
          </div>
        ))}
        <div style={{ padding: '10px' }}>
          <BarChart
            categories={top5_tours_bar_chart_categories}
            series={top5_tours_bar_chart_series}
            title="5 ejecuciones con más errores por paso"
          />
        </div>
        <div style={{ padding: '10px' }}>
          <BarChart
            categories={top5_erromsg_bar_chart_categories}
            series={top5_erromsg_bar_chart_series}
            title="Top 5 Mensajes de Error más comúnes"
          />
        </div>
        <div style={{ padding: '10px' }}>
          <LineChart
            categories={lineChartCategories}
            series={lineChartSeries}
            title="Evolución del número de errores sobre el top 5 de ejecuciones"
          />
        </div>
        <div style={{ padding: '10px' }}>
          <DonutChart
            labels={donutChartLabels}
            series={donutChartSeries}
            title="Donut Chart"
          />
        </div>
        <div>
          <BasicTable></BasicTable>
        </div>
      </div>
    </>
  );
};
