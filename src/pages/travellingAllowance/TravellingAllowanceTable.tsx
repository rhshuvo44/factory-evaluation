import CommonTable from "../../components/Table/CommonTable";

const TravellingAllowanceTable = () => {
  return (
    <>
      <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-center mb-2">
        Travelling Allowance
      </h1>
      <div className="responsive-table-container">
        <CommonTable />
      </div>
    </>
  );
};

export default TravellingAllowanceTable;
