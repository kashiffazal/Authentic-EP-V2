import React, { useEffect, useState } from 'react';
import { Popconfirm, Tabs, Button, Modal } from 'antd';
import PageTitle from '../../mutual/pageTitle';
import DataTable from '../../../externalComponents/andt-data-table-component';
import ScreenLoader from '../../../externalComponents/screen-loader';
import { HTTP, DeleteRowFromList, InsertRowInList, UCFirst, SortableDateInTableData, TableColumnFilter, TableColumnListForSelectFilter, AccessControl } from '../../../services';
import ViewDetails from './partial/viewDetails';

const EmailSentList = () => {
  const [statusList, setStatusList] = useState([]);
  const [currentTabIndex, setCurrentTabIndex] = useState(1);
  const [listData, setListData] = useState({})
  const [filterIndividualColArr, setFilterIndividualColArr] = useState({})
  const [logLoader, setLogLoader] = useState(false);
  const [mainLoader, setMainLoader] = useState(false);
  const [ads, setAds] = useState({});
  const [viewId, setViewId] = useState('');
  const [resentOrDeleteLoader, setResentOrDeleteLoader] = useState({});
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [failedReasonHold, setFailedReasonHold] = useState({});
  const [failedReasonModal, setFailedReasonModal] = useState(false);
  const { TabPane } = Tabs;


  const getData = (statusIndex, logLoader = false) => {
    //@ Get status name for getting data 
    let statusListNameArr = Object.keys(statusList);
    let status = statusListNameArr[statusIndex - 1] ? statusListNameArr[statusIndex - 1] : 'failed';
    setCurrentTabIndex(parseInt(statusIndex))
    //@ Set listData variable for table
    //@ If data is available in object then do not get from server
    const lData = { ...listData };
    // console.log(status, lData[status]);
    if (lData[status]) { setFilterIndividualColArr(TableColumnListForSelectFilter(lData[status])); return false; }//End if condition

    logLoader ? setLogLoader(true) : setMainLoader(true);
    HTTP('get', '/settingsEmailSentList/get/getList/' + status).then(res => {
      setLogLoader(false); setMainLoader(false);
      if (!res) return false;
      lData[status] = res.data;
      setListData(lData);
      setStatusList(res.status_list);
      setAds(res.appDefaultSetting);
      setFilterIndividualColArr(TableColumnListForSelectFilter(res.data));
    });
  }//End function

  const reloadCurrentTab = (tabIndex) => {
    //@ Get status name for getting data 
    let statusListNameArr = Object.keys(statusList);
    let status = statusListNameArr[tabIndex - 1];
    //@ Empty array of specific tab and call Get function
    let lData = { ...listData };
    lData[status] = false;
    setListData(lData);
    //? Call function in useEffect
  }//End function

  const resendEmail = (row) => {
    resentOrDeleteLoader[row.id] = true;
    setResentOrDeleteLoader({ ...resentOrDeleteLoader });
    HTTP('post', '/settingsEmailSentList/post/resend/', { id: row.id }).then(res => {
      resentOrDeleteLoader[row.id] = false;
      setResentOrDeleteLoader({ ...resentOrDeleteLoader });
      if (!res) return false;
      //@ If it's already sent then no need to transfer anywhere ===//
      if (row.status === 'sent') { return false; }
      //@ ==========================================================//
      let lData = { ...listData };
      //@ Remove from current list
      lData[row.status] = DeleteRowFromList(lData[row.status], row.id);
      //@ Add into deleted list
      if (lData[res.newStatus]) { lData[res.newStatus] = InsertRowInList(row, lData[res.newStatus]); }//End if condition
      setListData(lData);
    });
  }//End function

  const deleteRecord = (row) => {
    resentOrDeleteLoader[row.id] = true;
    setResentOrDeleteLoader({ ...resentOrDeleteLoader });
    HTTP('post', '/settingsEmailSentList/get/deleteStatus/', { id: row.id }).then(res => {
      resentOrDeleteLoader[row.id] = false;
      setResentOrDeleteLoader({ ...resentOrDeleteLoader });
      if (!res) return false;
      let lData = { ...listData };
      //@ Remove from current list
      lData[row.status] = DeleteRowFromList(lData[row.status], row.id);
      //@ Add into deleted list
      if (lData[res.status]) { lData[res.status] = InsertRowInList(row, lData[res.status]); }//End if condition
      setListData(lData);
    });
  }//End function

  useEffect(() => {
    if (listData['failed'] === false) {
      getData(1, true)
    } else if (listData['sent'] === false) {
      getData(2, true)
    } else {
      getData(1);
    }//End if condition
  }, [listData])


  let actionColumn = {
    title: 'Action',
    align: 'center',
    width: '10%',
    render: (record, row) =>
      <ScreenLoader inline={true} active={resentOrDeleteLoader[row.id]}
        tip='Loading'>
        <div className="text-center">
          {(
            (row.status === 'failed' && AccessControl(184)) ||
            (row.status === 'sent' && AccessControl(187)) ||
            (row.status === 'deleted' && AccessControl(190))
          ) &&
            <>
              <button title="View Details" className="btnToLink" onClick={() => { setViewId(row.id); setShowViewDetails(true); }}><i className="fs-18 las la-table status-hold-color" /></button>
              <i className="list_view_icon_sap las la-redo"></i>
            </>
          }
          {(
            (row.status === 'failed' && AccessControl(185)) ||
            (row.status === 'sent' && AccessControl(188)) ||
            (row.status === 'deleted' && AccessControl(191))
          ) &&
            <Popconfirm
              title="Are you sure to resend this Email?"
              onConfirm={() => resendEmail(row)}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
              placement="topRight"
            >
              <button title="Resend" className="btnToLink"><i className="fs-18 las la-sync success-color" /></button>
            </Popconfirm>
          }
          {row.status === 'failed' &&
            <>
              <i className="list_view_icon_sap las la-redo"></i>
              <Popconfirm
                title="Are you sure to delete this record?"
                onConfirm={() => deleteRecord(row)}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
                placement="topRight"
              >
                <button title="Delete" className="btnToLink"><i className="fs-18 las la-times-circle status-close-color"></i></button>
              </Popconfirm>
            </>
          }
        </div>
      </ScreenLoader>
  };

  const failedColumn = [
    {
      title: 'Sr',
      dataIndex: 'key',
      width: '4%',
      sorter: (a, b) => a.key - b.key,
    }, {
      title: 'Subject',
      dataIndex: 'subject',
      width: '30%',
      sorter: (a, b) => a.subject.localeCompare(b.subject),
      ...TableColumnFilter(ads.tableIndividualColFilter, 'subject', filterIndividualColArr),
      render: (a) => <div className="text-in-single-line" title={a}>{a}</div>,
    }, {
      title: 'Module',
      dataIndex: 'module',
      width: '12%',
      sorter: (a, b) => a.module.localeCompare(b.module),
      ...TableColumnFilter(ads.tableIndividualColFilter, 'module', filterIndividualColArr)
    }, {
      title: 'Sub module',
      dataIndex: 'sub_module',
      width: '12%',
      sorter: (a, b) => a.sub_module.localeCompare(b.sub_module),
      ...TableColumnFilter(ads.tableIndividualColFilter, 'sub_module', filterIndividualColArr)
    }, {
      title: 'Type',
      dataIndex: 'section_ref_name',
      align: 'center',
      width: '7%',
      sorter: (a, b) => a.section_ref_name.localeCompare(b.section_ref_name),
      ...TableColumnFilter(ads.tableIndividualColFilter, 'section_ref_name', filterIndividualColArr),
      render: (a) => UCFirst(a)
    }, {
      title: 'Inserted Date',
      dataIndex: 'inserted_date_formatted',
      width: '16%',
      sorter: SortableDateInTableData('inserted_date_formatted'),
      ...TableColumnFilter(ads.tableIndividualColFilter, 'inserted_date_formatted', filterIndividualColArr)
    }, {
      title: 'Reason',
      dataIndex: 'failed_reason',
      align: 'center',
      width: '9%',
      sorter: SortableDateInTableData('failed_reason'),
      ...TableColumnFilter(ads.tableIndividualColFilter, 'failed_reason', filterIndividualColArr),
      render: (a, b) => <button className="btnToLink" type="button" onClick={() => { setFailedReasonHold(b); setFailedReasonModal(true) }}><i className="fs-18 las la-comment link-color" /></button>
    }
  ];
  failedColumn.push(actionColumn);

  const sentColumn = [
    {
      title: 'Sr',
      dataIndex: 'key',
      width: '4%',
      sorter: (a, b) => a.key - b.key,
    }, {
      title: 'Subject',
      dataIndex: 'subject',
      width: '40%',
      sorter: (a, b) => a.subject.localeCompare(b.subject),
      ...TableColumnFilter(ads.tableIndividualColFilter, 'subject', filterIndividualColArr),
      render: (a, b) => <div className="text-in-single-line" title={a}>{a}</div>,
    }, {
      title: 'Module',
      dataIndex: 'module',
      width: '12%',
      sorter: (a, b) => a.module.localeCompare(b.module),
      ...TableColumnFilter(ads.tableIndividualColFilter, 'module', filterIndividualColArr)
    }, {
      title: 'Sub module',
      dataIndex: 'sub_module',
      width: '12%',
      sorter: (a, b) => a.sub_module.localeCompare(b.sub_module),
      ...TableColumnFilter(ads.tableIndividualColFilter, 'sub_module', filterIndividualColArr)
    }, {
      title: 'Type',
      dataIndex: 'section_ref_name',
      align: 'center',
      width: '7%',
      sorter: (a, b) => a.section_ref_name.localeCompare(b.section_ref_name),
      ...TableColumnFilter(ads.tableIndividualColFilter, 'section_ref_name', filterIndividualColArr),
      render: (a) => UCFirst(a)
    }, {
      title: 'Sent Date',
      dataIndex: 'sent_date_formatted',
      width: '15%',
      sorter: SortableDateInTableData('sent_date_formatted'),
      ...TableColumnFilter(ads.tableIndividualColFilter, 'sent_date_formatted', filterIndividualColArr)
    }
  ];
  sentColumn.push(actionColumn);

  return (
    <div>
      <PageTitle
        titleIcon="las la-paper-plane"
        titleSpan="Email"
        titleHeading="Sent List"
        titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
        breadcrumb={[
          { iconLas: 'las la-cog', label: 'Settings' },
          { iconLas: 'las la-paper-plane', label: 'Email Sent List' }
        ]}
      />
      <div className="container">
        <ScreenLoader active={mainLoader}>
          {mainLoader && <div className="h-250" />}
          <Tabs type="card" defaultActiveKey={currentTabIndex.toString()} onChange={(e) => getData(e, true)}
            tabBarExtraContent={
              <Button type="link" onClick={() => reloadCurrentTab(currentTabIndex)}>
                <i className="las la-sync fs-16 pos-relative top-1" /> &nbsp;Refresh / Reload Data
              </Button>
            }
          >
            {Object.keys(statusList).map((item, index) => {

              if (statusList[item] === 'Failed to Send' && !AccessControl(183)) { return false; }
              if (statusList[item] === 'Sent Successfully' && !AccessControl(186)) { return false; }
              if (statusList[item] === 'Deleted' && !AccessControl(189)) { return false; }

              return (
                <TabPane tab={<span><i className={statusList[item].icon} /> {statusList[item].name}
                  {/* ({(st.listData[item].data.length)}) */}
                </span>} key={(index + 1)}>
                  <ScreenLoader active={logLoader}>
                    <DataTable
                      columns={item === 'sent' ? sentColumn : failedColumn}
                      styleType={2}
                      dataSource={listData[item]}
                      showSizeChanger={true}
                      pagination={{ itemDetails: true, showOnSinglePage: true }}
                      label={<span><span className="fw-400">Email(s)</span> <strong>{statusList[item].name}</strong> <i className={statusList[item].icon} /></span>}
                      desc={statusList[item].sub_title}
                      customFilter="true"
                      customFilterLabel="Filter by"
                      customFilterCol={[
                        { label: 'Subject', value: 'subject' },
                        { label: 'Module', value: 'module' },
                        { label: 'Sub Module', value: 'sub_module' },
                        { label: 'Type', value: 'section_ref_name' },
                        { label: 'Inserted Date', value: 'inserted_date_formatted' }
                      ]}
                    />
                  </ScreenLoader>
                </TabPane>
              )
            })}
          </Tabs>
        </ScreenLoader>
      </div>
      <ViewDetails id={viewId} show={showViewDetails} onClose={() => setShowViewDetails(false)} />
      <Modal
        width={550}
        maskClosable={false}
        className="hide-header hide-footer"
        centered={true}
        // title={''}
        visible={failedReasonModal}
        onOk={() => setFailedReasonModal(false)}
        onCancel={() => setFailedReasonModal(false)}
      // destroyOnClose={true}
      >
        <button type="button" className="hide-header-close-btn btnToLink" onClick={() => setFailedReasonModal(false)}><i className="las la-times" /></button>
        <div className="modal-modern-title-for-view-details">
          <div>
            <span className="title">Failed Reason</span>
            <span className="sub-title">{failedReasonHold.module} &gt; {failedReasonHold.sub_module}</span>
          </div>
        </div>
        <div className="container">
          <span className="status-close-color">{failedReasonHold.failed_reason}</span>
        </div>
      </Modal>
    </div>
  )//End return
}//End function

export default EmailSentList;