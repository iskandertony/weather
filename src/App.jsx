import cloud from "./assets/img/cloud.png";
import Location from "./components/location";
import Menu from "./components/menu";
import Activity from "./components/activities";
import Statistics from "./components/statistics";
import Info from "./components/info";
function App() {
  return (
    <div className="main container">
      <div className="flower">
        <Location />
        <div className="web">
          <img src={cloud} alt="" className="img" />
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
