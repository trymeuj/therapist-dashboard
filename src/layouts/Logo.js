import { ReactComponent as LogoDark } from "../assets/images/logos/svar.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <LogoDark style={{ width: "150px", height: "auto" }} />
    </Link>
  );
};

export default Logo;
