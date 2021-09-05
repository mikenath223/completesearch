import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSearch } from "store/slices/searchSlice";
import debounce from "lodash.debounce";
import { Input, List, Avatar, Alert, Space, Typography, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Modal from "components/Modal";
import Card from "components/Card";
import CardWithContent from "components/CardWithContent";
import "./style.css";

export default function Home() {
  const searchResult = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [lastElement, setLastElement] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemContent, setItemContent] = useState({});

  useEffect(() => {
    dispatch(getSearch({ name: "rick" }));
  }, [dispatch]);

  useEffect(() => {
    input && dispatch(getSearch({ name: input }));
  }, [input, dispatch]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const debouncedChange = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  const observer = useMemo(
    () =>
      new IntersectionObserver((entries) => {
        const [first] = entries;
        if (first.isIntersecting) {
          const nextPageUrl = searchResult?.data?.info?.next;
          nextPageUrl && dispatch(getSearch({ nextPageUrl }));
        }
      }),
    [dispatch, searchResult?.data?.info?.next]
  );

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement, observer]);

  const handleCloseModal = () => setIsModalVisible(false);

  const handleShowMoreContent = (item) => {
    setItemContent(item);
    setIsModalVisible(true);
  };

  return (
    <div className="search-container">
      <h1 className="search-headtext">Rick and Morty Search</h1>
      <Input
        prefix={
          <SearchOutlined
            style={{ color: "#ADB9CC", fontSize: "14px" }}
            className="searchicon"
          />
        }
        placeholder="Search for contact"
        size="large"
        style={{ backgroundColor: "#FFF", padding: "1rem" }}
        bordered={false}
        onChange={debouncedChange}
      />
      {searchResult.error ? (
        <Alert
          message="Invalid query"
          description={searchResult.error}
          type="error"
          showIcon
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={searchResult.data?.results}
          loading={searchResult.loading}
          className="list-container"
          renderItem={(item, i) => (
            <div
              key={item.id}
              ref={(r) =>
                i === searchResult.data.results.length - 1 && setLastElement(r)
              }
              onClick={() => handleShowMoreContent(item)}
            >
              <Card className="card-list">
                <List.Item
                  className="list-item"
                  style={{ paddingLeft: "1rem" }}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.image} />}
                    title={<span className="list-name">{item.name}</span>}
                  />
                  <Space className="item-spacer">
                    <div
                      className={`icon-circle ${
                        item.status === "Alive" && "icon-circle-alive"
                      }`}
                    />
                    <Typography>{`${item.status} - ${item.species}`}</Typography>
                  </Space>
                </List.Item>
              </Card>
            </div>
          )}
        >
          <div className="loadmore-container">
            {searchResult?.data?.info?.next && <Spin />}
            {!searchResult?.data?.info?.next && !searchResult.loading && (
              <Typography.Text>No more Content</Typography.Text>
            )}
          </div>
        </List>
      )}
      <Modal visible={isModalVisible} onCancel={handleCloseModal}>
        <CardWithContent {...itemContent} />
      </Modal>
    </div>
  );
}
