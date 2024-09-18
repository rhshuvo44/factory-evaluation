import FactoryDevelopmentAdd from "../../components/ui/form/FactoryDevelopmentAdd";
import SectionTitle from "../../components/ui/SectionTitle";

const FactoryDevelopmentForm = () => {
  return (
    <>
      <SectionTitle title=" Factory Development cost" />
      <div className="responsive-table-container">
        <FactoryDevelopmentAdd />
      </div>
    </>
  );
};

export default FactoryDevelopmentForm;
