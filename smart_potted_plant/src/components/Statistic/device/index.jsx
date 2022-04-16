import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { useState } from "react";

export default function Device(props) {
    useEffect(() => {
        var ledStatus = props.ledStatus.map(ele => ele);
        var pumpStatus = props.pumpStatus.map(ele => ele);
        var count_led = new Array(13).fill(0);  // each element is count number for each month (except index 0)
        var count_pump = new Array(13).fill(0);
        var today = new Date();
        ledStatus.filter( (ele) => {
          if (ele.value == 1) {
            var ele_date = new Date(ele.created_at);
            if (ele_date.getFullYear() == today.getFullYear()) {
              count_led[ele_date.getMonth() + 1]++;
            }
            return ele_date.getFullYear() == today.getFullYear();
          }
        })
        pumpStatus.filter( (ele) => {
          if (ele.value == 1) {
            var ele_date = new Date(ele.created_at);
            if (ele_date.getFullYear() == today.getFullYear()) {
              count_pump[ele_date.getMonth() + 1]++;
            }
            return ele_date.getFullYear() == today.getFullYear();
          }
        })

        // console.log("count_led: ", count_led);
        // console.log("count_pump: ", count_pump);

        set_series_device(prev => ( [{...prev, data: count_led.slice(1)}, {...prev, data: count_pump.slice(1)}] ));
    }, [props])

    const [options_device, set_device] = useState({
        chart: {
          stacked: true,
          toolbar: {
            show: true,
            tools: {
              download: false,
            },
          },
          zoom: {
            enabled: true,
          },
          foreColor: "white",
        },
    
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
          },
        },
        dataLabels: {
          enabled: true,
          textAnchor: "middle",
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: "15px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "200/500",
            colors: ["white"],
          },
          background: {
            enabled: false,
            foreColor: "#fff",
            padding: 3,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#fff",
            opacity: 0.7,
          },
        },
        tooltip: {
          enabled: true,
          enabledOnSeries: undefined,
          shared: true,
          followCursor: true,
          intersect: false,
          inverseOrder: false,
          custom: undefined,
          fillSeriesColor: false,
          theme: "dark",
          style: {
            fontSize: "13px",
          },
          onDatasetHover: {
            highlightDataSeries: true,
          },
          x: {
            show: true,
            format: "dd MMM",
            formatter: undefined,
          },
          y: {
            formatter: undefined,
            title: {
              formatter: (seriesName) => seriesName,
            },
          },
          z: {
            formatter: undefined,
            title: "Size: ",
          },
          marker: {
            show: true,
          },
          items: {
            display: "flex",
          },
          fixed: {
            enabled: false,
            position: "topRight",
            offsetX: 0,
            offsetY: 0,
          },
        },
        color: ["white"],
        xaxis: {
          // type: 'datetime',
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          title: {
            text: "Month",
            style: {
              fontSize: "15px",
            },
          },
          labels: {
            style: {
              fontSize: "15px",
            },
          },
        },
    
        yaxis: {
          title: {
            text: "Number",
            style: {
              fontSize: "15px",
            },
          },
          labels: {
            style: {
              fontSize: "15px",
            },
          },
        },
        colors: ["#2176FF", "#18D8D8"],
        legend: {
          position: "right",
          offsetY: 40,
          fontSize: "14px",
        },
    });
    
    const [series_device, set_series_device] = useState([
        {
          name: "Bulb",
          data: [44, 55, 41, 67, 22, 43, 67, 22, 43, 67, 22, 43],
        },
        {
          name: "Pump water",
          data: [13, 23, 20, 8, 13, 27, 67, 22, 43, 67, 22, 43],
        },
    ]);

    return (
        <Chart
            options={options_device}
            series={series_device}
            type="bar"
            width="900"
            height="400"
        />
    );
}