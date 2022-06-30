import React, { useEffect, useState } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';
import axios from 'axios';
var Component = React.Component;
var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function TypographyPage() {
  // const [data2, setData] = useState([]);
  var data2 = [];
  const [data,setData]=useState([]);

  let hashmap = new Map([
    ['01', 'January'],
    ['02', 'February'],
    ['03', 'March'],
    ['04', 'April'],
    ['05', 'May'],
    ['06', 'June'],
    ['07', 'July'],
    ['08', 'August'],
    ['09', 'September'],
    ['10', 'October'],
    ['11', 'November'],
    ['12', 'December'],
  ]);

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token,
      },
    };
    axios
      .get('http://localhost:5000/api/screentime/timeline', config)
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          const d = res.data[i].date;
          const s = d.split('/');
          // console.log('s ', s);
          //let k = hashmap.get(s[1]);
          //s[1] = k;
          let temp = s[0];
          s[0] = s[1];
          s[1] = temp;
          let final = s.join(' ');
          let x1=parseInt(s[0]);
          let x2=parseInt(s[1]);
          let x3=parseInt(s[2]);
          console.log('s ',s);
          let y = res.data[i].hour * 60 + res.data[i].minute;
          let o = {
            x: new Date(`${final}`),
            y: y,
          };
          data2.push(o);

          setData((prevState) => [...prevState,o]);

          // console.log(final);
        }

        console.log('----', data2);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const options = {
    theme: 'light2',
    animationEnabled: true,
    exportEnabled: true,
    responsive: true,
    maintainAspectRatio: false,
    title: {
      text: 'Time Spent on Paathshala',
    },
    axisX: {
      valueFormatString: "DD-MMM"
    },
    axisY: {
      title: 'Time in minutes',
    },
    data: [
      {
        type: 'area',
        xValueFormatString: 'DD MMMM YYYY',
        // yValueFormatString: '#,##0.## Minutes',
        dataPoints:
        data
        // [
          // { x: new Date(`March ${9} , 2021`), y: 2.6 },
          // { x: new Date(2015, 0), y: 5.4 },
          // { x: new Date(2014, 0), y: 1.3 },
          // { x: new Date(2013, 0), y: 4.5 },
          // { x: new Date(2012, 0), y: 2.9 },
          // { x: new Date(2011, 0), y: 3.2 },
        // ],
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}
