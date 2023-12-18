import React from 'react';
import WordCloud from 'react-d3-cloud';
import Grid from '@mui/material/Grid';

const WordCloudChart = ({ data }) => {
  const fontSizeMapper = (word) => word.value;
  const rotate = () => Math.random() * 90;

  return (
    <Grid
      style={{ backgroundColor: 'white' }} // White background
    >
      <WordCloud
        data={data}
        height={400}
        font="Times"
        fontStyle="italic"
        fontWeight="bold"
        fontSize={(word) => 25}
        spiral="rectangular"
        //padding={5}
        random={Math.random}
      />
    </Grid>
  );
};

export default WordCloudChart;
