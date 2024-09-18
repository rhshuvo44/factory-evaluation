import SalaryTable from "../../components/Table/SalaryTable";
import SectionTitle from "../../components/ui/SectionTitle";

const Salary = () => {
  return (
    <>
      <SectionTitle title=" Salary Details" />

      <div className="responsive-table-container">
        <SalaryTable />
      </div>
    </>
  );
};

export default Salary;
