import UserForm from "../../components/ui/form/UserForm";

const AddUser = () => {
  return (
    <>
      <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-center mb-2">
        Add User form
      </h1>
      <div>
        <UserForm />
      </div>
    </>
  );
};

export default AddUser;
