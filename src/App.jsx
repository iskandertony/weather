import Location from "./components/location";
import Menu from "./components/menu";
import Activity from "./components/activities";
import Info from "./components/info";
import WeatherIconSingle from "./components/icon-weather-single";
import Statistics from "./components/statistics";

function App() {
  return (
    <div className="main container">
      <div className="flower">
        <Location />
        <div className="web">
          <WeatherIconSingle />
        </div>
      </div>

      <div className="section">
        <Menu />
        <div className="flex flex-column gap-20">
          <Activity />
          <Statistics />
        </div>
        <Info />
      </div>
    </div>
  );
}

export default App;
