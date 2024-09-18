import FixedCostTable from "../../components/Table/FixedCostTable";
import SectionTitle from "../../components/ui/SectionTitle";

const FixedCost = () => {
  return (
    <>
      <SectionTitle title="Factory Fixed Cost Table" />
      <div className="responsive-table-container">
        <FixedCostTable />
      </div>
    </>
  );
};

export default FixedCost;
