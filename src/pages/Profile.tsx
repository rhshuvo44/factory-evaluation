import { useGetMeQuery } from "../redux/features/user/userApi";

const Profile = () => {
  const { data } = useGetMeQuery(undefined);
  console.log(data.data);
  //   address
  // :
  // "Narayanganj"
  // createdAt
  // :
  // "2024-10-01T05:33:39.189Z"
  // email
  // :
  // "sarkartextile2@gmail.com"
  // isDeleted
  // :
  // false
  // name
  // :
  // "Sarkar Textile"
  // phone
  // :
  // "01788577329"
  // role
  // :
  // "admin"
  // status
  // :
  // "in-progress"
  // updatedAt
  // :
  // "2024-10-01T05:33:39.189Z"
  // username
  // :
  // "sarkar"
  // __v
  // :
  // 0
  // _id
  // :
  // "66fb89b3e9a3716fb7039ed0"
  return (
    <section className="w-72 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
      <div className="mt-6 w-fit mx-auto">
        <img
          src="../../public/favicon.ico"
          className="rounded-full w-28 "
          alt="profile picture"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-white font-bold text-2xl tracking-wide capitalize">
          {data?.data?.name}
        </h2>
        <p className="text-white">
          <span className="font-bold"> username:</span> {data?.data?.username}
        </p>
        <p className="text-white">
          <span className="font-bold"> email:</span> {data?.data?.email}
        </p>
        <p className="text-white">
          <span className="font-bold"> phone:</span> {data?.data?.phone}
        </p>
        <p className="text-white">
          <span className="font-bold"> role:</span> {data?.data?.role}
        </p>
        <p className="text-white">
          <span className="font-bold"> address:</span> {data?.data?.address}
        </p>
      </div>

      <p className="text-emerald-400 font-semibold mt-2.5">
        <span className="font-bold text-white"> status: </span>Active
      </p>

      <div className="h-1 w-full bg-black mt-8 rounded-full">
        <div className="h-1 rounded-full w-3/5 bg-[#0cc0ed] "></div>
      </div>
    </section>
  );
};

export default Profile;
