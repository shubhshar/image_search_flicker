import React from "react";
import { Button, Modal } from "react-bootstrap";

const ImageModal = ({ selectedImage, handleClose }) => {
  return (
    <>
      <Modal show={selectedImage !== null} onHide={handleClose} centered>
        <Modal.Body>
          {selectedImage && (
            <img
              src={`https://live.staticflickr.com/${selectedImage.server}/${selectedImage.id}_${selectedImage.secret}_w.jpg`}
              alt="Selected"
              className="selected-image"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImageModal;
