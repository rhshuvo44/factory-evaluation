import LoanAdd from "../../components/ui/form/LoanAdd";
import SectionTitle from "../../components/ui/SectionTitle";

const LoanForm = () => {
  return (
    <>
      <SectionTitle title=" Loan Return" />
      <div className="responsive-table-container">
        <LoanAdd />
      </div>
    </>
  );
};

export default LoanForm;
