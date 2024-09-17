import SalaryTable from "../../components/Table/SalaryTable";

const Salary = () => {
  return (
    <>
      <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-center mb-2">
        Salary Details
      </h1>
      <div className="responsive-table-container">
        <SalaryTable />
      </div>
    </>
  );
};

export default Salary;
