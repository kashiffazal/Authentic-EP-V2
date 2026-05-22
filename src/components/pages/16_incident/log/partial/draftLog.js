import React, { Component } from 'react';
import { Tooltip, Popconfirm, Popover, Button } from 'antd';
import ScreenLoader from '../../../../externalComponents/screen-loader';
import DataTable from '../../../../externalComponents/andt-data-table-component';
import { HTTP, SaveArrLocalStorage, DeleteRowFromList, TableColumnFilter, TableColumnListForSelectFilter, AccessControl } from '../../../../services';
import ViewPDFInModal from '../../../mutual/viewPDFInModal';

class IncidentListDraft extends Component {
  state = {
    getLoader: false,
    deleteLoader: {},
    list_data: [],
    viewModal: false,
    viewPdfLink: '',
    statusList: {},
    ads: {},//! App Default Settings,
    filterIndividualColArr: {}
  };

  deleteRecord = (row) => {
    let deleteLoader = this.state.deleteLoader;
    deleteLoader[row.id] = true;
    this.setState({ deleteLoader });
    HTTP('get', '/incident/post/deleteRecord/' + row.id).then(res => {
      deleteLoader[row.id] = false;
      this.setState({ deleteLoader });
      if (!res) return false;
      this.setState({ list_data: DeleteRowFromList(this.state.list_data, row.id) });
      this.props.deletedData(row);
    });
  }//End function

  render() {
    const st = this.state;
    const pr = this.props;
    const actionCol = (record, row, className = false) => (
      <ScreenLoader active={st.deleteLoader[row.id]} inline={true}>
        <div className={`text-center ${className}`}>
          {AccessControl(68) &&
            <Tooltip placement="top" title='Edit' mouseEnterDelay={0.5}>
              <button className="btnToLink" onClick={() => SaveArrLocalStorage({ id: row.id }, "incidentForm")}><i className="fs-18 las la-edit link-color"></i></button>
            </Tooltip>
          }
          {!pr.isSPW && AccessControl(69) &&
            <React.Fragment>
              <i className="list_view_icon_sap las la-redo" />
              <Tooltip placement="bottom" title='Delete' mouseEnterDelay={0.5}>
                <Popconfirm
                  title="Are you sure to delete this record?"
                  onConfirm={() => this.deleteRecord(row)}
                  // onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                  placement="topRight"
                >
                  <button className="btnToLink" ><i className="fs-18 las la-times-circle link-color"></i></button>
                </Popconfirm>
              </Tooltip>
            </React.Fragment>
          }
        </div>
      </ScreenLoader>
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

    AccessControl(67) &&
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

    AccessControl('68,69') &&
      columns.push({
        title: 'Action',
        align: 'center',
        width: '10%',
        render: (record, row) => actionCol(record, row)
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
            {AccessControl('68,69') &&
              <div className="action">
                <Popover content={actionCol(record, row, 'mobile-icon-menu-action')} trigger="click" placement="right">
                  <Button size="small"><i className="las la-bars"></i></Button>
                </Popover>
              </div>
            }
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
    HTTP('get', '/incident/get/getList/draft').then(res => {
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
}//End class

export default IncidentListDraft;
