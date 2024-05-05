import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import "./discover.css";
import arrow from "../../assets/chevron_right_FILL0_wght400_GRAD0_opsz24.svg";
import profile from "../../assets/person_FILL0_wght400_GRAD0_opsz24.svg";
import errorImage from "../../assets/image_FILL0_wght400_GRAD0_opsz24.svg";
import XD from "../../assets/sentiment_very_dissatisfied_FILL0_wght400_GRAD0_opsz24.svg";
import bocchi from "./therock.jpg";
import dawg from "./dawg.png";
import Cookies from "js-cookie";
import vineBoom from "./vineBoom.mp3";
import filterImage from "../../assets/filter_list_FILL0_wght400_GRAD0_opsz24.svg";

const apiIp = process.env.REACT_APP_API_IP;

function CollapseButton({ onClick, status }) {
  return (
    <button className="collapseButton" onClick={onClick}>
      <img
        // className={status ? "collapseImage" : "collapseImage rotated"}
        src={filterImage}
      />
    </button>
  );
}

function UserBar({ themeSwitcherInput }) {
  const [collapsed, setCollapsed] = useState(false);

  function collapse() {
    setCollapsed(!collapsed);
  }

  function logOut() {
    Cookies.remove("token");
    window.location.href = "/access";
  }

  function createPost() {
    window.location.href = "/create";
  }

  const barClass = collapsed ? "userBar userBarCollapsed" : "userBar";
  return (
    <div className={barClass}>
      <div className="userOptions">
        <button className="userLink" onClick={createPost}>
          Create
        </button>
        <button className="userLink" onClick={themeSwitcherInput}>
          Theme
        </button>
        <button className="dark userLink logoutLink" onClick={logOut}>
          Log Out
        </button>
      </div>
      <button className="userButton" onClick={collapse}>
        <img className="userAvatar" src={dawg}></img>
      </button>
    </div>
  );
}

function TagCreator({ tagData }) {
  const tags = [];
  for (let i = 0; i < tagData.length; ++i) {
    var currentTag = tagData[i];
    tags.push(
      <span
        key={i}
        className="tag"
        style={{ background: `${currentTag.color}` }}
      >
        {currentTag.name}
      </span>
    );
  }
  return <>{tags}</>;
}

function Card({ data, cardClick }) {
  return (
    <div className="card" onClick={cardClick}>
      <div className="text">
        <span className="name">{data.name}</span>
        <span className="location">
          {data.city}, {data.country}
        </span>
      </div>
      <div className="thumbnail">
        <img
          className="image"
          src={data.imageUrl}
          onError={(e) => (e.target.src = errorImage)}
        />
      </div>
      <div className="tags">
        <TagCreator tagData={data.tags} />
      </div>
    </div>
  );
}

function CardCreator({ searchQuery, selectedTags }) {
  const apiUrl = `${apiIp}/api/events/nocomments`;
  const [items, setItems] = useState([]);

  const fetcher = axios.create({
    baseURL: apiUrl,
    withCredentials: false,
  });

  useEffect(() => {
    const fetchCards = async () => {
      const searchUrl = searchQuery
        ? `${apiUrl}/${encodeURIComponent(searchQuery)}`
        : apiUrl;

      try {
        const response = await fetcher.get(searchUrl);
        setItems(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCards();
  }, [searchQuery, selectedTags]);

  if (items.length === 0) {
    return <EmptySearch />;
  } // Early return if text query doesn't find anything

  const filteredItems = items.filter((item) =>
    selectedTags.length === 0
      ? true
      : selectedTags.every((tagId) => item.tags.some((tag) => tag.id === tagId))
  ); // Uses tags to filter, if no tags are selected then anything goes

  if (filteredItems.length === 0) {
    return <EmptySearch />;
  } // Return if tag filter doesn't find anything either

  const createRows = () => {
    const cardsPerRow = 3;
    const rows = [];
    for (let i = 0; i < filteredItems.length; i += cardsPerRow) {
      const row = (
        <div key={i} className="cardRow">
          {filteredItems.slice(i, i + cardsPerRow).map((item) => (
            <Card
              key={item.id}
              data={item}
              cardClick={() => {
                console.log(item.id);
                window.location.href = `/event/${item.id}`;
              }}
            />
          ))}
        </div>
      );
      rows.push(row);
    }
    return rows;
  };

  return <>{createRows()}</>;
}

function EmptySearch() {
  return (
    <div className="emptySearch">
      <img className="image" src={XD} />
      <span>No events found!</span>
    </div>
  );
}

export default function Discover() {
  const [collapsedBar, setCollapse] = useState(false);
  const [theme, setTheme] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

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

  function themeSwitcherInput() {
    if (theme === "dark") {
      setLightTheme();
    } else {
      setDarkTheme();
    }
  }

  function showBar() {
    setCollapse(!collapsedBar);
    console.log("Set left collapsed status to " + !collapsedBar);
    const playSound = () => {
      const audio = new Audio(vineBoom);
      audio.play();
    };
    playSound();
  }

  useEffect(() => themeSwitcher(), []);

  return (
    <div className={`body discover${theme === "light" ? "" : " dark"}`}>
      <div className="appWrapper">
        <div className="contentWrapper">
          <div className="content">
            <div className={collapsedBar ? "left" : "left leftClosed"}>
              <TagDisplayer setSelectedTags={setSelectedTags} />
            </div>
            <div className="right">
              <div className="top">
                <CollapseButton
                  onClick={() => showBar()}
                  status={collapsedBar}
                />
                <SearchBar setSearchQuery={setSearchQuery} />
                <UserBar themeSwitcherInput={themeSwitcherInput} />
              </div>
              <div className="cardContainer">
                <CardCreator
                  searchQuery={searchQuery}
                  selectedTags={selectedTags}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchBar({ setSearchQuery }) {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <input
      className="searchBar"
      placeholder="Start typing to search for cool stuff!"
      name="searchBar"
      onChange={handleInputChange}
    ></input>
  );
}

function TagDisplayer({ setSelectedTags }) {
  const apiUrl = `${apiIp}/api/tags`;
  const [tags, setTags] = useState([]);

  const fetcher = axios.create({
    baseURL: apiUrl,
    withCredentials: false,
  });
  useEffect(() => {
    fetcher
      .get()
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleTagCheckboxChange = (event) => {
    const tagId = parseInt(event.target.value, 10);
    const isSelected = event.target.checked;

    if (isSelected) {
      setSelectedTags((prevSelectedTags) => [...prevSelectedTags, tagId]);
    } else {
      setSelectedTags((prevSelectedTags) =>
        prevSelectedTags.filter((id) => id !== tagId)
      );
    }
  };

  const tagCheckboxes = tags.map((tag) => (
    <label
      style={{
        background: `${tag.color}`,
        marginBottom: "1vmin",
        padding: "0 2vmin",
        borderRadius: "5vmin",
        display: "flex",
        alignItems: "center",
        color: "white",
      }}
      key={tag.id}
      className="tagFilter"
    >
      <input
        type="checkbox"
        value={tag.id}
        className="checkbox"
        onChange={handleTagCheckboxChange}
      />
      {tag.name}
    </label>
  ));
  return (
    <div className="filterWrapper">
      <span className="title">Tags</span>
      <div className="tagContainer">{tagCheckboxes}</div>
    </div>
  );
}
