import { Modal as AntModal } from 'antd';
import './style.css';

const Modal = ({ children, ...props}) => {
  return (<AntModal {...props} className="modal-container" width="25rem">
    {children}
  </AntModal>)
}

export default Modal;