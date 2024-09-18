import LoanTable from "../../components/Table/LoanTable";
import SectionTitle from "../../components/ui/SectionTitle";

const Loan = () => {
  return (
    <>
      <SectionTitle title=" Loan Return" />
      <div className="responsive-table-container">
        <LoanTable />
      </div>
    </>
  );
};

export default Loan;
