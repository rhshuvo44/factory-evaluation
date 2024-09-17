import Evaluation from "../components/Table/Evaluation";
import RunningCostTable from "../components/Table/RunningCostTable";
import SectionTitle from "../components/ui/SectionTitle";

const Dashboard = () => {
  return (
    <>
      <SectionTitle title="Factory Running Cost" />
      <div className="responsive-table-container">
        <RunningCostTable />
      </div>
      <SectionTitle title="Factory Evaluation Cost" />
      <div className="responsive-table-container">
        <Evaluation />
      </div>
    </>
  );
};

export default Dashboard;
