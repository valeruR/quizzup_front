import React from 'react';
import Modal from '@material-ui/core/Modal';


const ErrorHandler = ({ error }) => {
  return (
    <div>
      {error && 
        <Modal>
          <div>
            <h2 id="server-modal-title">An error occur</h2>
            <p id="server-modal-description">{error.message}</p>
          </div>
        </Modal>}
    </div>
  );
}

export default ErrorHandler;