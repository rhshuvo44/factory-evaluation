import UtilityTable from "../../components/Table/UtilityTable";

const Utility = () => {
  return (
    <>
      <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-center mb-2">
        Utility Table
      </h1>

      <div className="responsive-table-container">
        <UtilityTable />
      </div>
    </>
  );
};

export default Utility;
