import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { BiImageAdd } from "react-icons/bi";
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
  const [imageURL, setImageURL] = useState("");
  const [fileName, setFileName] = useState("");

  const getNewData = (postArray) => {
    const editedArray = postArray.map((value) => {
      if (value.id === editID) {
        return {
          ...currentPost,
          updateDate: new Date(),
        };
      }
      return value;
    });
    return editedArray;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editPosts) {
      const editedPosts = getNewData(posts);
      const editedFavPosts = getNewData(favourite);
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

  const handleChange = (e) => {
    setPostInfo({ ...postInfo, [e.target.name]: e.target.value });
    editPosts &&
      setCurrentPost({ ...currentPost, [e.target.name]: e.target.value });
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
              onChange={(e) => handleChange(e)}
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
              onChange={(e) => handleChange(e)}
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
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cover Image</Form.Label>
            <Form.Control
              type="file"
              hidden
              accept="image/*"
              id="actual-btn"
              placeholder="upload file smaller than 3MB"
              onChange={({ target: { files } }) => {
                const file = files[0];
                const reader = new FileReader();
                console.log(reader.result);
                reader.onloadend = () => {
                  let fileSize = file.size;
                  if (fileSize > 1.4 * 1000000) {
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
                  setImageURL(base64String);
                  setFileName(file.name);
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
            <label className="imageUpload" htmlFor="actual-btn">
              {imageURL ? (
                <>
                  <img
                    src={`data:image/png;base64,${imageURL}`}
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "10px",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "18px",
                      color: "black",
                      padding: "10px",
                    }}
                  >
                    {fileName}
                  </p>
                </>
              ) : (
                <BiImageAdd />
              )}
            </label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hackathon Name</Form.Label>
            <Form.Control
              type="text"
              required
              name="hackathonName"
              placeholder="Enter hackathon name"
              defaultValue={editPosts && currentPost.hackathonName}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3 w-25 d-inline-block ">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              required
              name="startDate"
              placeholder="Enter start date"
              defaultValue={editPosts && currentPost.startDate}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3 mx-2 w-25 d-inline-block">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              required
              name="endDate"
              placeholder="Enter end date"
              defaultValue={editPosts && currentPost.endDate}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Github Repository</Form.Label>
            <Form.Control
              type="text"
              required
              name="github"
              placeholder="Enter github link"
              defaultValue={editPosts && currentPost.github}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Other Links</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Other links"
              name="otherLink"
              defaultValue={editPosts && currentPost.otherLink}
              onChange={(e) => handleChange(e)}
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
