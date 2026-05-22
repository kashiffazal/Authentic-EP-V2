import React, { Component } from 'react';
import { Form, Row, Col, Button, Modal } from 'antd';
import { AntInput } from '../../externalComponents/antd-fields';
import PageTitle from '../mutual/pageTitle';
import ViewPDFInModal from '../mutual/viewPDFInModal';
import { HTTP, GetObjectFromArr, LogResetList, RandomAlphaNumber } from '../../services';
import DataTable from '../../externalComponents/andt-data-table-component';
import ScreenLoader from '../../externalComponents/screen-loader';
import { connect } from 'react-redux';
import StoreGet from '../../../store/get';

class DocumentGeneration extends Component {
  state = {
    postLoader: false,
    getLoader: false,
    getLogLoader: false,
    getListLoader: false,
    listData: {},
    logData: [],
    clientOrSupportWorkerList: {},
    visibleViewModal: false,
    visibleViewFileModal: false,
    pdfPath: null,
    filePath: null,
    getClientServiceListLoader: false,
    clientServiceList: {},

    takeData: null,
    takeDataShowModal: false,
    holdFormData: {}
  }//End state

  formRefInitial = React.createRef();
  formRefModal = React.createRef();

  submitForm = (values) => {
    // e && e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (err) { return false }//End if condition
    let other_data = GetObjectFromArr(values.doc_ref_id, 'value', this.state.listData.docList[values.type]);
    values.doc_name = other_data.label;
    values.modal_width = other_data.modal_width;

    if (!this.state.takeData && other_data.take_data) {
      this.setState({ takeDataShowModal: true, holdFormData: values });
      return false;
    }//End if condition

    this.setState({ takeData: null });
    // console.log(values);
    // return false;
    this.setState({ postLoader: true });
    HTTP('post', '/documentGeneration/post/', values).then(res => {
      this.setState({ postLoader: false });
      if (!res) return false;
      values.id = res.id;
      values.folder_name = res.folderName;
      values.file_name = res.fileName
      values.cl_name = values.client_ref_id ? GetObjectFromArr(values.client_ref_id, 'id', this.state.clientOrSupportWorkerList).name : '-';
      values.sp_name = values.spw_ref_id ? GetObjectFromArr(values.spw_ref_id, 'id', this.state.clientOrSupportWorkerList).name : '-';
      this.setState({ logData: LogResetList(values, this.state.logData), takeDataShowModal: false });
    });
    // });
  }//End function

  takeAdditionalData = (values) => {
    // this.formRef.current.validateFields((err, values) => {
    // if (err) { return false }//End if condition
    this.setState({ takeData: true }, () => this.submitForm({ ...values, ...this.state.holdFormData }));
    // });
  }//End function

  getData = () => {
    this.setState({ getLoader: true });
    HTTP('get', '/documentGeneration/get/').then(res => {
      this.setState({ getLoader: false });
      if (!res) return false;
      this.setState({ listData: res.data })
    });
  }//End function

  getListData = (keyword) => {
    this.setState({ getListLoader: true });
    HTTP('get', '/documentGeneration/get/clientOrSupportWorkerList/' + keyword).then(res => {
      this.setState({ getListLoader: false });
      if (!res) return false;
      this.formRefInitial.current.setFieldsValue({ doc_ref_id: '' });
      this.setState({ clientOrSupportWorkerList: res.data })
    });
  }//End function

  getClientServiceList = (id) => {
    this.setState({ getClientServiceListLoader: true });
    HTTP('get', '/documentGeneration/get/getClientServiceList/' + id).then(res => {
      this.setState({ getClientServiceListLoader: false });
      if (!res) return false;
      this.setState({ clientServiceList: res.data })
    });
  }//End if condition

  getLogData = () => {
    this.setState({ getLogLoader: true });
    HTTP('get', '/documentGeneration/get/getList').then(res => {
      this.setState({ getLogLoader: false });
      if (!res) return false;
      this.setState({ logData: res.data, filePath: res.path })
    });
  }//End function

