import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import hackData from "../data";
function CreateForm() {
  const navigate = useNavigate();
  const { editID } = useParams();
  const [postInfo, setPostInfo] = useState({
    id: "",
    title: "",
    summary: "",
    description: "",
    hackathonName: "",
    otherLink: "",
    github: "",
    startDate: "",
    endDate: "",
    image: "",
  });
  const posts = JSON.parse(localStorage.getItem("posts")) || hackData;
  const favourite = JSON.parse(localStorage.getItem("favourite")) || [];

  const editPosts = posts.filter((item) => item.id === editID)[0];
  const [currentPost, setCurrentPost] = useState(editPosts);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editPosts) {
      const editedPosts = posts.map((value) => {
        if (value.id === editID) {
          return {
            ...currentPost,
            updateDate: new Date(),
          };
        }
        return value;
      });
      const editedFavPosts = favourite.map((value) => {
        if (value.id === editID) {
          return {
            ...currentPost,
            updateDate: new Date(),
          };
        }
        return value;
      });
      localStorage.setItem("posts", JSON.stringify(editedPosts));
      localStorage.setItem("favourite", JSON.stringify(editedFavPosts));

      navigate(`/post/${editID}`);
    } else {
      const newdata = {
        ...postInfo,
        id: uuidv4(),
        updateDate: new Date(),
        date: new Date(),
      };
      let newPostList = [...posts, newdata];
      localStorage.setItem("posts", JSON.stringify(newPostList));
      navigate("/");
    }
  };

  return (
    <Container className="createForm">
      <div className="formBox">
        <h3 className="mb-4">
          {!editID ? "New Hackathon Form" : "Edit Hackathon Form"}
        </h3>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              required
              name="title"
              defaultValue={editPosts && currentPost.title}
              placeholder="Enter Title"
              onChange={(e) => {
                setPostInfo({ ...postInfo, title: e.target.value });
                editPosts &&
                  setCurrentPost({ ...currentPost, title: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              type="text"
              name="summary"
              required
              placeholder="Enter Summary"
              defaultValue={editPosts && currentPost.summary}
              onChange={(e) => {
                setPostInfo({ ...postInfo, summary: e.target.value });
                editPosts &&
                  setCurrentPost({ ...currentPost, summary: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              required
              type="text"
              placeholder="Description"
              name="description"
              defaultValue={editPosts && currentPost.description}
              onChange={(e) => {
                setPostInfo({ ...postInfo, description: e.target.value });
                editPosts &&
                  setCurrentPost({
                    ...currentPost,
                    description: e.target.value,
                  });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cover Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              placeholder="upload file smaller than 3MB"
              onChange={({ target: { files } }) => {
                const file = files[0];
                const reader = new FileReader();
                console.log(reader.result);
                reader.onloadend = () => {
                  // convert file to base64 String
                  let fileSize = file.size; // 3MB

                  if (fileSize > 1.4 * 1000000) {
                    // fileSize > 5MB then show popup message
                    alert(
                      `File size is too large, please upload image of size less than 2MB.\nSelected File Size: ${
                        fileSize / 1000000
                      }MB only`
                    );
                    return;
                  }
                  const base64String = reader.result
                    .replace("data:", "")
                    .replace(/^.+,/, "");
                  // store file
                  setPostInfo({
                    ...postInfo,
                    image: base64String,
                  });
                  editPosts &&
                    setCurrentPost({
                      ...editPosts,
                      image: base64String,
                    });
                };
                reader.readAsDataURL(file);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hackathon Name</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter hackathon name"
              defaultValue={editPosts && currentPost.hackathonName}
              onChange={(e) => {
                setPostInfo({ ...postInfo, hackathonName: e.target.value });
                editPosts &&
                  setCurrentPost({
                    ...editPosts,
                    hackathonName: e.target.value,
                  });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3 w-25 d-inline-block ">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              required
              placeholder="Enter start date"
              defaultValue={editPosts && currentPost.startDate}
              onChange={(e) => {
                setPostInfo({ ...postInfo, startDate: e.target.value });
                editPosts &&
                  setCurrentPost({ ...currentPost, startDate: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3 mx-2 w-25 d-inline-block">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              required
              placeholder="Enter end date"
              defaultValue={editPosts && currentPost.endDate}
              onChange={(e) => {
                setPostInfo({ ...postInfo, endDate: e.target.value });
                editPosts &&
                  setCurrentPost({ ...currentPost, endDate: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Github Repository</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter github link"
              defaultValue={editPosts && currentPost.github}
              onChange={(e) => {
                setPostInfo({ ...postInfo, github: e.target.value });
                editPosts &&
                  setCurrentPost({ ...currentPost, github: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Other Links</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Other links"
              defaultValue={editPosts && currentPost.otherLink}
              onChange={(e) => {
                setPostInfo({ ...postInfo, otherLink: e.target.value });
                editPosts &&
                  setCurrentPost({ ...currentPost, otherLink: e.target.value });
              }}
            />
          </Form.Group>
          <hr />
          <Button variant="primary" type="submit">
            {editPosts ? "Save Submission" : "Upload Submission"}
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default CreateForm;
