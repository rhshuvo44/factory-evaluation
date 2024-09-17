import TravellingTable from "../../components/Table/TravellingTable";

const TravellingAllowance = () => {
  return (
    <>
      <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-center mb-2">
        Travelling Allowance
      </h1>

      <div className="responsive-table-container">
        <TravellingTable />
      </div>
    </>
  );
};

export default TravellingAllowance;
