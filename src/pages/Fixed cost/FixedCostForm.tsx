import FixedCostAdd from "../../components/ui/form/FixedCostAdd";
import SectionTitle from "../../components/ui/SectionTitle";

const FixedCostForm = () => {
  return (
    <>
      <SectionTitle title=" Factory Fixed Cost Add" />
      <div className="responsive-table-container">
        <FixedCostAdd />
      </div>
    </>
  );
};

export default FixedCostForm;
