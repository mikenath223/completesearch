import { Card as AntCard } from "antd";
import "./style.css";

const Card = ({ children, ...props }) => {
  return (
    <AntCard bordered={false} {...props}>
      {children}
    </AntCard>
  );
}

export default Card;