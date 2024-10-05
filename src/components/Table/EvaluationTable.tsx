import SectionTitle from "../ui/SectionTitle";

const EvaluationTable = ({ totalCost }: { totalCost: number }) => {
  return (
    <div>
      <SectionTitle title="Factory Evaluation Cost" />
      <div className="responsive-table-container">{totalCost}</div>
    </div>
  );
};

export default EvaluationTable;
