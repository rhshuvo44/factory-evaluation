import SalaryAddForm from "../../components/ui/form/SalaryAddForm";

const SalaryForm = () => {
  return (
    <>
      <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-center mb-2">
        Miscellaneous form
      </h1>
      <div>
        <SalaryAddForm />
      </div>
    </>
  );
};

export default SalaryForm;
