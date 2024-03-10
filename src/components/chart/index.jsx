import React from "react";
import { observer } from "mobx-react";
import { Chart, Line, Point, Tooltip, Axis } from "bizcharts";
import { weatherStoreWeek } from "../../store/weather-week";
import { Spin } from "antd";
import "./style.scss";

const TemperatureChart = observer(() => {
  const { weatherData } = weatherStoreWeek;
  const isMobile = window.innerWidth < 480;
  // Проверяем, загружены ли данные
  if (!weatherData || !weatherData.list) {
    return <Spin />;
  }
  if (isMobile) return;

  // Трансформация данных о погоде для графика
  const data = weatherData.list
    .map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      temperature: Math.round(item.main.temp),
      windSpeed: item.wind.speed,
    }))
    .slice(0, 8);

  const scale = {
    temperature: { alias: "Temperature (°C)" },
    windSpeed: { alias: "Wind Speed (km/h)" },
    time: { alias: "Time" },
  };

  return (
    <Chart scale={scale} padding="auto" autoFit data={data}>
      <Point
        position="time*temperature"
        size={4}
        style={{ fill: "#ffffff", stroke: "#fff" }}
      />
      <Line shape="smooth" position="time*temperature" />
      <Line shape="smooth" position="time*windSpeed" color="#FFC355" />
      <Tooltip shared showCrosshairs />
      <Axis
        name="time"
        title={{
          style: {
            fill: "#ffffff", // цвет текста
          },
        }}
        label={{
          style: {
            fill: "#ffffff", // цвет текста
          },
        }}
      />
      <Axis
        name="temperature"
        title={{
          style: {
            fill: "#ffffff", // цвет текста
          },
        }}
        label={{
          style: {
            fill: "#ffffff", // Белый цвет текста для скорости ветра
            // Прочие стили если нужно
          },
        }}
      />
      <Axis
        name="windSpeed"
        title={{
          style: {
            fill: "#ffffff", // цвет текста
          },
        }}
        label={{
          style: {
            fill: "#ffffff", // Белый цвет текста для скорости ветра
            // Прочие стили если нужно
          },
        }}
      />
    </Chart>
  );
});

export default TemperatureChart;
