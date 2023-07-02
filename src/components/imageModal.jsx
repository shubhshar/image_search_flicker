import React from "react";
import { Button, Modal, ButtonToolbar } from "react-bootstrap";

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
              style={{width:'120%'}}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
        <ButtonToolbar>
          <Button onClick={handleClose}> <i className="fa fa-times"></i></Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImageModal;
