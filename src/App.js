import "./App.css";
import { Route, Routes } from "react-router-dom";
import Feed from "./Pages/Feed";
import PostPage from "./Pages/PostPage";
import CreateForm from "./Pages/CreateForm";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/*" element=<Feed /> />
        <Route path="/post/:postID" element=<PostPage /> />
        <Route path="/add" element=<CreateForm /> />
        <Route path="/edit/:editID" element=<CreateForm /> />
      </Routes>
    </>
  );
}

export default App;
