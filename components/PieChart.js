import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {VictoryPie} from 'victory-native';


const PieChart = (props) => {
  
  const graphicColor = ['#2979FF', '#00C853', '#ff5252']; // Colors
  const wantedGraphicData = [
    {x: ' ', y: Number(props.active)},
    {x: ' ', y: Number(props.recovered)},
   {x: ' ', y: Number(props.decreased)},
  ]; // Data that we want to display
  //const defaultGraphicData = [
    //{x: ' ', y: 0},
    //{x: ' ', y: 0},
   //{x: ' ', y: 100},
  //]; // Data used to make the animate prop work
  const [graphicData, setGraphicData] = useState(wantedGraphicData);
  
  //useEffect(() => {
    //setGraphicData(wantedGraphicData); // Setting the data that we want to display
  //}, [graphicData]);

  return (
    <View>
      <VictoryPie
        animate={{easing: 'exp'}}
        data={graphicData}
        width={140}
        height={140}
        colorScale={graphicColor}
        innerRadius={70}
      />
    </View>
  );
};

export default PieChart;
