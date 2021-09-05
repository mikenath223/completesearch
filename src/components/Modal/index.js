import { Modal as AntModal } from 'antd';
import './style.css';

const Modal = ({ children, ...props}) => {
  return (<AntModal className="modal-container" width="25rem" {...props}>
    {children}
  </AntModal>)
}

export default Modal;