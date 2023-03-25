import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  AiOutlineStar,
  AiFillStar,
  AiTwotoneCalendar,
  AiFillGithub,
} from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { BsTrash, BsPencil } from "react-icons/bs";
import moment from "moment";
function PostPage() {
  const { postID } = useParams();
  const navigate = useNavigate();
  const [isStarred, setStarred] = useState(false);
  const posts = JSON.parse(localStorage.getItem("posts"));
  const favourite = JSON.parse(localStorage.getItem("favourite")) || [];
  const newData = posts.filter((ele) => ele.id === postID);
  const {
    title,
    summary,
    description,
    hackathonName,
    startDate,
    endDate,
    github,
    otherLink,
    image,
    date,
    id,
  } = newData[0];
  const handleDelete = () => {
    const updatedPosts = posts.filter((item) => item.id !== postID);
    const updatedFavPosts = favourite.filter((item) => item.id !== postID);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    localStorage.setItem("favourite", JSON.stringify(updatedFavPosts));

    navigate("/");
  };
  const handleFavourite = () => {
    setStarred(true);
    let newFavList = [...favourite, newData[0]];
    const uniqueFavourite = [
      ...new Map(newFavList.map((item) => [item.id, item])).values(),
    ];
    localStorage.setItem("favourite", JSON.stringify(uniqueFavourite));
    navigate("/");
  };
  return (
    <div>
      <div className="banner">
        <Container>
          <Row>
            <Col>
              <div className="hackHeader">
                <img
                  src={`data:image/png;base64,${image}`}
                  alt="post"
                  className="postImage"
                />

                <h1 style={{ fontWeight: "bold" }} className="mx-4">
                  {title}
                </h1>
              </div>

              <div className="hackTagline mt-4">
                <p
                  style={{ fontSize: "17px", lineHeight: "26px" }}
                  className="me-4"
                >
                  {summary}
                </p>
              </div>
              <div className="hackFooter">
                <Button
                  className="btn m-0 p-2 starBtn"
                  onClick={handleFavourite}
                  style={{ fontSize: "33px" }}
                >
                  {isStarred ? <AiFillStar /> : <AiOutlineStar />}
                </Button>
                <div className="verticleLine"></div>
                <Button className="btn dateBtn m-2 py-1">
                  <AiTwotoneCalendar /> {moment(date).format(" Do MMM")}
                </Button>
              </div>
            </Col>
            <Col md={2}>
              <Button
                className="btn blueBtn m-2"
                onClick={() => navigate(`/edit/${id}`)}
              >
                <BsPencil /> Edit
              </Button>
              <Button className="btn blueBtn m-2" onClick={handleDelete}>
                <BsTrash /> Delete
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="my-4 py-2">
        <Row>
          <Col md={8}>
            <h4>Description</h4>
            <p>{description}</p>
          </Col>
          <Col className="px-4">
            <h6>Hackathon</h6>
            <h4>{hackathonName}</h4>
            <p>
              <AiTwotoneCalendar /> {moment(startDate).format(" Do MMM YYYY")} -{" "}
              {moment(endDate).format(" Do MMM YYYY")}
            </p>
            <Link className="btn whiteBtn mt-4" to={github}>
              <AiFillGithub /> GitHub Repository
            </Link>
            <Link className="btn whiteBtn mt-4" to={otherLink}>
              <FiExternalLink /> Other Links
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PostPage;
