import React, { Component } from 'react';
import { Upload, Progress, Form, Button, Tooltip } from 'antd';
import { UploadOutlined, CloseOutlined } from '@ant-design/icons';
import './styles.less';

const { Dragger } = Upload;

class UploadFile extends Component {
  state = {
    fileList: [],
    extensionError: false,
    sizeError: false,
    uploadedFileView: null,
    valuePropsArr: [],
    filesCount: 0,
    hasFile: false
  };

  checkFileTypes = (selectedFile) => {
    var fileTypeProvided = this.props.restrictExtension;
    if (fileTypeProvided) {
      //Split all types into array
      fileTypeProvided = fileTypeProvided.split(',');
      fileTypeProvided.unshift("-");//For cover 0 index for indexOf method
      //Getting selected file type
      var selectedExtension = selectedFile.name.split('.').pop();
      return (fileTypeProvided.indexOf(selectedExtension) >= 0 ? true : false);
    } else { return true }//End if condition
  }//End function

  setFile = (file) => {
    // console.log(file);
    var files = [...this.state.fileList];
    files = [...new Set(files.map(data => data))];//Remove duplicate
    if (this.props.multiple) {
      files.push(file);
    } else {
      this.removeFileListInHTML(0, true);
      files = [file];
    }//End if condition
    // console.log(file);
    this.setFieldValue(files);
    this.setState({ fileList: files }, () => {
      this.props.onChange && this.props.onChange(this.state.fileList);
    });
  }//End if condition

  setFieldValue = (files) => {
    let formObj = {};
    formObj[this.props.name] = files;
    // console.log(formObj);
    this.props.formProps.setFieldsValue(formObj);
  }//End if condition

  //This is temp function for this antd (4.16.13) version
  removeFileListInHTML = (index, skipLast = false) => {
    setTimeout(() => {
      const parent = document.querySelector('.' + this.props.name);
      const k = parent.querySelectorAll('.ant-upload-list-text-container');
      if (skipLast) {
        //Remove all but not last - work with Multiple
        ((typeof k === 'object')) && k.forEach((item, i) => { if (k.length !== (i + 1)) { item.parentNode.removeChild(item); } });
      } else {
        k[index] && k[index].parentNode.removeChild(k[index])
      }//End if condition
    }, 50);
  }//End function

