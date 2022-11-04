import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import { MdPalette } from "react-icons/md";
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartComponent=({data})=>{

const chartConfigs = {
  type:  "column3d" ,
  width: "100%", 
  height: "400",
  dataFormat: "json", 
  dataSource: { 
  chart: {
    caption:"Most Popular",
    yaxisname:'Stars',
    xaxisname:'Repos',
    xaxisnameFontSize:'16px',
    yaxisnameFontSize:'16px',
   
    },

  data:data,
  }};

  return <ReactFC {...chartConfigs} />;


}




export default ChartComponent;