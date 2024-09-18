import TravellingTable from "../../components/Table/TravellingTable";
import SectionTitle from "../../components/ui/SectionTitle";

const TravellingAllowance = () => {
  return (
    <>
      <SectionTitle title=" Travelling Allowance" />

      <div className="responsive-table-container">
        <TravellingTable />
      </div>
    </>
  );
};

export default TravellingAllowance;
