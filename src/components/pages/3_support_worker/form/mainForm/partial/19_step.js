import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import UploadFile from '../../../../../externalComponents/antd-upload-file-component';
import Step19CheckList from './19_step_checklist';

class Step19 extends Component {
  state = {
    fileAccept: ".jpg,.jpeg,.png,.pdf,.doc,.docx",
    fileExtensionType: "jpg,jpeg,png,pdf,doc,docx",
    maxFileSize: "5",
    uploaderTitle: "Click or, drag and drop a file"
  }
  render() {
    const st = this.state;
    const fp = this.props.formProps;
    const data = this.props.data;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    const fv = this.props.formValues;
    const uDoc = this.props.data.list.uploadedDocuments;
    return (
      <React.Fragment>
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          
          
          
          {/* <h2 className="form_heading">Qualifications & Documents</h2>
          <hr className="form_hr" />
          <AntInput
            name="relevantQualifications"
            type="radio"
            label="Do you have any relevant qualifications you would like to tell us about?"
            vertical
            containerClassName="long_label"
            radioOptions={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}

            onChange={e => ocf('relevantQualifications', e)}
          />
          {fv.relevantQualifications === 'yes' &&
            <React.Fragment>
              <div className="content-divider"></div>
              <Row gutter={window.rowGutter} >
                <Col lg={24}>
                  <AntInput label="Type of qualification" type="select" name="typeOfQualification"
                    options={[
                      { label: 'Secondary School Certificate' },
                      { label: 'Trade or Vocational' },
                      { label: 'Certificate' },
                      { label: 'Diploma' },
                      { label: 'Degree' },
                      { label: 'Post Graduate Certificate' },
                      { label: 'Post Graduate Diploma' },
                      { label: 'Masters' },
                      { label: 'Other' }
                    ]}
                    onChange={e => ocf('typeOfQualification', e)}
                    noRequired
                  />
                </Col>
              </Row>
              {fv.typeOfQualification === 'Other' &&
                <AntInput label="If you have selected Other, please tell us what type of qualification your hold" name="otherQulification" noRequired onChange={e => ocf('otherQulification', e)} />
              }
              <Row gutter={window.rowGutter} >
                <Col lg={12} md={24} sm={24} xs={24}>
                  <AntInput label="Qualification certificate name" name="qualCertificateName" noRequired onChange={e => ocf('qualCertificateName', e)} />
                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                  <AntInput label="Qualification completed or expected completion year" type="select" name="qualCompleteYear" options={data.list.years} noRequired onChange={e => ocf('qualCompleteYear', e)} />
                </Col>
                <Col lg={24}>
                  <AntInput label="Qualification issuing body name e.g., school, university, TAFE name)?" name="qualSchoolUniName" noRequired onChange={e => ocf('qualSchoolUniName', e)} />
                </Col>
              </Row>
              <AntInput
                name="anotherQulification"
                type="radio"
                label="Would you like to add another qualification?"
                vertical
                containerClassName="long_label"
                radioOptions={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}

                onChange={e => ocf('anotherQulification', e)}
                noRequired
              />
              <div className="content-divider"></div>

              {fv.anotherQulification === 'yes' &&
                <React.Fragment>
                  <Row gutter={window.rowGutter} >
                    <Col lg={24}>
                      <AntInput label="Type of qualification" type="select" name="anotherTypeOfQualification"
                        options={[
                          { label: 'Secondary School Certificate' },
                          { label: 'Trade or Vocational' },
                          { label: 'Certificate' },
                          { label: 'Diploma' },
                          { label: 'Degree' },
                          { label: 'Post Graduate Certificate' },
                          { label: 'Post Graduate Diploma' },
                          { label: 'Masters' },
                          { label: 'Other' }
                        ]}
                        onChange={e => ocf('anotherTypeOfQualification', e)}
                        noRequired
                      />
                    </Col>
                  </Row>
                  {fv.anotherTypeOfQualification === 'Other' &&
                    <Row gutter={window.rowGutter} >
                      <Col lg={24}>
                        <AntInput label="If you have selected Other, please tell us what type of qualification your hold" name="anotherOtherQulification" noRequired onChange={e => ocf('anotherOtherQulification', e)} />
                      </Col>
                    </Row>
                  }
                  <Row gutter={window.rowGutter} >
                    <Col lg={12} md={24} sm={24} xs={24}>
                      <AntInput label="Qualification certificate name" name="anotherQualCertificateName" noRequired onChange={e => ocf('anotherQualCertificateName', e)} />
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24}>
                      <AntInput label="Qualification completed or expected completion year" type="select" name="anotherQualCompleteYear" options={data.list.years_old} noRequired onChange={e => ocf('anotherQualCompleteYear', e)} />
                    </Col>
                    <Col lg={24}>
                      <AntInput label="Qualification issuing body name e.g., school, university, TAFE name)?" name="anotherQualSchoolUniName" noRequired onChange={e => ocf('anotherQualSchoolUniName', e)} />
                    </Col>
                  </Row>

                </React.Fragment>
              }
            </React.Fragment>
          } */}



          <Step19CheckList uDoc={uDoc} fv={fv} fp={fp} fsh={fsh} ocf={ocf}/>
          <div className="h-10"/>
          <div className="content-divider"></div>
          <h2 className="form_heading_sub">Upload other Document(s)</h2>
          <hr className="form_hr_sub" />
          <div className="upload-documents-container">
            <Row gutter={window.rowGutterSmall}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <p>
                  Please Upload NDIS Workers Screening Check:<br />Your NDIS Workers Screening ID is: <br /><strong>{fv.ndis_workers_screening_id}</strong>
                </p>

              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                <UploadFile formProps={fp} name="ndisWorkersWcreeningDoc" uploadedDocuments={uDoc.ndisWorkersWcreeningDoc} filePath={`${fv.filePath}ndisWorkersWcreeningDoc/`} value={fv.ndisWorkersWcreeningDoc} onChange={e => ocf('ndisWorkersWcreeningDoc', e)} title={st.uploaderTitle} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
              </Col>
            </Row>

            <Row gutter={window.rowGutterSmall}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput
                  name="haveCovid19VaccinationsProof"
                  onChange={e => ocf('haveCovid19VaccinationsProof', e)}
                  label="COVID - 19 Vaccinations Proof" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                {fv.haveCovid19VaccinationsProof === 'yes' &&
                  <UploadFile
                    formProps={fp}
                    name="uploadCovid19VaccinationsProof"
                    uploadedDocuments={uDoc.uploadCovid19VaccinationsProof}
                    filePath={`${fv.filePath}uploadCovid19VaccinationsProof/`}
                    value={fv.uploadCovid19VaccinationsProof}
                    onChange={e => ocf('uploadCovid19VaccinationsProof', e)}
                    title={st.uploaderTitle}
                    accept={st.fileAccept}
                    restrictExtension={st.fileExtensionType}
                    fileSize={st.maxFileSize}
                  />
                }</Col>
            </Row>

            <Row gutter={window.rowGutterSmall}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput
                  name="haveResume"
                  onChange={e => ocf('haveResume', e)}
                  label="Do you have a CV?" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                {fv.haveResume === 'yes' &&
                  <UploadFile formProps={fp} name="uploadCV" uploadedDocuments={uDoc.uploadCV} filePath={`${fv.filePath}uploadCV/`} value={fv.uploadCV} onChange={e => ocf('uploadCV', e)} title={st.uploaderTitle} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                }</Col>
            </Row>

            <div className="content-divider"></div>
            <Row gutter={window.rowGutterSmall}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput
                  name="haveStudentIdCatd"
                  onChange={e => ocf('haveStudentIdCatd', e)}
                  label="Do you have Student ID Card?" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>{fv.haveStudentIdCatd === 'yes' &&
                <UploadFile formProps={fp} name="uploadStudentIdCard" uploadedDocuments={uDoc.uploadStudentIdCard} filePath={`${fv.filePath}uploadStudentIdCard/`} value={fv.uploadStudentIdCard} onChange={e => ocf('uploadStudentIdCard', e)} title={st.uploaderTitle} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
              }</Col>
            </Row>

            {/* <div className="content-divider"></div>
            <Row gutter={window.rowGutterSmall}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput
                  name="haveDrivingLicense"
                  onChange={e => ocf('haveDrivingLicense', e)}
                  label="Do you have Driving License?" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                />
              </Col>
              <Col lg={6} md={6} sm={24} xs={24}>
                {fv.haveDrivingLicense === 'yes' &&
                  <UploadFile formProps={fp} name="uploadDrivingLicenseFront" title="Upload" msg="Front Copy" uploadedDocuments={uDoc.uploadDrivingLicenseFront} filePath={`${fv.filePath}uploadDrivingLicenseFront/`} value={fv.uploadDrivingLicenseFront} onChange={e => ocf('uploadDrivingLicenseFront', e)} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                }
              </Col>
              <Col lg={6} md={6} sm={24} xs={24}>
                {fv.haveDrivingLicense === 'yes' &&
                  <UploadFile formProps={fp} name="uploadDrivingLicenseBack" title="Upload" msg="Back Copy" uploadedDocuments={uDoc.uploadDrivingLicenseBack} filePath={`${fv.filePath}uploadDrivingLicenseBack/`} value={fv.uploadDrivingLicenseBack} onChange={e => ocf('uploadDrivingLicenseBack', e)} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                }
              </Col>
            </Row> */}

            <div className="content-divider"></div>
            <Row gutter={window.rowGutterSmall}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput
                  name="haveCarInsurance"
                  onChange={e => ocf('haveCarInsurance', e)}
                  label="Do you have Car Insurance Details?" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                {fv.haveCarInsurance === 'yes' &&
                  <UploadFile formProps={fp} name="uploadCarInsurance" uploadedDocuments={uDoc.uploadCarInsurance} filePath={`${fv.filePath}uploadCarInsurance/`} value={fv.uploadCarInsurance} onChange={e => ocf('uploadCarInsurance', e)} title={st.uploaderTitle} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                }
              </Col>
            </Row>

            {/* <div className="content-divider"></div>
            <Row gutter={window.rowGutterSmall}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput
                  name="havePassportCopy"
                  onChange={e => ocf('havePassportCopy', e)}
                  label="Do you have Passport Copy (if you are a foreigner)?" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                />
              </Col>
              <Col lg={6} md={6} sm={24} xs={24}>
                {fv.havePassportCopy === 'yes' &&
                  <UploadFile formProps={fp} name="uploadCopyOfPassportOne" title="Upload" msg="Cooy 1" uploadedDocuments={uDoc.uploadCopyOfPassportOne} filePath={`${fv.filePath}uploadCopyOfPassportOne/`} value={fv.uploadCopyOfPassportOne} onChange={e => ocf('uploadCopyOfPassportOne', e)} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                }
              </Col>
              <Col lg={6} md={6} sm={24} xs={24}>
                {fv.havePassportCopy === 'yes' &&
                  <UploadFile formProps={fp} name="uploadCopyOfPassportTwo" title="Upload" msg="Cooy 2" uploadedDocuments={uDoc.uploadCopyOfPassportTwo} filePath={`${fv.filePath}uploadCopyOfPassportTwo/`} value={fv.uploadCopyOfPassportTwo} onChange={e => ocf('uploadCopyOfPassportTwo', e)} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                }
              </Col>
            </Row> */}

            <div className="content-divider"></div>
            <Row gutter={window.rowGutterSmall}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput
                  name="havePoliceCheck"
                  onChange={e => ocf('havePoliceCheck', e)}
                  label="Do you have Current Police Check (if you are foreigner and here in Australia in less than 10 years, please provide international police check)" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                {fv.havePoliceCheck === 'yes' &&
                  <UploadFile formProps={fp} name="uploadPoliceCheck" uploadedDocuments={uDoc.uploadPoliceCheck} filePath={`${fv.filePath}uploadPoliceCheck/`} value={fv.uploadPoliceCheck} onChange={e => ocf('uploadPoliceCheck', e)} title={st.uploaderTitle} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                }
              </Col>
            </Row>

            <div className="content-divider"></div>
            <Row gutter={window.rowGutterSmall}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput
                  name="haveWorkChildrenCard"
                  onChange={e => ocf('haveWorkChildrenCard', e)}
                  label="Working with Children Card?" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                />
              </Col>
              <Col lg={6} md={6} sm={24} xs={24}>
                {fv.haveWorkChildrenCard === 'yes' &&
                  <UploadFile formProps={fp} name="uploadWorkChildrenCardOne" title="Upload" msg="Copy 1" uploadedDocuments={uDoc.uploadWorkChildrenCardOne} filePath={`${fv.filePath}uploadWorkChildrenCardOne/`} value={fv.uploadWorkChildrenCardOne} onChange={e => ocf('uploadWorkChildrenCardOne', e)} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                }
              </Col>
              <Col lg={6} md={6} sm={24} xs={24}>
                {fv.haveWorkChildrenCard === 'yes' &&
                  <UploadFile formProps={fp} name="uploadWorkChildrenCardTwo" title="Upload" msg="Copy 2" uploadedDocuments={uDoc.uploadWorkChildrenCardTwo} filePath={`${fv.filePath}uploadWorkChildrenCardTwo/`} value={fv.uploadWorkChildrenCardTwo} onChange={e => ocf('uploadWorkChildrenCardTwo', e)} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                }
              </Col>
            </Row>

            <div className="content-divider"></div>
            <Row gutter={window.rowGutterSmall}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput
                  name="haveFirstAidCertificate"
                  onChange={e => ocf('haveFirstAidCertificate', e)}
                  label="Do you have First Aid Certificate?" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                {fv.haveFirstAidCertificate === 'yes' &&
                  <UploadFile formProps={fp} name="uploadFirstAidCertificate" uploadedDocuments={uDoc.uploadFirstAidCertificate} filePath={`${fv.filePath}uploadFirstAidCertificate/`} value={fv.uploadFirstAidCertificate} onChange={e => ocf('uploadFirstAidCertificate', e)} title={st.uploaderTitle} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                }
              </Col>
            </Row>

            <div className="content-divider"></div>
            <Row gutter={window.rowGutterSmall}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput
                  name="haveCPRCertificate"
                  onChange={e => ocf('haveCPRCertificate', e)}
                  label="Do you have CPR certificate?" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                {fv.haveCPRCertificate === 'yes' &&
                  <UploadFile formProps={fp} name="uploadCPRCertificate" uploadedDocuments={uDoc.uploadCPRCertificate} filePath={`${fv.filePath}uploadCPRCertificate/`} value={fv.uploadCPRCertificate} onChange={e => ocf('uploadCPRCertificate', e)} title={st.uploaderTitle} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                }
              </Col>
            </Row>

            <div className="content-divider"></div>
            <Row gutter={window.rowGutterSmall}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput
                  name="haveManualHandlingCertificate"
                  onChange={e => ocf('haveManualHandlingCertificate', e)}
                  label="Do you have Manual Handling Certificate " vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                {fv.haveManualHandlingCertificate === 'yes' &&
                  <UploadFile formProps={fp} name="uploadManualHandlingCertificate" uploadedDocuments={uDoc.uploadManualHandlingCertificate} filePath={`${fv.filePath}uploadManualHandlingCertificate/`} value={fv.uploadManualHandlingCertificate} onChange={e => ocf('uploadManualHandlingCertificate', e)} title={st.uploaderTitle} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                }
              </Col>
            </Row>

            <div className="content-divider"></div>
            <Row gutter={window.rowGutterSmall}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput
                  name="haveFoodHandlingCertificate"
                  onChange={e => ocf('haveFoodHandlingCertificate', e)}
                  label="Do you have Food Handling Certificate" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                {fv.haveFoodHandlingCertificate === 'yes' &&
                  <UploadFile formProps={fp} name="uploadFoodHandlingCertificate" uploadedDocuments={uDoc.uploadFoodHandlingCertificate} filePath={`${fv.filePath}uploadFoodHandlingCertificate/`} value={fv.uploadFoodHandlingCertificate} onChange={e => ocf('uploadFoodHandlingCertificate', e)} title={st.uploaderTitle} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                }
              </Col>
            </Row>

            <div className="content-divider"></div>
            <Row gutter={window.rowGutterSmall}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput
                  name="haveWorkingOrVisa"
                  onChange={e => ocf('haveWorkingOrVisa', e)}
                  label="Do you have evidence of working or Visa (If you're a foreigner)?" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                {fv.haveWorkingOrVisa === 'yes' &&
                  <UploadFile formProps={fp} name="uploadWorkingOrVisa" uploadedDocuments={uDoc.uploadWorkingOrVisa} filePath={`${fv.filePath}uploadWorkingOrVisa/`} value={fv.uploadWorkingOrVisa} onChange={e => ocf('uploadWorkingOrVisa', e)} title={st.uploaderTitle} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                }
              </Col>
            </Row>

            <div className="content-divider"></div>
            <Row gutter={window.rowGutterSmall}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput
                  name="haveNDISWorOriComCer"
                  onChange={e => ocf('haveNDISWorOriComCer', e)}
                  label="Do you have NDIS Worker Orientation Completion Certificate?" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                {fv.haveNDISWorOriComCer === 'yes' &&
                  <UploadFile formProps={fp} name="uploadNDISWorOriComCer" uploadedDocuments={uDoc.uploadNDISWorOriComCer} filePath={`${fv.filePath}uploadNDISWorOriComCer/`} value={fv.uploadNDISWorOriComCer} onChange={e => ocf('uploadNDISWorOriComCer', e)} title={st.uploaderTitle} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                }
              </Col>
            </Row>

            <div className="content-divider"></div>
            <Row gutter={window.rowGutterSmall}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput
                  name="haveDiplomaOfNursing"
                  onChange={e => ocf('haveDiplomaOfNursing', e)}
                  label="Do you have Diploma of Nursing Certificate 4 in Aged Care?" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                {fv.haveDiplomaOfNursing === 'yes' &&
                  <UploadFile formProps={fp} name="uploadDiplomaOfNursing" uploadedDocuments={uDoc.uploadDiplomaOfNursing} filePath={`${fv.filePath}uploadDiplomaOfNursing/`} value={fv.uploadDiplomaOfNursing} onChange={e => ocf('uploadDiplomaOfNursing', e)} title={st.uploaderTitle} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                }
              </Col>
            </Row>

            <div className="content-divider"></div>
            <Row gutter={window.rowGutterSmall}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput
                  name="haveCertificate3Disability"
                  onChange={e => ocf('haveCertificate3Disability', e)}
                  label="Do you have Certificate 3 in Disability or Individual Support?" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                {fv.haveCertificate3Disability === 'yes' &&
                  <UploadFile formProps={fp} name="uploadCertificate3Disability" uploadedDocuments={uDoc.uploadCertificate3Disability} filePath={`${fv.filePath}uploadCertificate3Disability/`} value={fv.uploadCertificate3Disability} onChange={e => ocf('uploadCertificate3Disability', e)} title={st.uploaderTitle} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                }
              </Col>
            </Row>

            <div className="content-divider"></div>
            <Row gutter={window.rowGutterSmall}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput
                  name="haveCertificate4Disability"
                  onChange={e => ocf('haveCertificate4Disability', e)}
                  label="Do you have Certificate 4 in Disability or Individual Support?" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                {fv.haveCertificate4Disability === 'yes' &&
                  <UploadFile formProps={fp} name="uploadCertificate4Disability" uploadedDocuments={uDoc.uploadCertificate4Disability} filePath={`${fv.filePath}uploadCertificate4Disability/`} value={fv.uploadCertificate4Disability} onChange={e => ocf('uploadCertificate4Disability', e)} title={st.uploaderTitle} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                }
              </Col>
            </Row>

            <div className="content-divider"></div>
            <Row gutter={window.rowGutterSmall}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput
                  name="haveCertificate4Diploma"
                  onChange={e => ocf('haveCertificate4Diploma', e)}
                  label="Do you have Certificate 4 or Diploma in Mental Health?" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                {fv.haveCertificate4Diploma === 'yes' &&
                  <UploadFile formProps={fp} name="uploadCertificate4Diploma" uploadedDocuments={uDoc.uploadCertificate4Diploma} filePath={`${fv.filePath}uploadCertificate4Diploma/`} value={fv.uploadCertificate4Diploma} onChange={e => ocf('uploadCertificate4Diploma', e)} title={st.uploaderTitle} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                }
              </Col>
            </Row>
            {fv.relevantQualifications === 'yes' &&
              <React.Fragment>
                <div className="content-divider"></div>
                <Row gutter={window.rowGutterSmall}>
                  <Col lg={12} md={12} sm={24} xs={24}>
                    <AntInput
                      name="haveRelevantQulification"
                      onChange={e => ocf('haveRelevantQulification', e)}
                      label="Do you have any other relevant qualification documents?" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                    />
                  </Col>
                  <Col lg={12} md={12} sm={24} xs={24}>
                    {fv.haveRelevantQulification === 'yes' &&
                      <UploadFile formProps={fp} name="uploadCertificates" uploadedDocuments={uDoc.uploadCertificates} filePath={`${fv.filePath}uploadCertificates/`} value={fv.uploadCertificates} onChange={e => ocf('uploadCertificates', e)} title={st.uploaderTitle} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                    }
                  </Col>
                </Row>
              </React.Fragment>
            }
            <div className="content-divider"></div>
            <Row gutter={window.rowGutterSmall}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput
                  name="haveOtherDocuments"
                  onChange={e => ocf('haveOtherDocuments', e)}
                  label="Do you have other document(s) to upload, if not mendtioned above?" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                {/* {fp && JSON.stringify(fp.getFieldValue('uploadOtherDocuments'))} */}
                {fv.haveOtherDocuments === 'yes' &&
                  <UploadFile formProps={fp} name="uploadOtherDocuments" uploadedDocuments={uDoc.uploadOtherDocuments} multiple={true} filePath={`${fv.filePath}uploadOtherDocuments/`} value={fv.uploadOtherDocuments} onChange={e => ocf('uploadOtherDocuments', e)} title={st.uploaderTitle} accept={st.fileAccept} restrictExtension={st.fileExtensionType} fileSize={st.maxFileSize} />
                }
              </Col>
            </Row>
          </div>

        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    let formObj = {};
    formObj['relevantQualifications'] = fv.relevantQualifications;
    if (fv.relevantQualifications === 'yes') {
      formObj['haveRelevantQulification'] = fv.haveRelevantQulification;
      formObj['typeOfQualification'] = fv.typeOfQualification;
      formObj['qualCertificateName'] = fv.qualCertificateName;
      formObj['qualCompleteYear'] = fv.qualCompleteYear;
      formObj['qualSchoolUniName'] = fv.qualSchoolUniName;
      formObj['anotherQulification'] = fv.anotherQulification;

      if (fv.typeOfQualification === 'Other') {
        formObj['otherQulification'] = fv.otherQulification;
      }//End if condition

      if (fv.anotherQulification) {
        formObj['anotherTypeOfQualification'] = fv.anotherTypeOfQualification;
        formObj['anotherQualCertificateName'] = fv.anotherQualCertificateName;
        formObj['anotherQualCompleteYear'] = fv.anotherQualCompleteYear;
        formObj['anotherQualSchoolUniName'] = fv.anotherQualSchoolUniName;
      }//End if condition

      if (fv.anotherTypeOfQualification === 'Other') {
        formObj['anotherOtherQulification'] = fv.anotherOtherQulification;
      }//End if condition
    }//End if condition

    formObj['haveResume'] = fv.haveResume;
    formObj['haveCovid19VaccinationsProof'] = fv.haveCovid19VaccinationsProof;
    formObj['haveStudentIdCatd'] = fv.haveStudentIdCatd;
    // formObj['haveDrivingLicense'] = fv.haveDrivingLicense;
    formObj['haveCarInsurance'] = fv.haveCarInsurance;
    // formObj['havePassportCopy'] = fv.havePassportCopy;
    formObj['havePoliceCheck'] = fv.havePoliceCheck;
    formObj['haveWorkChildrenCard'] = fv.haveWorkChildrenCard;
    formObj['haveFirstAidCertificate'] = fv.haveFirstAidCertificate;
    formObj['haveCPRCertificate'] = fv.haveCPRCertificate;
    formObj['haveManualHandlingCertificate'] = fv.haveManualHandlingCertificate;
    formObj['haveFoodHandlingCertificate'] = fv.haveFoodHandlingCertificate;
    formObj['haveWorkingOrVisa'] = fv.haveWorkingOrVisa;
    formObj['haveNDISWorOriComCer'] = fv.haveNDISWorOriComCer;
    formObj['haveDiplomaOfNursing'] = fv.haveDiplomaOfNursing;
    formObj['haveCertificate3Disability'] = fv.haveCertificate3Disability;
    formObj['haveCertificate4Disability'] = fv.haveCertificate4Disability;
    formObj['haveCertificate4Diploma'] = fv.haveCertificate4Diploma;
    formObj['haveOtherDocuments'] = fv.haveOtherDocuments;
    this.props.formProps.setFieldsValue(formObj)
  }//End componentDidMount
}//End class

export default Step19;