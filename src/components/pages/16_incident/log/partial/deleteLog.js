import React, { Component } from 'react';
import { Tooltip, Popover, Button } from 'antd';
import ScreenLoader from '../../../../externalComponents/screen-loader';
import DataTable from '../../../../externalComponents/andt-data-table-component';
import { AccessControl, HTTP, InsertRowInList, TableColumnFilter, TableColumnListForSelectFilter } from '../../../../services';
import ViewPDFInModal from '../../../mutual/viewPDFInModal';

class IncidentListDeleted extends Component {
  state = {
    getLoader: false,
    list_data: [],
    viewModal: false,
    viewPdfLink: '',
    statusList: {},
    ads: {},//! App Default Settings,
    filterIndividualColArr: {}
  };

  render() {
    const st = this.state;
    const actionCol = (record, row, className = false) => (
      <div className="text-center">
        {row.pdf_path_apr &&
          <Tooltip placement="left" title='View Details' mouseEnterDelay={0.5}>
            <button className="btnToLink link-color flex-c-m" onClick={() => this.setState({ viewModal: true, viewPdfLink: row.pdf_path_apr })}>
              <span className="fs-12 dis-inline-block m-r-2">Approved </span><i className="fs-18 las la-table" />
            </button>
          </Tooltip>}
        {row.pdf_path_una &&
          <Tooltip placement="left" title='View Details' mouseEnterDelay={0.5}>
            <button className="btnToLink link-color flex-c-m" onClick={() => this.setState({ viewModal: true, viewPdfLink: row.pdf_path_una })}>
              <span className="fs-12 dis-inline-block m-r-2">Unapproved </span><i className="fs-18 las la-table" />
            </button>
          </Tooltip>}
      </div>


    );
    const columns = [
      {
        title: 'Sr',
        dataIndex: 'key',
        width: '5%',
        sorter: (a, b) => a.key - b.key,
      }, {
        title: 'Form No',
        dataIndex: 'form_no',
        width: '8%',
        sorter: (a, b) => a.form_no.localeCompare(b.form_no),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'form_no', st.filterIndividualColArr)
      }, {
        title: 'Filling by Person',
        dataIndex: 'filling_by_name',
        width: '20%',
        sorter: (a, b) => a.filling_by_name.localeCompare(b.filling_by_name),
        render: (record, row) => <span>{record} ({row.whos_filling})</span>,
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'filling_by_name', st.filterIndividualColArr)
      }, {
        title: 'Client Name',
        dataIndex: 'client_name',
        width: '20%',
        sorter: (a, b) => a.client_name.localeCompare(b.client_name),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'client_name', st.filterIndividualColArr)
      }, {
        title: 'Affected Person',
        dataIndex: 'affected_person_name',
        width: '17%',
        sorter: (a, b) => a.affected_person_name.localeCompare(b.affected_person_name),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'affected_person_name', st.filterIndividualColArr)
      }, {
        title: 'Risk Rate',
        dataIndex: 'rate_risk',
        width: '10%',
        sorter: (a, b) => a.rate_risk.localeCompare(b.rate_risk),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'rate_risk', st.filterIndividualColArr)
      }
    ];

    AccessControl(64) &&
      columns.push({
        title: 'Unapproved Doc',
        align: 'center',
        width: '10%',
        render: (record, row) =>
          <div className="text-center">
            {row.pdf_path_una ?
              <Tooltip placement="left" title='View Details - Unapproved' mouseEnterDelay={0.5}>
                <button className="btnToLink" onClick={() => this.setState({ viewModal: true, viewPdfLink: row.pdf_path_una })}><i className="fs-18 las la-table link-color" /></button>
              </Tooltip>
              : '-'}
          </div>
      })

    AccessControl(65) &&
      columns.push({
        title: 'View',
        align: 'center',
        width: '10%',
        render: (record, row) =>
          <div className="text-center">
            {row.pdf_path_apr ?
              <Tooltip placement="left" title='View Details - Approved' mouseEnterDelay={0.5}>
                <button className="btnToLink" onClick={() => this.setState({ viewModal: true, viewPdfLink: row.pdf_path_apr })}><i className="fs-18 las la-table link-color" /></button>
              </Tooltip>
              : '-'}
          </div>
      })

    //@ Mobile View Column
    const mobileCol = [
      {
        title: 'Form No',
        dataIndex: 'form_no',
        width: '100%',
        className: 'mobile-col',
        render: (record, row) =>
          <div className="col-data" style={{ width: window.screenWidthMobile }}>
            <div className="details">
              <div className="icon">
                <Tooltip placement="topRight" title={st.statusList[row.status].name} trigger='click'>
                  <i className={
                    st.statusList[row.status]['mobileIcon'] ?
                      st.statusList[row.status]['mobileIcon'] :
                      st.statusList[row.status]['icon']
                  } style={{ background: st.statusList[row.status]['color'] }} />
                </Tooltip>
              </div>
              <div className="data">
                <div className="main-value">{record} <span className="fw-400 fs-12"><em>By {row.filling_by_name}</em></span></div>
                <div className="sub-value">
                  <span className="label">Client:</span>
                  <span className="value">{row.client_name}</span>
                </div>
              </div>
            </div>
            <div className="action">
              <Popover content={actionCol(record, row, 'mobile-icon-menu-action')} trigger="click" placement="right">
                <Button size="small"><i className="las la-bars"></i></Button>
              </Popover>
            </div>
          </div>
      }];

    return (
      <div>
        <ScreenLoader active={st.getLoader}>
          <DataTable
            classNameContainer={window.webviewMobile ? 'mobile-table' : ''}
            columns={window.webviewMobile ? mobileCol : columns}
            styleType={2}
            dataSource={st.list_data}
            showSizeChanger={true}
            pagination={{ itemDetails: true, showOnSinglePage: true }}
            customFilter="true"
            customFilterLabel="Filter by"
            customFilterCol={[
              { label: 'Support Worker', value: 'swp_name' },
              { label: 'Form No', value: 'form_no' },
              { label: 'Client Name', value: 'client_name' },
              { label: 'Affected Person', value: 'affected_person_name' },
              { label: 'Risk Rate', value: 'rate_risk' }
            ]}
          />
        </ScreenLoader>
        <ViewPDFInModal title="View Incident Form Details" show={st.viewModal} close={() => this.setState({ viewModal: false })} pdfPath={st.viewPdfLink} />
      </div>
    )//End Return statement
  }//End End Render
  componentDidMount() {
    this.setState({ getLoader: true });
    HTTP('get', '/incident/get/getList/deleted').then(res => {
      this.setState({ getLoader: false });
      if (!res) return false;
      //console.log(res)
      this.setState({ list_data: res.data, statusList: res.statusList, ads: res.appDefaultSetting }, () => {
        //@ If individual filter in ON
        if (this.state.ads.tableIndividualColFilter.allow && this.state.ads.tableIndividualColFilter.filterByTypeOrSelect === 'select') {
          this.setState({ filterIndividualColArr: TableColumnListForSelectFilter(res.data) });
        }//End if condition
      });
      this.props.count(res.count.unApproveCount, res.count.approvedCount, res.count.deletedCount, res.count.draftCount);
      this.props.statusList(res.statusList);
    });
  }//End componentDidMount
  componentDidUpdate(prevProps) {
    if ((prevProps.deletedData !== this.props.deletedData)) {
      this.setState({ list_data: InsertRowInList(this.props.deletedData, this.state.list_data) });
    }//End if condition
  }//End componentDidMount
}//End class

export default IncidentListDeleted;
