import cloud from "./assets/img/cloud.png";
import Location from "./components/location";
import Menu from "./components/menu";
import Activity from "./components/activities";
import Statistics from "./components/statistics";
import Info from "./components/info";
function App() {
  return (
    <div className="main container">
      <div className="flex justify-s alignC">
        <Location />
        <div>
          <img src={cloud} alt="" className="img" />
        </div>
      </div>

      <div className="section">
        <Menu />
        <div>
          <Activity />
          <Statistics />
        </div>
        <Info />
      </div>
    </div>
  );
}

export default App;
