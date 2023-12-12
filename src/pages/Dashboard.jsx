import { Link } from "react-router-dom";
import { assetsPath } from "../utils/constants";



const Dashboard = () => {
  return (
    <div>
      <p>TEST ASSETS:</p>
      <img src={`${assetsPath}/vite.svg`} alt="assets_public" />
      <img src={`${assetsPath}/react.svg`} alt="assets_imported" />
      <p>Dashboard React.js</p>
      <Link to="/prova/downloads">Vai a downloads</Link>
    </div>
  );
};
export default Dashboard;
