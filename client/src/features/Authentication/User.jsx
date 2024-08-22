import useAuth from "../../hooks/useAuth";

function User() {
  const { user } = useAuth();
  console.log(user);

  return <div>{user && <img src={user.avatar} />}</div>;
}

export default User;
