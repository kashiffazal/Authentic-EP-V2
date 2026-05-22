import React, { Component } from 'react';
import { Row, Col, Button, Empty, Tooltip } from 'antd';
import { ArrowsAltOutlined, TableOutlined, DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import PageTitle from '../mutual/pageTitle';
import DataTable from '../../externalComponents/andt-data-table-component';
// import { Document, Page } from 'react-pdf';
import ScreenLoader from '../../externalComponents/screen-loader';
import ReportForm from './partial/reportForm';
import Export from './partial/export';
import $ from 'jquery';
import './styles.less';


class Reporting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postLoader: false,
      tableOverFlow: false,
      collapseIcon: 'left',
      tableOverFlowIcon: 'arrows',
      sortedCol: null
      // tableLabel: 'Generate Reports',
      // tableDesc1: 'You can filter and export reports',
      // customFilterCol: [],
    }//End state
  }//End constructor

  collapse = () => {
    $('.report-container').toggleClass('colhide');
    if (this.state.collapseIcon === 'left') {
      this.setState({ collapseIcon: 'right' });
    } else {
      this.setState({ collapseIcon: 'left' });
    }//End if condition
  }//End function

  tableOverFlowToggle = () => {
    this.setState({ tableOverFlow: !this.state.tableOverFlow });
    if (this.state.tableOverFlowIcon === 'arrows') {
      this.setState({ tableOverFlowIcon: 'table' });
    } else {
      this.setState({ tableOverFlowIcon: 'arrows' });
    }//End if condition
  }//End function

  getSortData = (data) => {
    // console.log(data);
    if (data.order) {
      data.order = (data.order.charAt(0).toUpperCase() + data.order.slice(1));
      this.setState({ sortedCol: { title: data.column.title, column: data.column.dataIndex, order: data.order } });
    } else {
      this.setState({ sortedCol: null });
    }//End if condition
  }//End function

  render() {
    const st = this.state;
    const otherDetails = st.tableData && st.tableData.otherDetails + (st.sortedCol ? ' | Order by: ' + st.sortedCol.title + ' (' + st.sortedCol.order + ')' : '');
    return (
      <div>
        <PageTitle
          titleIcon="las la-file-invoice"
          titleSpan="Create"
          titleHeading="Reports"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-folder-open', label: 'Report' },
            { iconLas: 'las la-file-pdf', label: 'Reporting' }
          ]}
        />
        <div className="report-container">
          <Row gutter={window.rowGutter} className="rowColapse">
            <Col lg={4} md={6} sm={8} xs={24} className="col1">
              <ReportForm
                sortedCol={st.sortedCol}
                postLoader={(e) => this.setState({ postLoader: e })}
                reportResponseType={(e) => this.setState({ reportResponseType: e })}
                filePath={(e) => this.setState({ filePath: e })}
                fileName={(e) => this.setState({ fileName: e })}
                tableData={(e) => this.setState({ tableData: e, sortedCol: null })}
              />
            </Col>
            <Col lg={20} md={18} sm={16} xs={24} className="col2 bg-side-line">
              <Tooltip placement="top" title={"Collapse Form"} className="table-top-icon-btn-1">
                <Button shape="circle" size="small" icon={(st.collapseIcon === 'left') ? <DoubleLeftOutlined /> : <DoubleRightOutlined />} onClick={() => this.collapse()} />
              </Tooltip>
              <Tooltip placement="top" title={"Table Overflow"} className="table-top-icon-btn-2">
                <Button shape="circle" size="small" disabled={((st.reportResponseType === 'table' && st.tableData && st.tableData.data) ? false : true)} icon={(st.tableOverFlowIcon === 'arrows') ? <ArrowsAltOutlined /> : <TableOutlined />} onClick={() => this.tableOverFlowToggle()} />
              </Tooltip>
              <ScreenLoader active={st.postLoader} loaderType={'jellyBox'} jellyBoxColor={'#98acc5'} tip="Generating Report, Please wait...">
                {!st.reportResponseType &&
                  <div className="emptyReportContainer">
                    {!st.postLoader && <Empty description={<span className="generateRelortLabel"><strong>Generate</strong> Report</span>} />}
                  </div>
                }
                {/* https://docs.google.com/viewerng/viewer?url=https://blockims.horizonstradingcorporation.com/server/report_files/1/general_journal_report_1.pdf?k=ac0f */}
                {st.reportResponseType === 'pdf' && <iframe title="Report" src={window.googleDocViewerPDF + st.filePath} className="pdfIframe" allow="autoplay; encrypted-media" allowtransparency="true" allowFullScreen />}
                {(st.reportResponseType === 'table' && st.tableData && st.tableData.data) &&
                  <div className="table-container">
                    <DataTable
                      label={st.tableData.label}
                      desc={<span>Preset Name: {st.tableData.desc} {st.tableData.fromToDate && ' | ' + st.tableData.fromToDate} <br /> {otherDetails}</span>}
                      columns={st.tableData.column}
                      dataSource={st.tableData.data}
                      overFlow={st.tableOverFlow}
                      showSizeChanger={true}
                      filter="true"
                      pagination={{ itemDetails: true, showOnSinglePage: true }}
                      customFilter="true"
                      customFilterCol={st.tableData.customFilterCol}
                      onChange={(a, b, c) => this.getSortData(c)}
                    />
                    {st.tableData.data.length > 0 && <div className="table-export-btn-container">
                      Export To: <Export reportResponseType={st.reportResponseType} fileName={st.fileName} icon={true} sortedCol={st.sortedCol} tableData={{
                        label: st.tableData.label,
                        desc: st.tableData.desc,
                        fromToDate: st.tableData.fromToDate,
                        otherDetails: otherDetails,
                        totalRecord: st.tableData.data.length
                      }} />
                    </div>}
                  </div>}
              </ScreenLoader>
            </Col>
          </Row>
        </div>
      </div>
    )//End Return statement
  }//End End Render
}//End class

export default Reporting;