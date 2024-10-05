import EvaluationTable from "../components/Table/EvaluationTable";
import RunningCostTable from "../components/Table/RunningCostTable";
import SectionTitle from "../components/ui/SectionTitle";

const Dashboard = () => {
  return (
    <>
      <RunningCostTable />

      <SectionTitle title="Factory Evaluation Cost" />
      <div className="responsive-table-container">
        <EvaluationTable />
      </div>
    </>
  );
};

export default Dashboard;
