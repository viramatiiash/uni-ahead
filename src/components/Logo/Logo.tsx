import { LogoIcon } from "@assets/icons";
import classNames from 'classnames';
import { useNavigate } from "react-router-dom";
import styles from './Logo.module.scss';

interface LogoProp {
  logoClass?: string;
}



export const Logo: React.FC<LogoProp> = ({ logoClass }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (window.location.pathname === "/") {
      window.location.reload();
      window.scrollTo(0, 0);
    } else {
      navigate("/");
    }
  };

  return (
    <LogoIcon
      style={{ cursor: "pointer" }}
      className={classNames(styles.logo, logoClass)}
      onClick={handleNavigate}
    />
  );
};
