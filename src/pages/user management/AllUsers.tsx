import UserTable from "../../components/Table/UserTable";

const AllUsers = () => {
  return (
    <>
      <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-center mb-2">
        All Users
      </h1>

      <div className="responsive-table-container">
        <UserTable />
      </div>
    </>
  );
};

export default AllUsers;
