import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { useState } from "react";

export default function Humidity(props) {
    useEffect(() => {
        // console.log("props: ", props.humidity)
        
        var reversedData = props.humidity.reverse();
        var value_list=[], time_list=[];
        reversedData = reversedData.filter( (ele) => {
          var ele_date = new Date(ele.created_at);
          var today = new Date();
          if (ele_date.getDate() == today.getDate()) {
            value_list.push(ele.value);
            time_list.push(ele_date.getHours() + ':' + ele_date.getMinutes());
          }
        });

        // console.log("value list humidity: ", value_list)
        // console.log("time list child humidity: ", time_list)

        set_series_humidity(prev => ([{...prev, data: value_list}]))
        set_options_humidity(prev => ({...prev, xaxis: {categories: time_list}}));
    }, [props])

    const [options_humidity, set_options_humidity] = useState({
        chart: {
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
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
        title: {
          text: "Humidity",
          style: {
            fontSize: "20px",
          },
        },
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["white", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          categories: [
            "00:00",
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            "05:00",
            "06:00",
            "07:00",
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00",
          ],
          title: {
            text: "Time",
            style: {
              fontSize: "15px",
            },
          },
          abels: {
            style: {
              fontSize: "15px",
            },
          },
        },
        yaxis: {
          title: {
            text: "Humidity",
            style: {
              fontSize: "15px",
            },
          },
        //   min: 20,
        //   max: 50,
          labels: {
            style: {
              fontSize: "15px",
            },
          },
        },
        colors: [
          "#18D8D8",
          "#A9D794",
          "#46AF78",
          "#A93F55",
          "#8C5E58",
          "#2176FF",
          "#33A1FD",
          "#7A918D",
          "#BAFF29",
        ],
        dataLabels: {
          enabled: true,
          // enabledOnSeries: undefined,
          // formatter: function (val, opts) {
          //   return val;
          // },
          textAnchor: "middle",
          // distributed: false,
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: "15px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "200/500",
            colors: ["black"],
          },
          background: {
            enabled: true,
            foreColor: "#fff",
            padding: 3,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#fff",
            opacity: 0.7,
            // dropShadow: {
            //   enabled: true,
            //   top: 5,
            //   left: 5,
            //   blur: 1,
            //   color: "#000",
            //   opacity: 0.45,
            // },
          },
          // dropShadow: {
          //   enabled: false,
          //   top: 5,
          //   left: 5,
          //   blur: 1,
          //   color: "#000",
          //   opacity: 0.45,
          // },
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
        noData: {
          text: "No Data",
          align: "center",
          verticalAlign: "middle",
          offsetX: 0,
          offsetY: 0,
          style: {
            color: ["white"],
            fontSize: "20px",
            fontFamily: undefined,
          },
        },
    });
    
    const [series_humidity, set_series_humidity] = useState([
        {
          name: "Humidity (%)",
          data: [
            32, 35, 36, 35.5, 32, 33, 34, 37.5, 32, 35, 36, 35.5, 32, 33, 34, 37.5,
            32, 35, 36, 35.5, 32, 33, 35.5, 32, 37,
          ],
        },
    ]);

    return (
        <Chart
            options={options_humidity}
            series={series_humidity}
            type="line"
            width="980"
            height="400"
        />
    );
}