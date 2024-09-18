import CollectionAdd from "../../components/ui/form/CollectionAdd";
import SectionTitle from "../../components/ui/SectionTitle";

const CollectionForm = () => {
  return (
    <>
      <SectionTitle title=" Collection Add Form" />
      <div className="responsive-table-container">
        <CollectionAdd />
      </div>
    </>
  );
};

export default CollectionForm;
