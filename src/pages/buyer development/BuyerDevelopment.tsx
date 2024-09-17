import BuyerDevelopmentTable from "../../components/Table/BuyerDevelopmentTable";
import SectionTitle from "../../components/ui/SectionTitle";

const BuyerDevelopment = () => {
  return (
    <>
      <SectionTitle title=" Buyer Development cost" />
      <div className="responsive-table-container">
        <BuyerDevelopmentTable />
      </div>
    </>
  );
};

export default BuyerDevelopment;
