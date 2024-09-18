import CollectionTable from "../../components/Table/CollectionTable";
import SectionTitle from "../../components/ui/SectionTitle";

const Collection = () => {
  return (
    <>
      <SectionTitle title=" Collection Table" />
      <div className="responsive-table-container">
        <CollectionTable />
      </div>
    </>
  );
};

export default Collection;
