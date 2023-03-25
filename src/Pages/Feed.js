import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form, Dropdown, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import Post from "../components/Post";
import hackData from "../data";
function Feed() {
  const posts = JSON.parse(localStorage.getItem("posts"));
  const favourite = JSON.parse(localStorage.getItem("favourite"));
  const [tab, setTab] = useState("all");
  const navigate = useNavigate();
  const [whichTab, setWhichTab] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const [searchList, setSearchList] = useState();
  const [filterParam, setFilterParam] = useState("Newest");

  const handleSearch = (e) => {
    console.log("search", e.target.value);
    setIsSearch(true);
    const searchValue = e.target.value;
    const searchPosts = whichTab.filter(
      (item) => item.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    );
    setSearchList(searchPosts);
  };

  const handleFilter = (e) => {
    setFilterParam(e.target.id);
  };

  useEffect(() => {
    if (!posts) {
      localStorage.setItem("posts", JSON.stringify(hackData));
    }
  }, [posts]);

  useEffect(() => {
    const data = tab === "favourite" ? favourite : posts;
    setWhichTab(data);
  }, [tab]);

  return (
    <>
      <Banner />
      <Container className="py-4">
        <Row>
          <Col>
            <Button
              className={`tabBtn ${tab === "all" ? "selectedTab" : ""}`}
              onClick={() => {
                setTab("all");
                setIsSearch(false);
              }}
            >
              All Submissions
            </Button>
            <Button
              className={`tabBtn ${tab === "favourite" ? "selectedTab" : ""}`}
              onClick={() => {
                setTab("favourite");
                setIsSearch(false);
              }}
            >
              Favourite Submissions
            </Button>
          </Col>
          <Col md="auto">
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  onChange={(e) => handleSearch(e)}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md="auto">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {filterParam}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item id="Newest" onClick={(e) => handleFilter(e)}>
                  Newest
                </Dropdown.Item>
                <Dropdown.Item id="Oldest" onClick={(e) => handleFilter(e)}>
                  Oldest
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row className="mt-4 gx-5">
          {isSearch
            ? searchList.map((post) => {
                return (
                  <Col
                    md={4}
                    key={post.id}
                    onClick={() => navigate(`/post/${post.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <Post post={post} />
                  </Col>
                );
              })
            : whichTab &&
              whichTab
                .sort((a, b) => {
                  if (filterParam === "Oldest")
                    return a.startDate > b.startDate ? 1 : -1;
                  else return a.startDate < b.startDate ? 1 : -1;
                })
                .map((post) => {
                  return (
                    <Col
                      md={4}
                      key={post.id}
                      onClick={() => navigate(`/post/${post.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <Post post={post} />
                    </Col>
                  );
                })}
        </Row>
      </Container>
    </>
  );
}

export default Feed;
