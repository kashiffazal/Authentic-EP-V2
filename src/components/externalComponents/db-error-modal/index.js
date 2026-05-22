import React from 'react';
import { Result, Button, Modal } from 'antd';

const DBErrorModal = (props) => {

  const onClose = () => {
    window.dbErrorModal = false;
  }//End function

  return (
    <Modal
      width={960}
      maskClosable={false}
      className="hide-header hide-footer"
      centered={true}
      // title={props.id ? 'Update Delivery Server' : 'Add Delivery Server'}
      visible={window.dbErrorModal}
      onCancel={() => onClose()}
      destroyOnClose={true}
    >
      <div className="h-full flex-c-m">
        <Result
          status="error"
          title="Sorry, we've run into a problem"
          subTitle={
            <div>
              We're not exactly sure what the problem is. It could be that the system had a rare and once-off glitch: so first try going back and performing the action again.
              <div className="db-error-json-container">
                <p className="m-0">
                  <span className="key">Error Message: </span>
                  <span className="value">{window.dbErrorJSON && window.dbErrorJSON.errorMsg}</span>
                </p>
              </div>
            </div>
          }
          extra={[
            // <Button key="1" size="large" type="primary" onClick={() => window.history.go(-1)}>Go Back</Button>
            <Button key="1" size="large" type="primary" onClick={() => onClose()}>Close and Retry</Button>
          ]}
        />
      </div>
    </Modal>
  );
}//End function
export default DBErrorModal;