import { FaHorseHead, FaSmile } from "react-icons/fa";

function UserList({ users }) {
  console.log(users);
  return (
    <div className="userlist-container">
      {users?.map((user) => (
        <li key={user.id}>
          {user.role == "user" ? (
            <FaHorseHead></FaHorseHead>
          ) : (
            <FaSmile></FaSmile>
          )}
          <p>{user.name}</p>
        </li>
      ))}
    </div>
  );
}

export default UserList;
