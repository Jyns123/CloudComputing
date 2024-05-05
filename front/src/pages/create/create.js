import { useState, useEffect } from "react";
import "./create.css";
import axios from "axios";
import Cookies from "js-cookie";

import back from "../../assets/chevron_right_FILL0_wght400_GRAD0_opsz24.svg";
import uploadIcon from "../../assets/upload_FILL0_wght400_GRAD0_opsz24.svg";
import closeIcon from "../../assets/close_FILL0_wght400_GRAD0_opsz24.svg";
import loadingIcon from "../../assets/sync_FILL0_wght400_GRAD0_opsz24.svg";

const apiIp = process.env.REACT_APP_API_IP;
const cloud_name = "ddlluqviq";
const cloud_key = "147727834385164";
const upload_preset = "jax1og5o";
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload?upload_preset=${upload_preset}&api_key=${cloud_key}`;

function TopBar() {
  const goBack = () => {
    window.location.href = "/discover";
  };
  return (
    <div className="topBar">
      <button className="homeButton" onClick={goBack}>
        <img className="homeImage" src={back}></img>
      </button>
    </div>
  );
}

function ImageArea({ image, setImage, apiCall }) {
  const removeImage = () => {
    setImage(null);
  };

  const handleChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(URL.createObjectURL(selectedImage));
  };

  return (
    <div className="imageArea">
      <div className="title">Event Image</div>
      <div className="imageWrapper">
        {image ? (
          <>
            <img className="uploadedImage" src={image} alt="Uploaded" />
            <button className="removeButton" onClick={removeImage}>
              <img src={closeIcon} className="removeIcon" alt="Remove" />
            </button>
          </>
        ) : (
          <>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <label htmlFor="imageInput" className="uploadButton">
              <img className="image" src={uploadIcon} alt="Upload" />
            </label>
          </>
        )}
      </div>
      <div className="createButtonWrapper">
        <button className="createButton" onClick={apiCall}>
          Create
        </button>
      </div>
    </div>
  );
}

function TagDisplayer({ selectedTags = [], setSelectedTags, setData }) {
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
    setData((prevData) => ({
      ...prevData,
      tags: isSelected
        ? [...prevData.tags, { id: tagId }]
        : prevData.tags.filter((tag) => tag.id !== tagId),
    }));
  };

  const tagCheckboxes = tags.map((tag) => (
    <label
      style={{
        background: `${tag.color}`,
      }}
      key={tag.id}
      className="tagFilter"
    >
      <input
        type="checkbox"
        value={tag.id}
        className="checkbox"
        onChange={handleTagCheckboxChange}
        checked={selectedTags.includes(tag.id)}
      />
      {tag.name}
    </label>
  ));

  return <>{tagCheckboxes}</>;
}

function CreateArea({ setIsLoading, setLoadingPhase }) {
  const [image, setImage] = useState();
  const [data, setData] = useState({
    name: "",
    city: "",
    country: "",
    date: "",
    description: "",
    tags: [],
    comments: [],
    imageUrl: "https://picsum.photos/960/540",
  });

  const isDataValid = () => {
    // Check if any of the required fields is empty
    const requiredFields = [
      "name",
      "city",
      "country",
      "date",
      "description",
      "imageUrl",
    ];
    const isEmpty = requiredFields.some((field) => !data[field]);

    if (isEmpty) {
      alert(
        "Please fill in all required fields. Image included! Tags are optional."
      );
    }

    return !isEmpty;
  };

  const postImage = async () => {
    const formData = new FormData("file", { uri: image, name: "image/jpg" });
  };

  const eventPost = async () => {
    // Check if form is complete
    if (!isDataValid()) {
      return;
    }

    // Post the image to cloudinary
    // Await url response
    setIsLoading(true);
    // Start mundongo fetch
    setLoadingPhase("mundongo");
    const eventController = `${apiIp}/api/events`;
    const fetcher = axios.create({
      baseURL: eventController,
      withCredentials: false,
      headers: { Authorization: "Bearer " + Cookies.get("token") },
    });
    fetcher
      .post(eventController, data)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        const id = response.data.id;
        window.location.href = `/event/${id}`;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="createWrapper">
        <DataArea data={data} setData={setData}></DataArea>
        <ImageArea
          image={image}
          setImage={setImage}
          apiCall={eventPost}
        ></ImageArea>
      </div>
    </>
  );
}

function DataArea({ data, setData }) {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="dataArea">
      <div className="title">Event Information</div>
      <div className="dataWrapper">
        <form className="dataForm">
          <input
            className="inputField"
            placeholder="Event Name"
            name="name"
            autoComplete="name"
            value={data.name}
            onChange={handleChange}
          />

          <input
            className="inputField"
            placeholder="City"
            name="city"
            value={data.city}
            onChange={handleChange}
          />

          <input
            className="inputField"
            placeholder="Country"
            name="country"
            autoComplete="country"
            value={data.country}
            onChange={handleChange}
          />

          <input
            className="inputField"
            name="date"
            type="date"
            value={data.date}
            onChange={handleChange}
          />
        </form>
        <form className="descriptionForm">
          <textarea
            className="inputField"
            name="description"
            id="description"
            placeholder="Write a cool description for your event here! There's a 1000 character limit."
            value={data.description}
            onChange={handleChange}
            maxLength={1000}
          />
        </form>
        <form className="tagForm">
          <div className="tagContainer">
            <TagDisplayer
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              setData={setData}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Create() {
  const [theme, setTheme] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState("");

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
  }, []);

  return (
    <div className={`body create${theme === "light" ? "" : " dark"}`}>
      <div className="appWrapper">
        <div className="contentWrapper">
          <div className="content">
            <TopBar />
            <CreateArea
              setIsLoading={setIsLoading}
              setLoadingPhase={setLoadingPhase}
            />
            {isLoading ? <LoadingScreen loadingPhase={loadingPhase} /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingScreen({ loadingPhase }) {
  const cloudinaryMessages = [
    "Uploading photo to Cloudinary...",
    "Sending image to Cloudinary...",
    "Uploading that nice photo...",
    "Hey, that's a nice photo!",
    "I wish I could take photos like that...",
  ];
  const mundongoMessages = [
    "Uploading event data...",
    "Sending event data...",
    "Sending data by pigeon...",
    "Giving floppy disk to the api...",
    "I hope this doesn't crash.",
    "Definitely not Lorem Ipsum...",
  ];
  const finishedMessages = [
    "Done! Redirecting...",
    "Event uploaded! Redirecting...",
    "Your event was created! Redirecting...",
    "Heh, it didn't crash after all.",
    "Achievement Get: How did we get here?",
  ];

  const getRandomElement = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const [loadingMessage, setLoadingMessage] = useState("");

  useEffect(() => {
    if (loadingPhase === "cloudinary") {
      setLoadingMessage(getRandomElement(cloudinaryMessages));
    } else if (loadingPhase === "mundongo") {
      setLoadingMessage(getRandomElement(mundongoMessages));
    } else if (loadingPhase === "finished") {
      setLoadingMessage(getRandomElement(finishedMessages));
    } else {
      setLoadingMessage("Hey, you forgot to set the loadingPhase.");
    }
  }, []);

  return (
    <div className="loadingScreen">
      <div className="animatedContainer">
        <img className="loadingIcon" src={loadingIcon}></img>
        <span className="text">{loadingMessage}</span>
      </div>
    </div>
  );
}

// Hacer esta página me quitó 4 años de vida

// De verdad que no se imaginan

// el estrés

// te odio cloudinary

// Quiero vacaciones

// Debería haber una semana de vacas después de parciales

// Que nos quiten dos semanas de verano pero quiero vacas después de parciales