  render() {
    const pr = this.props;
    let currentValue = (pr.value && (typeof pr.value === 'object') && pr.value[0] && pr.value[0].name) ? pr.value : false;
    // console.log(currentValue);
    //const { fileList } = this.state;
    // const fp = this.props.formProps;
    const props = {
      multiple: pr.multiple ? true : false,
      accept: pr.accept,
      onRemove: (file, errorType = false) => {
        this.setState(state => {
          state.fileList = [...new Set(state.fileList.map(data => data))];//Remove duplicate
          state.hasFile = false;
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          this.setFieldValue(newFileList);
          this.props.onChange && this.props.onChange(newFileList);
          //Remove File List element on error by size or type
          if (errorType) { this.removeFileListInHTML(index); }//End if condition
          return { fileList: newFileList };
        });
      },
      beforeUpload: file => {
        //Checking for provided types
        if (this.checkFileTypes(file)) {
          this.setState({ extensionError: false, hasFile: true });
          this.setFile(file);
        } else {
          this.setState({ extensionError: true, hasFile: false }, () => {
            props.onRemove(file, true);
            this.props.onChange && this.props.onChange(null);
          });
        }//End if condition
        //console.log((file.size / 1024 / 1024) <= parseInt(this.props.fileSize));
        if (this.props.fileSize && (file.size / 1024 / 1024 <= parseInt(this.props.fileSize))) {
          this.setState({ sizeError: false, hasFile: true });
          this.setFile(file);
        } else {
          this.setState({ sizeError: true, hasFile: false }, () => {
            props.onRemove(file, true);
            this.props.onChange && this.props.onChange(null);
          });
        }//End if condition
        return false;
      },
      // multiple: pr.multiple ? pr.multiple : false,
      defaultFileList: currentValue ? currentValue : []
    };
    const normFile = e => {
      let files = [...e.fileList];
      if (!pr.multiple && files.length > 1) { files.shift(); }
      this.props.onChange && this.props.onChange(files);
      if (files.length > 1) {
        this.setState({ filesCount: (files.length * 22) })
      } else {
        this.setState({ filesCount: 0 });
      }//End if condition
      return files;
    };
    const st = this.state;
    const name = pr.name ? pr.name : 'uploadedfile';
    const type = pr.type ? pr.type : '1';
    // console.log(this.props.value)
    return (
      <div className="c_fileUploaderContainer">
        <div className={pr.name + ' ' + (pr.loader ? "dragDropContainer fileNameAfterLoader " + pr.className : "dragDropContainer " + pr.className + (type === '2.1' ? ' btn-mode' : ''))}>
          <Form.Item
            name={name}
            label={pr.label ? pr.label : ''}
            help={pr.help ? pr.help : undefined}
            style={pr.containerStyle ? pr.containerStyle : ''}
            className={pr.containerClassName ? pr.containerClassName : ''}
            rules={[{ required: ((pr.noRequired || st.uploadedFileView) ? false : true), message: (pr.reqMsg ? pr.reqMsg : 'Required') }]}
            initialValue={st.valuePropsArr}
            valuePropName='fileList'
            getValueFromEvent={normFile}
          >
            {type === '1' &&
              <>
                <Dragger {...props} disabled={pr.disabled ? true : false}>
                  <div className="dragDropContentContainer">
                    <div className="bg_img"></div>
                    <div className="content" style={{ paddingBottom: st.filesCount }}>
                      <h3 style={{ paddingTop: (st.filesCount > 0 ? '15px' : '0px') }}>{pr.title ? pr.title : 'Click or, drag and drop a file containing them here'}</h3>
                      <p className={
                        // (this.props.value && (typeof this.props.value === 'object') && this.props.value.length > 0)
                        st.hasFile ? "hidePara" : ""}>{pr.msg ? pr.msg : 'Select it from your computer instead...'}</p>
                      {pr.loader && <Progress percent={pr.progress} size="small" status={pr.progress < 100 ? 'active' : 'success'} />}
                      {st.extensionError && <p className="extensionError">Required file format ({pr.restrictExtension})</p>}
                      {st.sizeError && <p className="extensionError">Can not upload more then {pr.fileSize}MB</p>}
                    </div>
                  </div>
                </Dragger>
                {st.uploadedFileView && st.uploadedFileView.map((item, i) => {
                  return (<a href={(pr.filePath ? pr.filePath : '') + item} key={i} target="_blank" rel="noopener noreferrer" className="viewFileLink">{item}</a>)
                })}
              </>
            }
            {type === '2.1' &&
              <>
                <Upload {...props} disabled={pr.disabled ? true : false} >
                  {/* <Tooltip placement="top" title={st.fileList[0] ? st.fileList[0].name : (pr.title ? pr.title : '')}> */}
                    <Button className={pr.btnClassName} icon={<UploadOutlined />} type={st.hasFile ? "primary" : ''}>{(pr.title ? pr.title : '')}</Button>
                  {/* </Tooltip> */}
                </Upload>
                {/* {st.fileList[0] && JSON.stringify(st.fileList[0].name)} === */}
                {/* {st.hasFile ? 'hasFile - True' : 'hasFile - False'} */}
                {(st.fileList[0] || st.hasFile) && <Button className={pr.closeClassName} icon={<CloseOutlined />} onClick={() => {
                  props.onRemove(st.fileList[0], true);
                  this.setState({ hasFile: false });
                  pr.onRemove && pr.onRemove();
                }}></Button>}

                {/* =={JSON.stringify(st.fileList)}== */}
                {st.uploadedFileView && st.uploadedFileView.map((item, i) => {
                  return (
                    <a href={(pr.filePath ? pr.filePath : '') + item} key={i} target="_blank" rel="noopener noreferrer" className="viewFileLink">
                      {/* {item} */}
                      View
                    </a>
                  )
                })}
              </>
            }
          </Form.Item>
        </div>
      </div>
    );//End return
  }//End render

  componentDidMount() {
    var value = this.props.value;
    if (value && (typeof value === 'object') && value[0] && value[0].name) {
      this.setState({ valuePropsArr: value, filesCount: (value.length * 22) });
    }//End if condition
    // console.log(value, ((typeof value === 'object' && value.length > 0) ? 't' : 'f'));
    if (value && (typeof value === 'object' && value.length > 0)) { this.setState({ hasFile: true }); }
    if (this.props.uploadedDocuments) { this.setState({ uploadedFileView: this.props.uploadedDocuments.split(',') }) };
  }//End componentDidMount
}//End class

export default UploadFile;