import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./event.css";
import loadingIcon from "../../assets/sync_FILL0_wght400_GRAD0_opsz24.svg";
import backButton from "../../assets/chevron_right_FILL0_wght400_GRAD0_opsz24.svg";
import noComments from "../../assets/sentiment_neutral_FILL0_wght400_GRAD0_opsz24.svg";

const apiIp = process.env.REACT_APP_API_IP;

function fetchEventData({ id, setEventData }) {
  const apiUrl = `${apiIp}/api/events/${id}`;
  const fetcher = axios.create({
    baseURL: apiUrl,
    withCredentials: false,
  });
  fetcher
    .get(apiUrl)
    .then((response) => {
      setEventData(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function LoadingScreen() {
  return (
    <div className="loadingScreen">
      <img className="loadingIcon" src={loadingIcon} />
      <span>Loading...</span>
    </div>
  );
}

export default function Event() {
  const { id } = useParams();
  const [theme, setTheme] = useState();
  const [eventData, setEventData] = useState(); // Fetched event data to display

  function setDarkTheme() {
    console.log("set Dark");
    setTheme("dark");
    localStorage.setItem("theme", "dark");
  }

  function setLightTheme() {
    console.log("set Light");
    setTheme("light");
    localStorage.setItem("theme", "light");
  }

  function themeSwitcher() {
    const storedTheme = localStorage.getItem("theme");
    switch (storedTheme) {
      case "dark": {
        setDarkTheme();
        break;
      }
      default: {
        setLightTheme();
        break;
      }
    }
  }

  useEffect(() => {
    themeSwitcher();
    fetchEventData({ id, setEventData });
  }, []);

  return (
    <div className={`body event${theme === "light" ? "" : " dark"}`}>
      <div className="appWrapper">
        <div className="contentWrapper">
          {eventData ? (
            <PageContent eventData={eventData} />
          ) : (
            <LoadingScreen />
          )}
        </div>
      </div>
    </div>
  ); // Wait until content is loaded
}

function PageContent({ eventData }) {
  const goHome = () => {
    window.location.href = "/discover";
  };

  return (
    <div className="content">
      <div className="dataWrapper">
        <div className="banner">
          <img className="displayImage" src={eventData.imageUrl} />
          <div className="bannerContent">
            <div className="mainInfoDisplay">
              <div className="titleAndTags">
                <div className="left">
                  <span className="title">{eventData.name}</span>
                  <span className="title">
                    {eventData.city}, {eventData.country}
                  </span>
                </div>
                <div className="right">
                  <div className="dateWrapper">
                    <span className="title">{eventData.date}</span>
                  </div>
                  <div
                    className="tagWrapper"
                    style={
                      eventData.tags.length === 0 ? {} : { marginTop: "2vmin" }
                    }
                  >
                    <TagDisplayer tags={eventData.tags} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bannerInput">
              <button className="homeButton" onClick={goHome}>
                <img className="homeImage" src={backButton}></img>
              </button>
            </div>
          </div>
        </div>
        <div className="basicInfoWrapper">
          <div className="description">
            <span>{eventData.description}</span>
          </div>
        </div>
      </div>
      <CommentSection eventData={eventData} />
    </div>
  );
}

function CommentSection({ eventData }) {
  const [written, setWritten] = useState("");
  const [sent, setSent] = useState(false);

  const postComment = async () => {
    if (!written) {
      alert("Comment must have something written inside of it!");
      return;
    }
    setSent(true);

    const eventController = `${apiIp}/api/events/${eventData.id}/addcomment`;

    const fetcher = axios.create({
      baseURL: eventController,
      withCredentials: false,
    });

    const displayName = localStorage.getItem("displayName");

    fetcher
      .patch(eventController, {
        content: written,
        author: displayName,
      })
      .then((response) => {
        console.log(response.data);
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        setSent(false);
      });
  };

  const handleChange = (event) => {
    setWritten(event.target.value);
  };

  return (
    <div className="commentsWrapper">
      <div className="writeWrapper">
        <div className="left">
          <textarea
            className="inputField"
            placeholder="Write your comment here!"
            maxLength={1000}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="right">
          <button
            className="uploadButton"
            onClick={sent ? null : postComment}
            style={sent ? { opacity: 0.5 } : {}}
          >
            <span className="title">UPLOAD</span>
          </button>
        </div>
      </div>
      <div className="userComments">
        <span className="title">User Comments</span>
        <div className="content">
          {eventData.comments.length !== 0 ? (
            <CommentFetcher comments={eventData.comments} />
          ) : (
            <NoComments />
          )}
        </div>
      </div>
    </div>
  );
}

function NoComments() {
  return (
    <div className="noComments">
      <img src={noComments} className="image"></img>
      <span>It's kinda empty in here...</span>
    </div>
  );
}

function CommentFetcher({ comments }) {
  const commentDivs = comments.map((comment) => (
    <div key={comment.id} className="comment">
      <span className="commentDate">Posted at: {comment.date}</span>
      <span className="commentDate">{comment.author} says:</span>
      <span className="commentText">{comment.content}</span>
    </div>
  ));
  return <>{commentDivs}</>;
}

function TagDisplayer({ tags }) {
  const tagDivs = tags.map((tag) => (
    <div
      style={{
        background: `${tag.color}`,
      }}
      key={tag.id}
      className="tag"
    >
      {tag.name}
    </div>
  ));
  return <>{tagDivs}</>;
}