  render() {
    const fp = this.formRefInitial.current;
    const st = this.state;
    const stv_ad = this.props.stv.app_data;
    const stv_cl = this.props.stv.company_data[stv_ad.appClients];
    const columns = [
      {
        title: 'Sr',
        dataIndex: 'key',
        width: '7%',
        sorter: (a, b) => a.key - b.key,
      }, {
        title: 'Document',
        dataIndex: 'doc_name',
        width: '35%',
        sorter: (a, b) => a.doc_name.localeCompare(b.doc_name),

      }, {
        title: 'Support Worker',
        dataIndex: 'sp_name',
        width: '26%',
        sorter: (a, b) => a.sp_name.localeCompare(b.sp_name),
      }, {
        title: 'Client',
        dataIndex: 'cl_name',
        width: '26%',
        sorter: (a, b) => a.cl_name.localeCompare(b.cl_name),
      }, {
        title: 'View',
        align: 'center',
        width: '6%',
        render: (record, row) =>
          <div className="text-center">
            {/* {row.folder_name} - {row.file_name} */}
            {/* <button title="View Details" className="btnToLink" onClick={() => this.setState({ visibleViewModal: true, pdfPath: row.pdfPath })}><i className="fs-18 las la-table link-color"></i></button>
            <i className="list_view_icon_sap las la-redo"></i>
            <button title="Edit" className="btnToLink" onClick={() => { }}><i className="fs-18 las la-edit link-color"></i></button>
            <i className="list_view_icon_sap las la-redo"></i> */}
            <button title="Edit" className="btnToLink" onClick={() => this.setState({ visibleViewFileModal: true, pdfPath: this.state.filePath + '/' + row.folder_name + '/' + row.file_name + '?k=' + RandomAlphaNumber() })}><i className="fs-18 las la-table link-color"></i></button>
          </div>
      }
    ];

    //@ Mobile View Column
    const mobileCol = [
      {
        title: 'Document Name',
        dataIndex: 'doc_name',
        width: '100%',
        className: 'mobile-col',
        render: (record, row) =>
          <div className="col-data" style={{ width: window.screenWidthMobile }}>
            <div className="details">
              <div className="data">
                <div className="main-value">{record}</div>
                <div className="sub-value">
                  {(row.sp_name && row.sp_name !== '-') &&
                    <>
                      <span className="label">SW:</span>
                      <span className="value">{row.sp_name}</span>
                    </>
                  }
                  {(row.cl_name && row.cl_name !== '-') &&
                    <>
                      <span className="label">Client:</span>
                      <span className="value">{row.cl_name}</span>
                    </>
                  }
                </div>
              </div>
            </div>
            <div className="action"><button title="Edit" className="btnToLink" onClick={() => this.setState({ visibleViewFileModal: true, pdfPath: this.state.filePath + '/' + row.folder_name + '/' + row.file_name + '?k=' + RandomAlphaNumber() })}><i className="fs-18 las la-table link-color"></i></button></div>
          </div>
      }];

    return (
      <div>
        <PageTitle
          titleIcon="las la-file-pdf"
          titleSpan="Document"
          titleHeading="Generation"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-file-alt', label: 'Document Generation' },
          ]}
        />

        <Row gutter={window.rowGutter}>
          <Col lg={6} md={12} sm={24} xs={24}>
            <div className="container">

              <Form ref={this.formRefInitial} layout="vertical" onFinish={this.submitForm} className="form-style-1">
                <AntInput type="select" label="Type" name="type" options={st.listData.typeList} filter={true} loading={st.getLoader} onChange={(e) => this.getListData(e)} />
                {fp && fp.getFieldValue('type') === 'client' && <AntInput type="select" label="Client" name="client_ref_id" options={st.clientOrSupportWorkerList} setValueLabel={['id', 'name']} filter={true} onChange={(e) => this.getClientServiceList(e)} />}
                {fp && fp.getFieldValue('type') === 'supportworker' && <AntInput type="select" label="Support Worker" name="spw_ref_id" options={st.clientOrSupportWorkerList} setValueLabel={['id', 'name']} filter={true} />}
                {fp && fp.getFieldValue('type') && <AntInput type="select" label="Document" name="doc_ref_id" options={fp.getFieldValue('type') ? st.listData.docList[fp.getFieldValue('type')] : {}} filter={true} loading={st.getListLoader} />}
                <Button type="primary" className="w-full" htmlType="submit" loading={st.postLoader}>Create Document</Button>
              </Form>

