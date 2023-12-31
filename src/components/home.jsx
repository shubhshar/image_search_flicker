import React, { useState, useEffect } from "react";
import "./home.css";
import Img from "../assets/img.png";
import { fetchData } from "../services/api";
import LoadingSpinner from "../utility/LoadingSpinner";
import ImageModal from "./imageModal";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const [photoArr, setPhotoArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMoretoShow, setHasMoretoShow] = useState(true);
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [suggestedQueries, setSuggestedQueries] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const savedQueries = localStorage.getItem("savedQueries");
    if (savedQueries) {
      setSuggestedQueries(JSON.parse(savedQueries));
    }
  }, [searchVal]);

  const handleOpenModal = (photos) => {
    setSelectedImage(photos);
    setShowModal(true);
  };
  const handleClose = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };

  const getData = async () => {
    try {
      let imageData;
      if (searchVal) {
        imageData = await fetchData(page, 20, searchVal);
      } else {
        imageData = await fetchData(page, 20);
      }
      const newImageArr = imageData.photos.photo;
      setPhotoArr((prevImageArr) => [...prevImageArr, ...newImageArr]);
      setPage((prevPage) => prevPage + 1);
      setHasMoretoShow(imageData.photos.page < imageData.photos.pages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  const handleClicksearch = () => {
    if (searchVal) {
      setPhotoArr([]);
      getData();
    }
  };
  const handleClearsearch = () => {
    setSearchVal("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClicksearch();
      handleSaveSearch();
    }
  };
  const handleSaveSearch = () => {
    if(searchVal){
    const updatedQueries = [...suggestedQueries, searchVal];
    if(updatedQueries.length <= 6){
    setSuggestedQueries(updatedQueries);
    localStorage.setItem("savedQueries", JSON.stringify(updatedQueries));
    }
  }
    setSearchVal("");
   
  };
  const handlesavedQueries = (query) => {
    setSearchVal(query);
  };

  const deleteSavedQuery = (index) => {
    const savedQueries = JSON.parse(localStorage.getItem('savedQueries'));
    if (savedQueries) {
      savedQueries.splice(index, 1);
      localStorage.setItem('savedQueries', JSON.stringify(savedQueries));
    }
    
  };

  return (
    <>
      {showModal && (
        <ImageModal
          show={showModal}
          selectedImage={selectedImage}
          handleClose={handleClose}
        />
      )}
      <div className="home-container">
        <div className={`container ${showModal ? "blur" : " "}`}>
          <div className="container-header">
            <div className="container-header-logo">
              <img
                src={Img}
                alt="Logo"
                onClick={() => window.location.reload()}
              />
            </div>
            <div className="container-header-search">
              <div className="search-box">
                <p className="searchbox-label">
                  Discover and Explore with Image Search
                </p>
                <div className="searchbox-searchboxicon">
                  <input
                    type="text"
                    placeholder="type here..."
                    value={searchVal}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={handleKeyDown}
                  />

                  <button
                    onClick={() => handleClearsearch()}
                    className="clearSearch"
                  >
                    <i className="fa fa-times"></i>
                  </button>
                  <button
                    className="searchicon"
                    onClick={() => {
                      handleClicksearch();
                      handleSaveSearch();
                    }}
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
              {
                <div className="suggested-queries">
                  {suggestedQueries.map((query, index) => (
                    <span
                      key={index}
                      className="query-tag"
                      onClick={() => handlesavedQueries(query)}
                    >
                      {query}
                      <span  key={index}>
                      <button  className="suggestionClose" onClick={()=>deleteSavedQuery()}>
                        <i className="fa fa-times"></i>
                      </button>
                      </span>
                    </span>
                  ))}
                </div>
              }
            </div>
          </div>
          <div className="container-content">
            <div className="card-container">
              <div>
                <InfiniteScroll
                  dataLength={photoArr.length}
                  next={getData}
                  hasMore={hasMoretoShow}
                  loader={<p style={{ textAlign: "center" }}>Loading...</p>}
                  endMessage={
                    <p style={{ textAlign: "center" }}>Thats all folks!.</p>
                  }
                >
                  {photoArr.map((photos, id) => (
                    <div className="cards" key={id}>
                      <div className="card-img">
                        {isLoading ? (
                          <LoadingSpinner />
                        ) : (
                          <img
                            src={`https://live.staticflickr.com/${photos.server}/${photos.id}_${photos.secret}.jpg`}
                            alt="Images"
                            onClick={() => handleOpenModal(photos)}
                          />
                        )}
                      </div>
                      <div className="card-title"></div>
                    </div>
                  ))}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
