import FactoryDevelopmentTable from "../../components/Table/FactoryDevelopmentTable";
import SectionTitle from "../../components/ui/SectionTitle";

const FactoryDevelopment = () => {
  return (
    <>
      <SectionTitle title=" Factory Development cost" />
      <div className="responsive-table-container">
        <FactoryDevelopmentTable />
      </div>
    </>
  );
};

export default FactoryDevelopment;
