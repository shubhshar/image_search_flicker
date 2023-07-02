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

  const handleOpenModal = (photos) => {
    setSelectedImage(photos);
    setShowModal(true);
  };
  const handleClose = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  const getData = async () => {
    try {
      const imageData = await fetchData(page, 20);
      const newImageArr = imageData.photos.photo;
      console.log(imageData);
      setPhotoArr((prevImageArr) => [...prevImageArr, ...newImageArr]);
      setPage((prevPage) => prevPage + 1);
      setHasMoretoShow(imageData.photos.page < imageData.photos.pages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
              <img src={Img} alt="Logo" />
            </div>
            <div className="container-header-search">
              <div className="search-box">
                <p className="searchbox-label">
                  Discover and Explore with Image Search
                </p>
                <div className="searchbox-searchboxicon">
                  <input type="text" placeholder="type here..." />
                  <button>
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
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
                  endMessage={<p style={{ textAlign: "center" }}>No more data to load.</p>}
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
