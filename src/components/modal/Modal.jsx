import { useState, useEffect, useRef } from 'react';
import Proptypes from 'prop-types';
import { BiX } from 'react-icons/bi';

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
    <div ref={contentRef} className="modal__content">
      {props.children}
      <div className="modal__content__close" onClick={closeModal}>
        <BiX />
      </div>
    </div>
  );
};

ModalContent.propTypes = {
  onClose: Proptypes.func,
};

export default Modal;
