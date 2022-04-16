import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { useState } from "react";

export default function SoilMoisture(props) {
    useEffect(() => {
        // console.log("props: ", props.soilMoisture)

        var reversedData = props.soilMoisture.map(ele => ele).reverse();
        var value_list=[], time_list=[];
        reversedData = reversedData.filter( (ele) => {
          var ele_date = new Date(ele.created_at);
          var today = new Date();
          if (ele_date.getDate() == today.getDate()) {
            value_list.push(ele.value);
            time_list.push(ele_date.getHours() + ':' + ele_date.getMinutes());
          }
        });

        // console.log("value list soil moisture: ", value_list)
        // console.log("time list child soil moisture: ", time_list)

        set_series_soil_moisture(prev => ([{...prev, data: value_list}]))
        set_soil_moisture(prev => ({...prev, xaxis: {categories: time_list}}));
    }, [props])

    const [options_soil_moisture, set_soil_moisture] = useState({
        chart: {
          toolbar: {
            show: true,
            tools: {
              download: false,
              selection: false,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true | '<img src="/static/icons/reset.png" width="20">',
              customIcons: [],
            },
          },
          zoom: {
            enabled: true,
          },
          foreColor: "white",
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
          textAnchor: "middle",
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
          labels: {
            style: {
              fontSize: "15px",
            },
          },
        },
        yaxis: {
          title: {
            text: "Soil moisture",
            style: {
              fontSize: "15px",
            },
          },
          labels: {
            style: {
              fontSize: "15px",
            },
          },
        //   min: 20,
        //   max: 800,
        },
    });
    
    const [series_soil_moisture, set_series_soil_moisture] = useState([
        {
          name: "Soil moisture (%)",
          data: [
            32, 35, 36, 35.5, 32, 33, 34, 37.5, 32, 35, 36, 35.5, 32, 33, 34, 37.5,
            32, 35, 36, 35.5, 32, 33, 35.5, 32, 37,
          ],
        },
    ]);

    return (
        <Chart
            options={options_soil_moisture}
            series={series_soil_moisture}
            type="line"
            width="980"
            height="400"
        />
    );
}