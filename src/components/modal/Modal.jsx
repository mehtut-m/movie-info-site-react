import { useState, useEffect, useRef } from 'react';
import Proptypes from 'prop-types';
import './modal.scss';

function Modal(props) {
  const [active, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(props.active);
  }, [props.active]);

  return (
    <div id={props.id} className={`modal ${active ? 'active' : ''}`}>
      {props.children}
    </div>
  );
}

Modal.propTypes = {
  active: Proptypes.bool,
  id: Proptypes.string,
};

export const ModalContent = (props) => {
  const contentRef = useRef(null);

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove('active');
    if (props.onClose) props.onClose();
  };
  return (
    <div className="modal__content">
      <div className="modal__content__close" onClick={closeModal}>
        <i className="bx bx-x" />
      </div>
    </div>
  );
};

ModalContent.propTypes = {
  onClose: Proptypes.func,
};

export default Modal;
