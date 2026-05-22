import React, { Component } from 'react'
import { Button } from 'antd';
import { HTTP, FileDownload } from '../../../services';

const ButtonGroup = Button.Group;

class Export extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderPdf: false,
      loaderExcel: false,
      loaderCSV: false
    }//End state
  }//End constructor
  exportReports = (exportIn) => {
    if (exportIn === 'excel') { this.setState({ loaderExcel: true }); }//End i condition
    if (exportIn === 'csv') { this.setState({ loaderCSV: true }); }//End i condition
    if (exportIn === 'pdf') {
      if (this.props.reportResponseType === 'pdf') {
        FileDownload(this.props.filePath, this.props.fileName);
        return false;
      } else {
        this.setState({ loaderPdf: true });
      }//End if condition 
    }//End i condition

    let pdfOtherData = this.props.tableData ? JSON.stringify(this.props.tableData) : '';
    let sortedCol = this.props.sortedCol ? JSON.stringify(this.props.sortedCol) : ''
    let postObj = { type: exportIn, fileName: this.props.fileName, pdfOtherData: pdfOtherData, sortedCol: sortedCol };
    // console.log(postObj);
    HTTP('post', '/reporting/post/export/', postObj).then(res => {
      this.setState({ loaderCSV: false, loaderExcel: false, loaderPdf: false });
      if (!res) { return false; }
      // console.log(res);
      FileDownload(res.filePath, res.fileName)
      //console.log(res.data);
      //Services.fileDownload(res.path, res.fileName);
    });
  }//End function

  render() {
    const st = this.state;
    const pr = this.props;
    return (
      <ButtonGroup className="exportBtnContainerForiFrame flex-c-m">
        <Button disabled={st.loaderExcel || st.loaderCSV} loading={st.loaderPdf} onClick={() => this.exportReports('pdf')}>
          {pr.icon && <i className="las la-file-pdf" />} PDF
        </Button>
        <Button disabled={st.loaderPdf || st.loaderCSV} loading={st.loaderExcel} onClick={() => this.exportReports('excel')}>
          {pr.icon && <i className="las la-file-excel" />} XLS
        </Button>
        <Button disabled={st.loaderPdf || st.loaderExcel} loading={st.loaderCSV} onClick={() => this.exportReports('csv')}>
          {pr.icon && <i className="las la-file-csv" />} CSV
        </Button>
      </ButtonGroup>
    )//End return
  }//End render
}//End class
export default Export;