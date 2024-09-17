import UtilityTable from "../../components/Table/UtilityTable";
import SectionTitle from "../../components/ui/SectionTitle";

const Utility = () => {
  return (
    <>
      <SectionTitle title="Utility Table" />

      <div className="responsive-table-container">
        <UtilityTable />
      </div>
    </>
  );
};

export default Utility;
