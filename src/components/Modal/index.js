import { Modal } from 'antd';
import './style.css';

export default function ({ children, ...props}) {
  return (<Modal {...props} className="modal-container" width="25rem">
    {children}
  </Modal>)
}