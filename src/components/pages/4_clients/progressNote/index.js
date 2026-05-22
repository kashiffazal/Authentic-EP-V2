import React, { Component } from 'react';
import PageTitle from '../../mutual/pageTitle';
import { Button, Modal, Popover } from 'antd';
import ScreenLoader from '../../../externalComponents/screen-loader';
import DataTable from '../../../externalComponents/andt-data-table-component';
import ProgressNoteFormModal from './progressNoteFormModal';
import { HTTP, LogResetRow, LogResetList, AccessControl } from '../../../services';
import ViewDetailsNote from './viewDetailsNote';

class NoteAndLog extends Component {
  state = {
    loader: false,
    visibleFormModal: false,
    visibleViewModal: false,
    listData: [],
    editData: null,
    dataId: null
  };

  visibleEditForm = (data) => {
    this.setState({ visibleFormModal: true }, () => {
      setTimeout(() => this.setState({ editData: data }), 10);
    })
  }//End function

  visibleForm = (id) => {
    //this.props.form.resetFields();
    this.setState({ visibleFormModal: true, dataId: id }, () => {
      // this.props.form.resetFields();
    })
  }//End function

  render() {
    const st = this.state;
    const actionCol = (record, row, className = false) => (
      <div className={`text-center ${className}`}>
        {AccessControl(33) && <button title="View Details" className="btnToLink" onClick={() => this.setState({ visibleViewModal: true, dataId: row.id })}><i className="fs-18 las la-table link-color" /></button>}
        {AccessControl(33) && <i className="list_view_icon_sap las la-redo"></i>}
        {AccessControl(32) && <button title="Edit Note" className="btnToLink" onClick={() => this.visibleEditForm(row)}><i className="fs-18 las la-edit link-color" /></button>}
      </div>
    );
    //@ Web View Column
    const columns = [
      {
        title: 'Sr',
        dataIndex: 'key',
        width: '5%',
        sorter: (a, b) => a.key.toString().localeCompare(b.key.toString()),
      }, {
        title: 'Client Name',
        dataIndex: 'name',
        width: '17%',
        sorter: (a, b) => a.name.localeCompare(b.name),
      }, {
        title: 'Date',
        dataIndex: 'date',
        width: '17%',
        sorter: (a, b) => a.date.localeCompare(b.date),

      }, {
        title: 'Time',
        dataIndex: 'time',
        width: '10%',
        sorter: (a, b) => a.time.localeCompare(b.time)
      }, {
        title: 'Inserted Date',
        dataIndex: 'inserted_by_date',
        width: '16%',
        sorter: (a, b) => a.inserted_by_date.localeCompare(b.inserted_by_date)
      }
    ];
    AccessControl('32,33') &&
      columns.push({
        title: 'Action',
        align: 'center',
        width: '6%',
        render: (record, row) => actionCol(record, row)
      });

    //@ Mobile View Column
    const mobileCol = [{
      title: 'Client Name',
      dataIndex: 'name',
      width: '100%',
      className: 'mobile-col',
      render: (record, row) =>
        <div className="col-data" style={{ width: window.screenWidthMobile }}>
          <div className="details">
            {/* <div className="icon"><i className={`las ${row.status === 'close' ? 'la-times close-bg-color' : 'la-check success-bg-color'}`} /></div> */}
            <div className="data">
              <div className="main-value">{record}</div>
              <div className="sub-value">
                <span className="label">Note Date Time:</span>
                <span className="value">{row.date}, {row.time}</span>
                {/* <span className="label">Time:</span>
                <span className="value">{row.time}</span> */}
              </div>
              <div className="foot-value">
                <span className="label">Inserted Date:</span>
                <span className="value">{row.inserted_by_date}</span>
              </div>
            </div>
          </div>
          {AccessControl('32,33') && <div className="action">
            <Popover content={actionCol(record, row, 'mobile-icon-menu-action')} trigger="click" placement="right">
              <Button size="small"><i className="las la-bars"></i></Button>
            </Popover>
          </div>}
        </div>
    }];
    return (
      <div>
        <PageTitle
          titleIcon="las la-file-alt"
          titleSpan="Client Progress"
          titleHeading="Note"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-id-card-alt', label: 'Client' },
            { iconLas: 'las la-file-alt', label: 'Client Progress Note' }
          ]}
          render={AccessControl(30) && <Button size="large" type="primary" onClick={() => this.visibleForm()}>Add Note</Button>}
        />
        <div className={window.webviewMobile ? '' : 'container'}>
          <ScreenLoader active={st.loader}>
            <DataTable
              classNameContainer={window.webviewMobile ? 'mobile-table' : ''}
              columns={window.webviewMobile ? mobileCol : columns}
              styleType={2}
              dataSource={st.listData}
              showSizeChanger={true}
              pagination={{ itemDetails: true, showOnSinglePage: true }}
              customFilter="true"
              customFilterLabel="Filter by"
              customFilterCol={[
                { label: 'Client Name', value: 'name' },
                { label: 'Date', value: 'date' },
                { label: 'Time', value: 'time' },
                { label: 'Inserted Date', value: 'inserted_by_date' }
              ]}
            />
          </ScreenLoader>
        </div>
        <ProgressNoteFormModal
          list={st.list}
          data={this.state.editData}
          show={st.visibleFormModal}
          onClose={() => this.setState({ visibleFormModal: false, editData: null })}
          addData={(values) => { this.setState({ listData: LogResetList(values, this.state.listData) }) }}
          updateData={(values) => { this.setState({ listData: LogResetRow(values, this.state.listData) }) }}
        // fp={this.props.form}
        />


        <Modal
          width={740}
          maskClosable={false}
          className="hide-footer"
          centered={true}
          // title={'View Notes'}
          visible={st.visibleViewModal}
          onOk={() => this.setState({ visibleViewModal: false })}
          onCancel={() => this.setState({ visibleViewModal: false })}
          destroyOnClose={true}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => this.setState({ visibleViewModal: false })}><i className="las la-times" /></button>
          <div className="modal-modern-title-for-view-details">
            <div>
              <span className="title">View Notes</span>
              <span className="sub-title">View Note in Detail</span>
            </div>
          </div>
          {st.visibleViewModal && <ViewDetailsNote dataId={st.dataId} />}
        </Modal>
      </div>
    )//End Return statement
  }//End End Render
  componentDidMount() {
    this.setState({ loader: true });
    HTTP('get', '/clientProgressNote/get/').then(res => {
      this.setState({ loader: false });
      if (!res) return false;
      //console.log(res)
      this.setState({ listData: res.data, list: res.list });
    });
  }//End componentDidMount
}//End class

export default NoteAndLog;
