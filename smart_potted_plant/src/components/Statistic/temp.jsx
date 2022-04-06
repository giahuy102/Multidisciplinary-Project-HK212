const [options_temp, set_options_temp] = useState({
    stroke: {
      width: [0, 1],
    },
    title: {
      text: "Temperature",
      style: {
        fontSize: "20px",
      },
    },
    labels: [
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
    xaxis: {
      type: { format: "hh:ss" },
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
    yaxis: [
      {
        title: {
          text: "Temperature",
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
    ],
    grid: {
      show: true,
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
    chart: {
      foreColor: "white",
      
    },
    plotOptions: {
      bar: {
        borderRadius: 7,
      },
    },
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
    forecastDataPoints: {
      count: 5,
      fillOpacity: 0.5,
      strokeWidth: undefined,
      dashArray: 4,
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