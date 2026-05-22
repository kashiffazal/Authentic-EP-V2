import React, { Component } from 'react';
import PageTitle from '../../mutual/pageTitle';
import { Row, Col, Spin, Button } from 'antd';
import IncidentMainForm from './mainForm';

class IncidentForm extends Component {
  state = {
    loader: false,
    spwInfo: {},
    formNumber: ''
  }
  render() {
    const st = this.state;
    return (
      <React.Fragment>
        <PageTitle
          titleIcon="las la-file-medical"
          titleSpan="Internal Incidents"
          titleHeading="Management Form"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-arrow-alt-circle-down', label: 'Incident' },
            { iconLas: 'las la-file-medical', label: 'Internal Incident Form' }
          ]}
          breadcrumbWithRender={st.formNumber &&
            <div className="formNumber">
              <span className="number"><span>Form #</span>{st.formNumber}</span>
              <Button size="small" ghost type="primary" className="rightButton" onClick={() => window.open(process.env.PUBLIC_URL + '/#/externalWebPages/incidentForm', "_blank")}>External Form</Button>
            </div>
          }
        />
        <Row gutter={window.rowGutter}>
          <Col lg={19} md={24} sm={24} xs={24}>
            <div className="container">
              <IncidentMainForm
                getLoader={(e) => this.setState({ loader: e })}
                getSPWInfo={(e) => this.setState({ spwInfo: e })}
                id={this.props.match.params.id}
                setFormNumber={(e) => this.setState({ formNumber: e })}
                internalForm={true}
              />
            </div>
          </Col>
          <Col lg={5} md={24} sm={24} xs={24}>
            {!window.webviewMobile &&
              <div className="widget_container">
                <div className="container">
                  <h3 className="m-0"><div className="fs-12">Details of the person</div> Filling Up The Form</h3>
                  <hr className="hr-1" />
                  <Spin tip="loading" spinning={st.loader}>
                    {st.loader ? <div style={{ height: '261px' }}></div> :
                      <div className="widget-list">
                        <div>
                          <strong className="dim-color">Name</strong><br />
                          <span>{st.spwInfo.name ? st.spwInfo.name : '-'}</span>
                        </div>
                        <div>
                          <strong className="dim-color">Gender</strong><br />
                          <span>{st.spwInfo.gender ? st.spwInfo.gender : '-'}</span>
                        </div>
                        <div>
                          <strong className="dim-color">Manager Name</strong><br />
                          <span>{st.spwInfo.manager_name ? st.spwInfo.manager_name : '-'}</span>
                        </div>
                        <div>
                          <strong className="dim-color">Contact No</strong><br />
                          <span>{st.spwInfo.mobile ? st.spwInfo.mobile : '-'}</span>
                        </div>
                        <div>
                          <strong className="dim-color">Service Provided to Client</strong><br />
                          {/* ={JSON.stringify(st.spwInfo.service_provided)}= */}
                          <span>{(st.spwInfo.service_provided && st.spwInfo.service_provided.length > 0) ?
                            <table width="100%" border="0">
                              <tbody>
                                {st.spwInfo.service_provided.map((item, i) => {
                                  return (
                                    <tr key={i}>
                                      <td width="10%" valign="top"><i className="las la-check success-color" /></td>
                                      <td width="90%">{item.label}</td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                            : '-'}</span>
                        </div>
                      </div>
                    }
                  </Spin>
                </div>
              </div>
            }
          </Col>
        </Row>
      </React.Fragment>
    )// End return
  }//End render
}//End Class
export default IncidentForm;
