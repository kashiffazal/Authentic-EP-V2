import React, { Component } from 'react'
import { Modal, Row, Col, Button, Avatar } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './styles.less';

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      src: null,
      base64Url: '',
      crop: {
        unit: '%',
        width: 30,
        aspect: (this.props.imageType === 'circle' ? 1 / 1 : 1 / 1.1),
      },
    }//End state
  }//End constructor

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => { this.imageRef = image; };
  onCropComplete = crop => { this.makeClientCrop(crop); };
  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      this.setState({ base64Url: canvas.toDataURL('image/jpeg') });
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }//End if condition
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;
    const st = this.state;
    const pr = this.props;
    const prt = this.props.type;
    const imgWidth = pr.width ? pr.width : 185;
    const imgHeight = pr.height ? pr.height + 'px' : 'unset';
    const buttonType = prt === 'button' ? true : false;
    return (
      <div className="img-crop-and-upload-01-container">


        {/* {prt === 'button' &&
          <div className={pr.imageType === 'circle' ? 'circle-img-upload-btn' : 'square-img-upload-btn'}>
            <Avatar src={pr.defaultImageUrl ? pr.defaultImageUrl : ''} icon={<UserOutlined />} shape={(pr.imageType === 'circle') ? '' : "square"} size={imgWidth} />
            <button type="button" onClick={() => this.setState({ visible: true })}>{pr.buttonLabel ? pr.buttonLabel : 'Upload image'}</button>
          </div>
        } */}
        {/* {prt === 'image' && */}
        <div className={pr.imageType === 'circle' ? 'circle-img-upload-btn' : 'square-img-upload-btn'}>
          <Avatar src={pr.defaultImageUrl ? pr.defaultImageUrl : ''} icon={<UserOutlined />} shape={(pr.imageType === 'circle') ? '' : "square"} size={imgWidth}
            style={{ height: imgHeight }}
          />
          {buttonType && <div className="unClickable"></div>}
          <button type="button" onClick={() => this.setState({ visible: true })}
            style={{ bottom: ((imgWidth / 2) - 70) + "px" }}
            className={buttonType ? 'innerBtn' : 'outerBtn'}
          >{buttonType ? 'Upload' : <EditOutlined />}</button>
        </div>
        {/* } */}

        <Modal title="Upload a new image" visible={st.visible}
          width={900}
          // onOk={handleOk} 
          onCancel={() => this.setState({ visible: false })}
          footer={[
            <Button key={1} size="large" onClick={() => this.setState({ visible: false })}>Cancel</Button>,
            src ? <Button key={2} size="large" disabled={!src} onClick={() => this.setState({ src: null })}>Reset</Button> : '',
            src ? <Button key={3} size="large" type="primary" disabled={!src} onClick={() => {
              pr.onChange(this.state.base64Url);
              this.setState({ visible: false });
            }}>Done</Button> : '',
          ]}
        >
          <div className="img-crop-and-upload-01-container-modal">
            {src ? (
              <Row gutter={30}>
                <Col lg={6} md={6} sm={6} xs={24}>
                  <div className="drag-file-preview">
                    {/* -{this.state.FileReaderbase64Url}- */}
                    {croppedImageUrl && (<img alt="Crop" style={{ width: '100%' }} src={croppedImageUrl} />)}
                    <input type="file" accept={pr.acceptedFileTypes ? pr.acceptedFileTypes : "image/x-png, image/png, image/jpg, image/jpeg, image/gif"} onChange={this.onSelectFile} className="drag-file-upload-input" />
                    <div className="drag-file-upload-preview"></div>
                  </div>
                </Col>
                <Col lg={18} md={18} sm={18} xs={24} className="drag-file-flex-col">
                  <ReactCrop
                    src={src}
                    crop={crop}
                    ruleOfThirds
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onCropComplete}
                    onChange={this.onCropChange}
                  />
                </Col>
              </Row>

            ) :
              <div>
                <input type="file" accept="image/*" onChange={this.onSelectFile} className="drag-file-uploader" />
                <div className="drag-file-placeholder">
                  <div className="drag-file-heading"></div>
                  <div className="drag-file-sub-heading"></div>
                </div>
              </div>
            }
          </div>
        </Modal>
      </div>
    );
  }
}
export default UploadImage;
