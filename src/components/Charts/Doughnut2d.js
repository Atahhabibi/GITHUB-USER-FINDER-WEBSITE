import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import { MdPalette } from "react-icons/md";
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartComponent=({data})=>{

const chartConfigs = {
  type:  "doughnut2d" ,
  width: "100%", 
  height: "400",
  dataFormat: "json", 
  dataSource: { 
  chart: {
    caption:"Stars per Languages",
    decimals:0,
    doughnutRadius:'45%',
    showPercentValues:0,
    theme:'candy'
    },

  data:data,
  }};

  return <ReactFC {...chartConfigs} />;


}




export default ChartComponent;