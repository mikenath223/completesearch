import { Image, Space, Divider, Typography, Row, Col } from "antd";
import Card from "components/Card";
import "./style.css";

const CardWithContent = ({
  image,
  name,
  status,
  species,
  gender,
  origin: { name: originName },
  location: { name: locationName },
  ...props
}) => {
  const rowsInfo = [
    [
      { title: "Gender", info: gender },
      { title: "Location", info: locationName },
    ],
    [
      { title: "Species", info: species },
      { title: "Origin", info: originName },
    ],
  ];

  const rows = rowsInfo.map((row) => {
    return row.map(({ title, info }) => {
      return (
        <Col span={12} key={`${title}-${info}`}>
          <Typography.Text type="secondary">{title}</Typography.Text>
          <br />
          <Typography.Text strong>{info}</Typography.Text>
        </Col>
      );
    });
  });

  return (
    <Card {...props} className="card-wrapper">
      <Space align="center" size="large" className="top-card-modal">
        <Image
          className="card-image"
          src={image}
          width={100}
          preview={false}
          alt={name}
        />
        <Space direction="vertical">
          <Typography.Title level={4}>{name}</Typography.Title>
          <Space>
            <div
              className={`icon-circle icon-circle-modal ${
                status === "Alive" && "icon-circle-alive"
              }`}
            />
            <Typography>{`${status} - ${species}`}</Typography>
          </Space>
        </Space>
      </Space>
      <hr className="divider"/>
      <Row align="middle" justify="space-around" gutter={[10, 15]}>
        {rows}
      </Row>
    </Card>
  );
};

export default CardWithContent;
