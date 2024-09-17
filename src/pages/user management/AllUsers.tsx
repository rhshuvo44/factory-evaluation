import UserTable from "../../components/Table/UserTable";
import SectionTitle from "../../components/ui/SectionTitle";

const AllUsers = () => {
  return (
    <>
      <SectionTitle title="All Users Data" />

      <div className="responsive-table-container">
        <UserTable />
      </div>
    </>
  );
};

export default AllUsers;
