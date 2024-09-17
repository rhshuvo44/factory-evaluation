import MiscellaneousTableComponent from "../../components/Table/MiscellaneousTableComponent";
import SectionTitle from "../../components/ui/SectionTitle";

const Miscellaneous = () => {
  return (
    <>
     
      <SectionTitle title=" Miscellaneous" />
      
      <div className="responsive-table-container">
        <MiscellaneousTableComponent />
      </div>
    </>
  );
};

export default Miscellaneous;
