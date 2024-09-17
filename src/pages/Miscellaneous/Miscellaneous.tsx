import MiscellaneousTableComponent from "../../components/Table/MiscellaneousTableComponent";

const Miscellaneous = () => {
  return (
    <>
      <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-center mb-2">
        Miscellaneous
      </h1>
      <div className="responsive-table-container">
        <MiscellaneousTableComponent />
      </div>
    </>
  );
};

export default Miscellaneous;
