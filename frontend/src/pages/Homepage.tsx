import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Homepage</h1>
      <button onClick={()=>navigate("/login")}> Login</button>
    </div>
  );
};
export default Homepage;
