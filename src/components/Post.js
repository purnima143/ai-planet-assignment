import React from "react";
import moment from "moment";
function Post({ post }) {
  const { title, summary, updateDate, image } = post;

  return (
    <div className="post mb-4">
      <div className="postHeader mb-4">
        <img
          src={`data:image/png;base64,${image}`}
          alt=""
          className="smallPostImg"
        />
        <h4 className="px-3">{title}</h4>
      </div>
      <div>
        <p>{summary}</p>
      </div>
      <div style={{ textAlign: "right" }}>
        <span>uploaded {moment(updateDate).startOf("day").fromNow()}</span>
      </div>
    </div>
  );
}

export default Post;