              <Modal
                width={st.holdFormData.modal_width}
                maskClosable={false}
                className="hide-footer"
                centered={true}
                // title={'Please provide additional data for ' + st.holdFormData.doc_name}
                visible={st.takeDataShowModal}
                onOk={() => this.setState({ takeDataShowModal: false })}
                onCancel={() => this.setState({ takeDataShowModal: false })}
                destroyOnClose={true}
              >
                <button type="button" className="hide-header-close-btn btnToLink" onClick={() => this.setState({ takeDataShowModal: false })}><i className="las la-times" /></button>
                <div className="modal-modern-title">
                  <div>
                    <span className="title">{'Required data for creating ' + st.holdFormData.doc_name}</span>
                    <span className="sub-title">Please provide additional data for creating document</span>
                  </div>
                </div>
                <Form ref={this.formRefModal} layout="vertical" onFinish={this.takeAdditionalData} className="form-style-1">

                  {/* {JSON.stringify(st.holdFormData)} */}
                  {st.holdFormData.doc_ref_id === '1' &&
                    <AntInput label="Date of File Closed" type="datepicker" name="varDateOfFileClosed" />
                  }
                  {st.holdFormData.doc_ref_id === '2' &&
                    <React.Fragment>
                      <AntInput label="Document Date" type="datepicker" name="varDocumentDate" placeholder="Date of Document" />
                      <Row gutter={window.rowGutter}>
                        <Col md={12} sm={24} xs={24}><AntInput label="Supporter Involvement" type="textarea" name="varSupporterInvolvement" noRequired={true} placeholder="Please type here" /></Col>
                        <Col md={12} sm={24} xs={24}><AntInput label="Communication And Accessibility Needs" type="textarea" name="varCommunicationAndAccessibilityNeeds" noRequired={true} placeholder="Please type here" /></Col>
                        <Col md={12} sm={24} xs={24}><AntInput label="Health, Wellbeing And Safety Requirements" type="textarea" name="varHealthWellbeingAndSafetyRequirements" noRequired={true} placeholder="Please type here" /></Col>
                        <Col md={12} sm={24} xs={24}><AntInput label="Joint Planning / Case Coordination" type="textarea" name="varJointPlanningCaseCoordination" noRequired={true} placeholder="Please type here" /></Col>
                      </Row>
                      <h4>Connection</h4>
                      <Row gutter={window.rowGutter}>
                        <Col md={12} sm={24} xs={24}><AntInput label="(IF APPLICABLE) Does the client (or their guardian, if applicable) have any preferences regarding their connection to their Aboriginal and Torres Strait Islander culture and community?" type="textarea" name="varConnectionIfApplication1" noRequired={true} placeholder="Please type here" /></Col>
                        <Col md={12} sm={24} xs={24}><AntInput label="(IF APPLICABLE) Does the client (or their guardian, if applicable) have any preferences regarding their cultural, spiritual and/or language connection?" type="textarea" name="varConnectionIfApplication2" noRequired={true} placeholder="Please type here" /></Col>
                        <Col md={12} sm={24} xs={24}><AntInput label="Does the client (or their guardian, if applicable) have any preferences regarding their links to family, friendships and other support networks?" type="textarea" name="varConnectionDoesTheClient" noRequired={true} placeholder="Please type here" /></Col>
                        <Col md={12} sm={24} xs={24}><AntInput label="What barriers to community participation exist for the client? What strategies will be put in place to help the client overcome these?" type="textarea" name="varConnectionWhatBarrier" noRequired={true} placeholder="Please type here" /></Col>
                      </Row>
                      <h4>PERSONAL REFLECTION</h4>
                      <Row gutter={window.rowGutter}>
                        <Col md={12} sm={24} xs={24}><AntInput label="Goals?" type="textarea" name="varPersonalGoals" noRequired={true} placeholder="Please type here" /></Col>
                        <Col md={12} sm={24} xs={24}><AntInput label="Strengths?" type="textarea" name="varPersonalStrengths" noRequired={true} placeholder="Please type here" /></Col>
                        <Col md={12} sm={24} xs={24}><AntInput label="Needs?" type="textarea" name="varPersonalNeeds" noRequired={true} placeholder="Please type here" /></Col>
                        <Col md={12} sm={24} xs={24}><AntInput label="Wishes?" type="textarea" name="varPersonalWishes" noRequired={true} placeholder="Please type here" /></Col>
                        <Col md={24} sm={24} xs={24}><AntInput label={`How can ${stv_cl.name} support these things?`} type="textarea" name="varPersonalHowCanSupportThings" noRequired={true} placeholder="Please type here" /></Col>
                        <Col md={24} sm={24} xs={24}><AntInput label={`How can ${stv_cl.name} support the client to develop, maintain and strengthen their independence, problem solving, social and self-care skills (appropriate to their age, developmental stage and cultural circumstances)?`} type="textarea" name="varPersonalHowCanSupportClients" noRequired={true} placeholder="Please type here" /></Col>
                      </Row>
                      <h4>SERVICE DELIVERY</h4>
                      <AntInput label={`How, when and where will ${stv_cl.name} supports be delivered?`} type="textarea" name="varServiceDeliveryDelivered" noRequired={true} placeholder="Please type here" />
                      <AntInput label={`What other actions will be taken by ${stv_cl.name} to support service delivery? Can referrals and linkages to other services and activities that will enhance the client's community participation be provided?`} type="textarea" name="varServiceDeliverySupport" noRequired={true} placeholder="Please type here" />
                      <AntInput label="How often will service delivery be reviewed?" type="textarea" name="varServiceDeliveryReviewed" noRequired={true} placeholder="Please type here" />
                    </React.Fragment>
                  }
                  {st.holdFormData.doc_ref_id === '3' &&
                    <Row gutter={window.rowGutter}>
                      <Col md={12} sm={24} xs={24}><AntInput type="select" label="Service Type" name="varServiceType" loading={st.getClientServiceListLoader} options={st.clientServiceList} filter={true} /></Col>
                      <Col md={12} sm={24} xs={24}><AntInput label="Commence Date" type="datepicker" name="varCommenceDate" /></Col>
                      <Col md={12} sm={24} xs={24}><AntInput label="For the period (From)" type="datepicker" name="varForThePeriodFrom" /></Col>
                      <Col md={12} sm={24} xs={24}><AntInput label="For the period (To)" type="datepicker" name="varForThePeriodTo" /></Col>
                    </Row>
                  }
                  {st.holdFormData.doc_ref_id === '4' &&
                    <AntInput label="Pay Rate Per Hour ($)" name="varPayRatePerHour" />
                  }
                  {st.holdFormData.doc_ref_id === '7' &&
                    <AntInput label="Orientation Date" type="datepicker" name="varOrientationOn" />
                  }
                  <Button type="primary" className="w-full" htmlType="submit" loading={st.postLoader}>Create Document</Button>
                </Form>
              </Modal>
            </div>
          </Col>
          <Col lg={18} md={12} sm={24} xs={24}>
            <div className={window.webviewMobile ? '' : 'container'}>
              <ScreenLoader active={st.getLogLoader}>
                <DataTable
                  classNameContainer={window.webviewMobile ? 'mobile-table' : ''}
                  columns={window.webviewMobile ? mobileCol : columns}
                  styleType={2}
                  dataSource={st.logData}
                  showSizeChanger={true}
                  pagination={{ itemDetails: true, showOnSinglePage: true }}
                  customFilter="true"
                  customFilterLabel="Filter by"
                  customFilterCol={[
                    { label: 'Document', value: 'doc_name' },
                    { label: 'Support Worker', value: 'sp_name' },
                    { label: 'Client', value: 'cl_name' }
                  ]}
                />
              </ScreenLoader>
              <ViewPDFInModal title="View Support Worker Detailed File" show={st.visibleViewFileModal} close={() => this.setState({ visibleViewFileModal: false })} pdfPath={st.pdfPath} />
            </div>
          </Col>
        </Row>
      </div>
    )//End Return statement
  }//end End Render
  componentDidMount() {
    this.getData();
    this.getLogData();
  }//End componentDidMount
}//End class

export default connect(StoreGet)(DocumentGeneration);