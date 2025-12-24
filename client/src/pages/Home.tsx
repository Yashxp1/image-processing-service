import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Homes = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <Button onClick={() => navigate("/upload")}>Get started</Button>
    </div>
  );
};

export default Homes;
