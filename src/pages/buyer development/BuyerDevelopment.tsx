import BuyerDevelopmentTable from "../../components/Table/BuyerDevelopmentTable";

const BuyerDevelopment = () => {
  return (
    <>
      <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-center mb-2">
        Buyer Development cost
      </h1>
      <div className="responsive-table-container">
        <BuyerDevelopmentTable />
      </div>
    </>
  );
};

export default BuyerDevelopment;
