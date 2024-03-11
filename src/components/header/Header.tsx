import { FC } from "react";
import { ComponentProps } from "../../interfaces/route.interface";

interface HeaderProps extends ComponentProps {
  title: string;
}

const headerStyle = {
  backgroundColor: "#f1f1f1",
  fontSize: "18px",
  fontWeight: "500",
};

const Header: FC<HeaderProps> = ({ title, message }) => {
  console.log(`${message} Header`);
  return (
    <div className="mb-5" style={headerStyle}>
      <div className="pt-3 pb-3 text-center">{title}</div>
    </div>
  );
};

export default Header;
