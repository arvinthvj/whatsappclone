import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const ModalSeperate = ({status , okHandler, cancelHandler}) => {
  
debugger
  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal title="Basic Modal" visible={status} onOk={okHandler} onCancel={cancelHandler}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ModalSeperate;