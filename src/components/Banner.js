import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Bulb from "../assets/bulb.png";
function Banner() {
  const navigate = useNavigate();
  return (
    <div className="banner">
      <Container>
        <Row>
          <Col md={8}>
            <h1 style={{ fontWeight: "bold" }} className="mb-3">
              Hackathon Submission
            </h1>
            <p
              style={{ fontSize: "17px", lineHeight: "26px" }}
              className="me-4"
            >
              Lorem ipsum dolor sit amet consectetur. Urna cursus amet
              pellentesque in parturient purus feugiat faucibus. Congue laoreet
              duis porta turpis eget suspendisse ac pharetra amet. Vel nisl
              tempus nec vitae.
            </p>
            <Button
              className="btn mt-4"
              onClick={() => {
                navigate("/add");
              }}
            >
              Upload Submission
            </Button>
          </Col>
          <Col md="auto">
            <img src={Bulb} alt="" height={290} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Banner;
