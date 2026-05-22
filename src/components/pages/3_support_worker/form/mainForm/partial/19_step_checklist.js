import React, { useState, useEffect } from 'react';
import { Row, Col, Progress } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import UploadFile from '../../../../../externalComponents/antd-upload-file-component';

const Step19CheckList = (pr) => {
  const [totalPoint, setTotalPoint] = useState(0);
  //@ Files Variables
  const fileAccept = '.jpg,.jpeg,.png,.pdf,.doc,.docx';
  const fileExtensionType = "jpg,jpeg,png,pdf,doc,docx";
  const maxFileSize = "5";
  // const uploaderTitle = "Click or, drag and drop a file";
  //@ Set Props
  const fp = pr.fp;
  const ocf = pr.ocf;
  const fsh = pr.fsh;//Form section heading
  const fv = pr.fv;
  const uDoc = pr.uDoc;

  useEffect(() => {
    let fv = pr.fv;
    let formObj = {};
    formObj['havePassportCopy'] = fv.havePassportCopy;
    formObj['haveAustPassportCopy'] = fv.haveAustPassportCopy;
    formObj['haveAustCitizenCertificate'] = fv.haveAustCitizenCertificate;
    formObj['haveFullBirthCertificate'] = fv.haveFullBirthCertificate;
    formObj['haveIdentityRefugeesCertificate'] = fv.haveIdentityRefugeesCertificate;
    formObj['haveDrivingLicense'] = fv.haveDrivingLicense;
    formObj['haveIdentityCard'] = fv.haveIdentityCard;
    formObj['haveIdentityCardPhoto'] = fv.haveIdentityCardPhoto;
    formObj['haveGovEmpId'] = fv.haveGovEmpId;
    formObj['haveForceIdentityCard'] = fv.haveForceIdentityCard;
    formObj['haveDVACard'] = fv.haveDVACard;
    formObj['haveCentrelinkCard'] = fv.haveCentrelinkCard;
    formObj['haveBirthExtractCertificate'] = fv.haveBirthExtractCertificate;
    formObj['haveBirthCard'] = fv.haveBirthCard;
    formObj['haveMedicareCard'] = fv.haveMedicareCard;
    formObj['haveCreditCard'] = fv.haveCreditCard;
    formObj['haveAustMarriageCertificate'] = fv.haveAustMarriageCertificate;
    formObj['haveDceNisiAbs'] = fv.haveDceNisiAbs;
    formObj['haveChangeOfNameCertificate'] = fv.haveChangeOfNameCertificate;
    formObj['haveBankStatement'] = fv.haveBankStatement;
    formObj['haveProLeaseAgreement'] = fv.haveProLeaseAgreement;
    formObj['haveTaxAssessNotice'] = fv.haveTaxAssessNotice;
    formObj['haveAustMortgageDoc'] = fv.haveAustMortgageDoc;
    formObj['haveRatingAuthority'] = fv.haveRatingAuthority;
    formObj['haveUtilityBill'] = fv.haveUtilityBill;
    formObj['haveRefIndigenousOrg'] = fv.haveRefIndigenousOrg;
    formObj['haveDocIssuedOutAust'] = fv.haveDocIssuedOutAust;
    pr.fp.setFieldsValue(formObj)
    setTotalPoint(fv.totalCheckListNumber ? fv.totalCheckListNumber : 0);
    !fv.totalCheckListNumber && ocf('totalCheckListNumber', 0);
    checkIsPrimaryDocGiven();
  }, []);

  const checkIsPrimaryDocGiven = () => {
    let status = 'false';
    if (fv['id']) {
      const primaryCheckboxToCheck = ['havePassportCopy', 'haveAustPassportCopy', 'haveAustCitizenCertificate', 'haveFullBirthCertificate', 'haveIdentityRefugeesCertificate', 'haveDrivingLicense', 'haveIdentityCard', 'haveIdentityCardPhoto', 'haveGovEmpId', 'haveForceIdentityCard'];
      for (let i = 0; i < primaryCheckboxToCheck.length; i++) {
        if (fv[primaryCheckboxToCheck[i]]) { status = 'true'; break; }
      }//End for loop
    } else {
      const primaryDocListToCheck = ['uploadCopyOfPassportOne', 'uploadCopyOfPassportTwo', 'uploadCopyOfAustPassportOne', 'uploadCopyOfAustPassportTwo', 'uploadAustCitizenCertificate', 'uploadFullBirthCertificate', 'uploadIdentityRefugeesCertificate', 'uploadDrivingLicenseFront', 'uploadDrivingLicenseBack', 'uploadIdentityCard', 'uploadIdentityCardPhoto', 'uploadGovEmpId', 'uploadForceIdentityCard'];
      for (let i = 0; i < primaryDocListToCheck.length; i++) {
        if (fv[primaryDocListToCheck[i]]) { status = 'true'; break; }
      }//End for loop
    }//End if condition
    ocf('primaryDocAvailable', status);
  }//End function

  const pointCalculate = (point, fileArr) => {
    let calculatePoint = 0;
    let keyword = fileArr.length > 0 ? 'add' : 'remove';
    if (keyword === 'add') { calculatePoint = parseInt(totalPoint + point); }
    if (keyword === 'remove') { calculatePoint = parseInt(totalPoint - point); }
    // if(calculatePoint < 0){calculatePoint = 0;}
    setTotalPoint(calculatePoint);
    ocf('totalCheckListNumber', calculatePoint);
    checkIsPrimaryDocGiven();
  }//End function

  const pointCalculateOnCheckbox = (point, checkboxChecked, file1, file2 = false) => {
    let calculatePoint = 0;
    if (((fv[file1] && fv[file1].length > 0) && !file2) || (file2 && ((fv[file1] && fv[file1].length > 0) && (fv[file2] && fv[file2].length > 0)))) {
      if (checkboxChecked) {
        calculatePoint = parseInt(totalPoint + point);
      } else {
        // ocf(file1, undefined);
        // file2 && ocf(file2, undefined);
        if (fv[file1].length !== 0) {
          calculatePoint = parseInt(totalPoint - point);
        }
      }//End if condition
      setTotalPoint(calculatePoint);
      ocf('totalCheckListNumber', calculatePoint);
    }//End if condition
    checkIsPrimaryDocGiven();
  }//End function

  const progressBar = () => {
    return (
      <>
        <div className="fs-12">Total Gained Point(s) <strong>{totalPoint}</strong></div>
        <Progress strokeColor={{ from: '#108ee9', to: '#87d068', }} percent={totalPoint} status="active" />
      </>
    )
  }//End function

  const colWidth = {
    checkbox: { lg: 2, md: 2, sm: 3, xs: 24, align: 'center', flexClass: 'flex-c-m' },
    doc: { lg: 9, md: 10, sm: 21, xs: 24, align: 'left', flexClass: 'flex-l-m' },
    requiredOnDoc: { lg: 3, md: 3, sm: 6, xs: 24, align: 'center', flexClass: 'flex-c-m' },
    pointWorth: { lg: 2, md: 2, sm: 4, xs: 24, align: 'center', flexClass: 'flex-c-m' },
    uploadField: { lg: 6, md: 5, sm: 10, xs: 24, align: 'center', flexClass: 'flex-c-m' },
    pointGained: { lg: 2, md: 2, sm: 4, xs: 24, align: 'center', flexClass: 'flex-c-m' }
  };

  const docListLabelObj = {
    checkbox: <span className="fw-500">Tick if included</span>,
    doc:
      <span>
        <div className="fw-500">You must supply at least ONE Primary document</div>
        <div className="fs-12">Foreign documents <span className="fw-600">must</span> be accompanied by an official translation</div>
      </span>,
    requiredOnDoc: <span className="fw-500">
      Required on document
      {/* <div className="fw-500">Required on document</div> */}
      {/* <div className="fs-11"><span className="fw-600">N</span> = Name, <span className="fw-600">P</span> = photo</div> */}
      {/* <div className="fs-11"><span className="fw-600">A</span> = Address, <span className="fw-600">S</span> = Signature</div> */}
    </span>,
    pointWorth: <span className="fw-500">Point Worth</span>,
    uploadField: <span className="fw-500">Upload Document</span>,
    pointGained: <span className="fw-500">Point Gained</span>
  };

  const docListLabelObjMobile = {
    checkbox: 'Tick',
    doc: 'Document',
    requiredOnDoc: 'Required on Doc',
    pointWorth: 'Point Worth',
    uploadField: 'Upload Document',
    pointGained: 'Point Gained'
  };

  const docListPrimaryArr = [{
    checkbox: <AntInput type="checkbox" name="havePassportCopy" onChange={e => {
      ocf('havePassportCopy', e);
      pointCalculateOnCheckbox(70, e, 'uploadCopyOfPassportOne')
    }} noRequired />,
    doc: <span>Foreign Passport <span className="doc-bracket">(current)</span></span>,
    requiredOnDoc: <span className="fs-12">Name &amp; Photo</span>,
    pointWorth: '70',
    uploadField:
      fv.havePassportCopy &&
      <>
        <UploadFile type="2.1" formProps={fp} name="uploadCopyOfPassportOne" title="Upload File" uploadedDocuments={uDoc.uploadCopyOfPassportOne} filePath={`${fv.filePath}uploadCopyOfPassportOne/`} value={fv.uploadCopyOfPassportOne} onChange={e => { ocf('uploadCopyOfPassportOne', e); pointCalculate(70, e) }} onRemove={() => ocf('uploadCopyOfPassportOne', undefined)} btnClassName="m-r-2" closeClassName="m-r-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />
        {/* <UploadFile type="2.1" formProps={fp} name="uploadCopyOfPassportTwo" title="Back" uploadedDocuments={uDoc.uploadCopyOfPassportTwo} filePath={`${fv.filePath}uploadCopyOfPassportTwo/`} value={fv.uploadCopyOfPassportTwo} onChange={e => { ocf('uploadCopyOfPassportTwo', e); pointCalculate(35, e) }} onRemove={() => ocf('uploadCopyOfPassportTwo', undefined)} btnClassName="m-r-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} /> */}
      </>
    ,
    // pointGained: ((fv.havePassportCopy && fv.uploadCopyOfPassportOne && fv.uploadCopyOfPassportTwo) ? '70' : '')
    pointGained: ((fv.havePassportCopy && fv.uploadCopyOfPassportOne && fv.uploadCopyOfPassportOne.length > 0) ? '70' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveAustPassportCopy" onChange={e => { ocf('haveAustPassportCopy', e); pointCalculateOnCheckbox(70, e, 'uploadCopyOfAustPassportOne') }} noRequired />,
    doc: <span>Australian Passport <span className="doc-bracket">(current or expired within last 2 years but not cancelled)</span></span>,
    requiredOnDoc: <span className="fs-12">Name &amp; Photo</span>,
    pointWorth: '70',
    uploadField:
      fv.haveAustPassportCopy &&
      <>
        <UploadFile type="2.1" formProps={fp} name="uploadCopyOfAustPassportOne" title="Upload File" uploadedDocuments={uDoc.uploadCopyOfAustPassportOne} filePath={`${fv.filePath}uploadCopyOfAustPassportOne/`} value={fv.uploadCopyOfAustPassportOne} onChange={e => { ocf('uploadCopyOfAustPassportOne', e); pointCalculate(70, e) }} onRemove={() => ocf('uploadCopyOfAustPassportOne', undefined)} btnClassName="m-r-2" closeClassName="m-r-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />
        {/* <UploadFile type="2.1" formProps={fp} name="uploadCopyOfAustPassportTwo" title="Upload File"  uploadedDocuments={uDoc.uploadCopyOfAustPassportTwo} filePath={`${fv.filePath}uploadCopyOfAustPassportTwo/`} value={fv.uploadCopyOfAustPassportTwo} onChange={e => { ocf('uploadCopyOfAustPassportTwo', e); pointCalculate(35, e) }} onRemove={() => ocf('uploadCopyOfAustPassportTwo', undefined)} btnClassName="m-r-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} /> */}
      </>,
    pointGained: ((fv.haveAustPassportCopy && fv.uploadCopyOfAustPassportOne && fv.uploadCopyOfAustPassportOne.length > 0) ? '70' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveAustCitizenCertificate" onChange={e => { ocf('haveAustCitizenCertificate', e); pointCalculateOnCheckbox(70, e, 'uploadAustCitizenCertificate') }} noRequired />,
    doc: <span>Australian Citizenship Certificate</span>,
    requiredOnDoc: <span className="fs-12">Name</span>,
    pointWorth: '70',
    uploadField: fv.haveAustCitizenCertificate && <UploadFile type="2.1" formProps={fp} name="uploadAustCitizenCertificate" title="Upload File" uploadedDocuments={uDoc.uploadAustCitizenCertificate} filePath={`${fv.filePath}uploadAustCitizenCertificate/`} value={fv.uploadAustCitizenCertificate} onChange={e => { ocf('uploadAustCitizenCertificate', e); pointCalculate(70, e) }} onRemove={() => ocf('uploadAustCitizenCertificate', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveAustCitizenCertificate && fv.uploadAustCitizenCertificate && fv.uploadAustCitizenCertificate.length > 0 ? '70' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveFullBirthCertificate" onChange={e => { ocf('haveFullBirthCertificate', e); pointCalculateOnCheckbox(70, e, 'uploadFullBirthCertificate') }} noRequired />,
    doc: <span>Full Birth certificate <span className="doc-bracket">(not birth certificate extract)</span></span>,
    requiredOnDoc: <span className="fs-12">Name</span>,
    pointWorth: '70',
    uploadField: fv.haveFullBirthCertificate && <UploadFile type="2.1" formProps={fp} name="uploadFullBirthCertificate" title="Upload File" uploadedDocuments={uDoc.uploadFullBirthCertificate} filePath={`${fv.filePath}uploadFullBirthCertificate/`} value={fv.uploadFullBirthCertificate} onChange={e => { ocf('uploadFullBirthCertificate', e); pointCalculate(70, e) }} onRemove={() => ocf('uploadFullBirthCertificate', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveFullBirthCertificate && fv.uploadFullBirthCertificate && fv.uploadFullBirthCertificate.length > 0 ? '70' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveIdentityRefugeesCertificate" onChange={e => { ocf('haveIdentityRefugeesCertificate', e); pointCalculateOnCheckbox(70, e, 'uploadIdentityRefugeesCertificate') }} noRequired />,
    doc: <span>Certificate of Identity issued by the Australian Government to refugees and non Australian citizens for entry to Australia</span>,
    requiredOnDoc: <span className="fs-12">Name</span>,
    pointWorth: '70',
    uploadField: fv.haveIdentityRefugeesCertificate && <UploadFile type="2.1" formProps={fp} name="uploadIdentityRefugeesCertificate" title="Upload File" uploadedDocuments={uDoc.uploadIdentityRefugeesCertificate} filePath={`${fv.filePath}uploadIdentityRefugeesCertificate/`} value={fv.uploadIdentityRefugeesCertificate} onChange={e => { ocf('uploadIdentityRefugeesCertificate', e); pointCalculate(70, e) }} onRemove={() => ocf('uploadIdentityRefugeesCertificate', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveIdentityRefugeesCertificate && fv.uploadIdentityRefugeesCertificate && fv.uploadIdentityRefugeesCertificate.length > 0 ? '70' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveDrivingLicense" onChange={e => { ocf('haveDrivingLicense', e); pointCalculateOnCheckbox(40, e, 'uploadDrivingLicenseFront', 'uploadDrivingLicenseBack') }} noRequired />,
    doc: <span>Australian Driver Licence/Learner's Permit</span>,
    requiredOnDoc: <span className="fs-12">Name, Address &amp; Photo</span>,
    pointWorth: '40',
    uploadField:
      fv.haveDrivingLicense &&
      <>
        <UploadFile type="2.1" formProps={fp} name="uploadDrivingLicenseFront" title="Front" uploadedDocuments={uDoc.uploadDrivingLicenseFront} filePath={`${fv.filePath}uploadDrivingLicenseFront/`} value={fv.uploadDrivingLicenseFront} onChange={e => {
          ocf('uploadDrivingLicenseFront', e);
          //@ Add point on just file upload, not removing point with file
          ((fv.uploadDrivingLicenseBack && fv.uploadDrivingLicenseBack.length > 0) && e && e.length > 0) && pointCalculate(40, e)
        }} onRemove={() => {
          ocf('uploadDrivingLicenseFront', undefined);
          setTimeout(() => {
            // console.log(fv.uploadDrivingLicenseFront, fv.uploadDrivingLicenseBack);
            ((fv.uploadDrivingLicenseFront.length === 0 || fv.uploadDrivingLicenseBack.length === 0) &&
              !(fv.uploadDrivingLicenseFront.length === 0 && fv.uploadDrivingLicenseBack.length === 0))
              && pointCalculate(40, [])
          }, 200)
        }} btnClassName="m-r-2" closeClassName="m-r-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />
        <UploadFile type="2.1" formProps={fp} name="uploadDrivingLicenseBack" title="Back" uploadedDocuments={uDoc.uploadDrivingLicenseBack} filePath={`${fv.filePath}uploadDrivingLicenseBack/`} value={fv.uploadDrivingLicenseBack} onChange={e => {
          ocf('uploadDrivingLicenseBack', e);
          //@ Add point on just file upload, not removing point with file
          ((fv.uploadDrivingLicenseFront && fv.uploadDrivingLicenseFront.length > 0) && e && e.length > 0) && pointCalculate(40, e)
        }} onRemove={() => {
          ocf('uploadDrivingLicenseBack', undefined);
          setTimeout(() => {
            ((fv.uploadDrivingLicenseFront.length === 0 || fv.uploadDrivingLicenseBack.length === 0) &&
              !(fv.uploadDrivingLicenseFront.length === 0 && fv.uploadDrivingLicenseBack.length === 0))
              && pointCalculate(40, [])
          }, 200)
        }} btnClassName="m-r-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />
      </>,
    pointGained: ((fv.haveDrivingLicense &&
      (fv.uploadDrivingLicenseFront && fv.uploadDrivingLicenseFront.length > 0) &&
      (fv.uploadDrivingLicenseBack && fv.uploadDrivingLicenseBack.length > 0)
    ) ? '40' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveIdentityCard" onChange={e => { ocf('haveIdentityCard', e); pointCalculateOnCheckbox(40, e, 'uploadIdentityCard') }} noRequired />,
    doc: <span>Current (Australian) Tertiary Student Identification Card</span>,
    requiredOnDoc: <span className="fs-12">Name &amp; Photo</span>,
    pointWorth: '40',
    uploadField: fv.haveIdentityCard && <UploadFile type="2.1" formProps={fp} name="uploadIdentityCard" title="Upload File" uploadedDocuments={uDoc.uploadIdentityCard} filePath={`${fv.filePath}uploadIdentityCard/`} value={fv.uploadIdentityCard} onChange={e => { ocf('uploadIdentityCard', e); pointCalculate(40, e) }} onRemove={() => ocf('uploadIdentityCard', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveIdentityCard && fv.uploadIdentityCard && fv.uploadIdentityCard.length > 0 ? '40' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveIdentityCardPhoto" onChange={e => { ocf('haveIdentityCardPhoto', e); pointCalculateOnCheckbox(40, e, 'uploadIdentityCardPhoto') }} noRequired />,
    doc: <span>Photo identification card issued for Australian regulatory purposes <span className="doc-bracket">(e.g. Aviation/Maritime Security identification, security industry etc.)</span></span>,
    requiredOnDoc: <span className="fs-12">Name &amp; Photo</span>,
    pointWorth: '40',
    uploadField: fv.haveIdentityCardPhoto && <UploadFile type="2.1" formProps={fp} name="uploadIdentityCardPhoto" title="Upload File" uploadedDocuments={uDoc.uploadIdentityCardPhoto} filePath={`${fv.filePath}uploadIdentityCardPhoto/`} value={fv.uploadIdentityCardPhoto} onChange={e => { ocf('uploadIdentityCardPhoto', e); pointCalculate(40, e) }} onRemove={() => ocf('uploadIdentityCardPhoto', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveIdentityCardPhoto && fv.uploadIdentityCardPhoto && fv.uploadIdentityCardPhoto.length > 0 ? '40' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveGovEmpId" onChange={e => { ocf('haveGovEmpId', e); pointCalculateOnCheckbox(40, e, 'uploadGovEmpId') }} noRequired />,
    doc: <span>Government employee ID <span className="doc-bracket">(Australian Federal/State/Territory)</span></span>,
    requiredOnDoc: <span className="fs-12">Name &amp; Photo</span>,
    pointWorth: '40',
    uploadField: fv.haveGovEmpId && <UploadFile type="2.1" formProps={fp} name="uploadGovEmpId" title="Upload File" uploadedDocuments={uDoc.uploadGovEmpId} filePath={`${fv.filePath}uploadGovEmpId/`} value={fv.uploadGovEmpId} onChange={e => { ocf('uploadGovEmpId', e); pointCalculate(40, e) }} onRemove={() => ocf('uploadGovEmpId', undefined)} btnClassName="m-r-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveGovEmpId && fv.uploadGovEmpId && fv.uploadGovEmpId.length > 0 ? '40' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveForceIdentityCard" onChange={e => { ocf('haveForceIdentityCard', e); pointCalculateOnCheckbox(40, e, 'uploadForceIdentityCard') }} noRequired />,
    doc: <span>Defence Force Identity Card <span className="doc-bracket">(with photo or signature)</span></span>,
    requiredOnDoc: <span className="fs-12">Name &amp; Photo</span>,
    pointWorth: '40',
    uploadField: fv.haveForceIdentityCard && <UploadFile type="2.1" formProps={fp} name="uploadForceIdentityCard" title="Upload File" uploadedDocuments={uDoc.uploadForceIdentityCard} filePath={`${fv.filePath}uploadForceIdentityCard/`} value={fv.uploadForceIdentityCard} onChange={e => { ocf('uploadForceIdentityCard', e); pointCalculate(40, e) }} onRemove={() => ocf('uploadForceIdentityCard', undefined)} btnClassName="m-r-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveForceIdentityCard && fv.uploadForceIdentityCard && fv.uploadForceIdentityCard.length > 0 ? '40' : '')
  }];

  const docListSecondaryArr = [{
    checkbox: <AntInput type="checkbox" name="haveDVACard" onChange={e => { ocf('haveDVACard', e); pointCalculateOnCheckbox(40, e, 'uploadDVACard') }} noRequired />,
    doc: <span>Department of Veterans Affairs (DVA) card</span>,
    requiredOnDoc: <span className="fs-12">Name &amp; Address</span>,
    pointWorth: '40',
    uploadField: fv.haveDVACard && <UploadFile type="2.1" formProps={fp} name="uploadDVACard" title="Upload File" uploadedDocuments={uDoc.uploadDVACard} filePath={`${fv.filePath}uploadDVACard/`} value={fv.uploadDVACard} onChange={e => { ocf('uploadDVACard', e); pointCalculate(40, e) }} onRemove={() => ocf('uploadDVACard', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveDVACard && fv.uploadDVACard && fv.uploadDVACard.length > 0 ? '40' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveCentrelinkCard" onChange={e => { ocf('haveCentrelinkCard', e); pointCalculateOnCheckbox(40, e, 'uploadCentrelinkCard') }} noRequired />,
    doc: <span>Centrelink card <span className="doc-bracket">(with reference number)</span></span>,
    requiredOnDoc: <span className="fs-12">Name &amp; Address</span>,
    pointWorth: '40',
    uploadField: fv.haveCentrelinkCard && <UploadFile type="2.1" formProps={fp} name="uploadCentrelinkCard" title="Upload File" uploadedDocuments={uDoc.uploadCentrelinkCard} filePath={`${fv.filePath}uploadCentrelinkCard/`} value={fv.uploadCentrelinkCard} onChange={e => { ocf('uploadCentrelinkCard', e); pointCalculate(40, e) }} onRemove={() => ocf('uploadCentrelinkCard', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveCentrelinkCard && fv.uploadCentrelinkCard && fv.uploadCentrelinkCard.length > 0 ? '40' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveBirthExtractCertificate" onChange={e => { ocf('haveBirthExtractCertificate', e); pointCalculateOnCheckbox(25, e, 'uploadBirthExtractCertificate') }} noRequired />,
    doc: <span>Birth Certificate Extract</span>,
    requiredOnDoc: <span className="fs-12">Name</span>,
    pointWorth: '25',
    uploadField: fv.haveBirthExtractCertificate && <UploadFile type="2.1" formProps={fp} name="uploadBirthExtractCertificate" title="Upload File" uploadedDocuments={uDoc.uploadBirthExtractCertificate} filePath={`${fv.filePath}uploadBirthExtractCertificate/`} value={fv.uploadBirthExtractCertificate} onChange={e => { ocf('uploadBirthExtractCertificate', e); pointCalculate(25, e) }} onRemove={() => ocf('uploadBirthExtractCertificate', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveBirthExtractCertificate && fv.uploadBirthExtractCertificate && fv.uploadBirthExtractCertificate.length > 0 ? '25' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveBirthCard" onChange={e => { ocf('haveBirthCard', e); pointCalculateOnCheckbox(25, e, 'uploadBirthCard') }} noRequired />,
    doc: <span>Birth card <span className="doc-bracket">(NSW Births, Deaths, Marriages issue only)</span></span>,
    requiredOnDoc: <span className="fs-12">Name</span>,
    pointWorth: '25',
    uploadField: fv.haveBirthCard && <UploadFile type="2.1" formProps={fp} name="uploadBirthCard" title="Upload File" uploadedDocuments={uDoc.uploadBirthCard} filePath={`${fv.filePath}uploadBirthCard/`} value={fv.uploadBirthCard} onChange={e => { ocf('uploadBirthCard', e); pointCalculate(25, e) }} onRemove={() => ocf('uploadBirthCard', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveBirthCard && fv.uploadBirthCard && fv.uploadBirthCard.length > 0 ? '25' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveMedicareCard" onChange={e => { ocf('haveMedicareCard', e); pointCalculateOnCheckbox(25, e, 'uploadMedicareCard') }} noRequired />,
    doc: <span>Medicare card</span>,
    requiredOnDoc: <span className="fs-12">Name</span>,
    pointWorth: '25',
    uploadField: fv.haveMedicareCard && <UploadFile type="2.1" formProps={fp} name="uploadMedicareCard" title="Upload File" uploadedDocuments={uDoc.uploadMedicareCard} filePath={`${fv.filePath}uploadMedicareCard/`} value={fv.uploadMedicareCard} onChange={e => { ocf('uploadMedicareCard', e); pointCalculate(25, e) }} onRemove={() => ocf('uploadMedicareCard', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveMedicareCard && fv.uploadMedicareCard && fv.uploadMedicareCard.length > 0 ? '25' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveCreditCard" onChange={e => { ocf('haveCreditCard', e); pointCalculateOnCheckbox(25, e, 'uploadCreditCard') }} noRequired />,
    doc: <span>Credit card or account card</span>,
    requiredOnDoc: <span className="fs-12">Name</span>,
    pointWorth: '25',
    uploadField: fv.haveCreditCard && <UploadFile type="2.1" formProps={fp} name="uploadCreditCard" title="Upload File" uploadedDocuments={uDoc.uploadCreditCard} filePath={`${fv.filePath}uploadCreditCard/`} value={fv.uploadCreditCard} onChange={e => { ocf('uploadCreditCard', e); pointCalculate(25, e) }} onRemove={() => ocf('uploadCreditCard', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveCreditCard && fv.uploadCreditCard && fv.uploadCreditCard.length > 0 ? '25' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveAustMarriageCertificate" onChange={e => { ocf('haveAustMarriageCertificate', e); pointCalculateOnCheckbox(25, e, 'uploadAustMarriageCertificate') }} noRequired />,
    doc: <span>Australian Marriage certificate <span className="doc-bracket">(Australian Registry issue only)</span></span>,
    requiredOnDoc: <span className="fs-12">Name &amp; Signature</span>,
    pointWorth: '25',
    uploadField: fv.haveAustMarriageCertificate && <UploadFile type="2.1" formProps={fp} name="uploadAustMarriageCertificate" title="Upload File" uploadedDocuments={uDoc.uploadAustMarriageCertificate} filePath={`${fv.filePath}uploadAustMarriageCertificate/`} value={fv.uploadAustMarriageCertificate} onChange={e => { ocf('uploadAustMarriageCertificate', e); pointCalculate(25, e) }} onRemove={() => ocf('uploadAustMarriageCertificate', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveAustMarriageCertificate && fv.uploadAustMarriageCertificate && fv.uploadAustMarriageCertificate.length > 0 ? '25' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveDceNisiAbs" onChange={e => { ocf('haveDceNisiAbs', e); pointCalculateOnCheckbox(25, e, 'uploadDceNisiAbs') }} noRequired />,
    doc: <span>Decree Nisi / Decree Absolute <span className="doc-bracket">(Australian Registry issue only)</span></span>,
    requiredOnDoc: <span className="fs-12">Name &amp; Signature</span>,
    pointWorth: '25',
    uploadField: fv.haveDceNisiAbs && <UploadFile type="2.1" formProps={fp} name="uploadDceNisiAbs" title="Upload File" uploadedDocuments={uDoc.uploadDceNisiAbs} filePath={`${fv.filePath}uploadDceNisiAbs/`} value={fv.uploadDceNisiAbs} onChange={e => { ocf('uploadDceNisiAbs', e); pointCalculate(25, e) }} onRemove={() => ocf('uploadDceNisiAbs', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveDceNisiAbs && fv.uploadDceNisiAbs && fv.uploadDceNisiAbs.length > 0 ? '25' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveChangeOfNameCertificate" onChange={e => { ocf('haveChangeOfNameCertificate', e); pointCalculateOnCheckbox(25, e, 'uploadChangeOfNameCertificate') }} noRequired />,
    doc: <span>Change of name certificate <span className="doc-bracket">(Australian Registry issue only)</span></span>,
    requiredOnDoc: <span className="fs-12">Name &amp; Signature</span>,
    pointWorth: '25',
    uploadField: fv.haveChangeOfNameCertificate && <UploadFile type="2.1" formProps={fp} name="uploadChangeOfNameCertificate" title="Upload File" uploadedDocuments={uDoc.uploadChangeOfNameCertificate} filePath={`${fv.filePath}uploadChangeOfNameCertificate/`} value={fv.uploadChangeOfNameCertificate} onChange={e => { ocf('uploadChangeOfNameCertificate', e); pointCalculate(25, e) }} onRemove={() => ocf('uploadChangeOfNameCertificate', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveChangeOfNameCertificate && fv.uploadChangeOfNameCertificate && fv.uploadChangeOfNameCertificate.length > 0 ? '25' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveBankStatement" onChange={e => { ocf('haveBankStatement', e); pointCalculateOnCheckbox(25, e, 'uploadBankStatement') }} noRequired />,
    doc: <span>Bank statement <span className="doc-bracket">(showing transactions)</span></span>,
    requiredOnDoc: <span className="fs-12">Name &amp; Address</span>,
    pointWorth: '25',
    uploadField: fv.haveBankStatement && <UploadFile type="2.1" formProps={fp} name="uploadBankStatement" title="Upload File" uploadedDocuments={uDoc.uploadBankStatement} filePath={`${fv.filePath}uploadBankStatement/`} value={fv.uploadBankStatement} onChange={e => { ocf('uploadBankStatement', e); pointCalculate(25, e) }} onRemove={() => ocf('uploadBankStatement', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveBankStatement && fv.uploadBankStatement && fv.uploadBankStatement.length > 0 ? '25' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveProLeaseAgreement" onChange={e => { ocf('haveProLeaseAgreement', e); pointCalculateOnCheckbox(25, e, 'uploadProLeaseAgreement') }} noRequired />,
    doc: <span>Property lease agreement - current address</span>,
    requiredOnDoc: <span className="fs-12">Name &amp; Address</span>,
    pointWorth: '25',
    uploadField: fv.haveProLeaseAgreement && <UploadFile type="2.1" formProps={fp} name="uploadProLeaseAgreement" title="Upload File" uploadedDocuments={uDoc.uploadProLeaseAgreement} filePath={`${fv.filePath}uploadProLeaseAgreement/`} value={fv.uploadProLeaseAgreement} onChange={e => { ocf('uploadProLeaseAgreement', e); pointCalculate(25, e) }} onRemove={() => ocf('uploadProLeaseAgreement', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveProLeaseAgreement && fv.uploadProLeaseAgreement && fv.uploadProLeaseAgreement.length > 0 ? '25' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveTaxAssessNotice" onChange={e => { ocf('haveTaxAssessNotice', e); pointCalculateOnCheckbox(25, e, 'uploadTaxAssessNotice') }} noRequired />,
    doc: <span>Taxation assessment notice</span>,
    requiredOnDoc: <span className="fs-12">Name &amp; Address</span>,
    pointWorth: '25',
    uploadField: fv.haveTaxAssessNotice && <UploadFile type="2.1" formProps={fp} name="uploadTaxAssessNotice" title="Upload File" uploadedDocuments={uDoc.uploadTaxAssessNotice} filePath={`${fv.filePath}uploadTaxAssessNotice/`} value={fv.uploadTaxAssessNotice} onChange={e => { ocf('uploadTaxAssessNotice', e); pointCalculate(25, e) }} onRemove={() => ocf('uploadTaxAssessNotice', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveTaxAssessNotice && fv.uploadTaxAssessNotice && fv.uploadTaxAssessNotice.length > 0 ? '25' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveAustMortgageDoc" onChange={e => { ocf('haveAustMortgageDoc', e); pointCalculateOnCheckbox(25, e, 'uploadAustMortgageDoc') }} noRequired />,
    doc: <span>Australian Mortgage Documents - Current address</span>,
    requiredOnDoc: <span className="fs-12">Name &amp; Address</span>,
    pointWorth: '25',
    uploadField: fv.haveAustMortgageDoc && <UploadFile type="2.1" formProps={fp} name="uploadAustMortgageDoc" title="Upload File" uploadedDocuments={uDoc.uploadAustMortgageDoc} filePath={`${fv.filePath}uploadAustMortgageDoc/`} value={fv.uploadAustMortgageDoc} onChange={e => { ocf('uploadAustMortgageDoc', e); pointCalculate(25, e) }} onRemove={() => ocf('uploadAustMortgageDoc', undefined)} btnClassName="m-r-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveAustMortgageDoc && fv.uploadAustMortgageDoc && fv.uploadAustMortgageDoc.length > 0 ? '25' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveRatingAuthority" onChange={e => { ocf('haveRatingAuthority', e); pointCalculateOnCheckbox(25, e, 'uploadRatingAuthority') }} noRequired />,
    doc: <span>Rating Authority - Current address eg Land Rates</span>,
    requiredOnDoc: <span className="fs-12">Name &amp; Address</span>,
    pointWorth: '25',
    uploadField: fv.haveRatingAuthority && <UploadFile type="2.1" formProps={fp} name="uploadRatingAuthority" title="Upload File" uploadedDocuments={uDoc.uploadRatingAuthority} filePath={`${fv.filePath}uploadRatingAuthority/`} value={fv.uploadRatingAuthority} onChange={e => { ocf('uploadRatingAuthority', e); pointCalculate(25, e) }} onRemove={() => ocf('uploadRatingAuthority', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveRatingAuthority && fv.uploadRatingAuthority && fv.uploadRatingAuthority.length > 0 ? '25' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveUtilityBill" onChange={e => { ocf('haveUtilityBill', e); pointCalculateOnCheckbox(20, e, 'uploadUtilityBill') }} noRequired />,
    doc: <span>Utility Bill - electricity, gas, telephone - Current address <span className="doc-bracket">(less than 12 months old)</span></span>,
    requiredOnDoc: <span className="fs-12">Name &amp; Address</span>,
    pointWorth: '20',
    uploadField: fv.haveUtilityBill && <UploadFile type="2.1" formProps={fp} name="uploadUtilityBill" title="Upload File" uploadedDocuments={uDoc.uploadUtilityBill} filePath={`${fv.filePath}uploadUtilityBill/`} value={fv.uploadUtilityBill} onChange={e => { ocf('uploadUtilityBill', e); pointCalculate(20, e) }} onRemove={() => ocf('uploadUtilityBill', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveUtilityBill && fv.uploadUtilityBill && fv.uploadUtilityBill.length > 0 ? '20' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveRefIndigenousOrg" onChange={e => { ocf('haveRefIndigenousOrg', e); pointCalculateOnCheckbox(20, e, 'uploadRefIndigenousOrg') }} noRequired />,
    doc: <span>Reference from Indigenous Organisation</span>,
    requiredOnDoc: <span className="fs-12">Name &amp; Photo</span>,
    pointWorth: '20',
    uploadField: fv.haveRefIndigenousOrg && <UploadFile type="2.1" formProps={fp} name="uploadRefIndigenousOrg" title="Upload File" uploadedDocuments={uDoc.uploadRefIndigenousOrg} filePath={`${fv.filePath}uploadRefIndigenousOrg/`} value={fv.uploadRefIndigenousOrg} onChange={e => { ocf('uploadRefIndigenousOrg', e); pointCalculate(20, e) }} onRemove={() => ocf('uploadRefIndigenousOrg', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveRefIndigenousOrg && fv.uploadRefIndigenousOrg && fv.uploadRefIndigenousOrg.length > 0 ? '20' : '')
  }, {
    checkbox: <AntInput type="checkbox" name="haveDocIssuedOutAust" onChange={e => { ocf('haveDocIssuedOutAust', e); pointCalculateOnCheckbox(20, e, 'uploadDocIssuedOutAust') }} noRequired />,
    doc: <span>Documents issued outside Australia <span className="doc-bracket">(equivalent to Australian documents)</span>. Must have official translation attached</span>,
    requiredOnDoc: <span className="fs-12">Name &amp; Photo</span>,
    pointWorth: '20',
    uploadField: fv.haveDocIssuedOutAust && <UploadFile type="2.1" formProps={fp} name="uploadDocIssuedOutAust" title="Upload File" uploadedDocuments={uDoc.uploadDocIssuedOutAust} filePath={`${fv.filePath}uploadDocIssuedOutAust/`} value={fv.uploadDocIssuedOutAust} onChange={e => { ocf('uploadDocIssuedOutAust', e); pointCalculate(20, e) }} onRemove={() => ocf('uploadDocIssuedOutAust', undefined)} closeClassName="m-l-2" reqMsg={'Req*'} accept={fileAccept} restrictExtension={fileExtensionType} fileSize={maxFileSize} />,
    pointGained: (fv.haveDocIssuedOutAust && fv.uploadDocIssuedOutAust && fv.uploadDocIssuedOutAust.length > 0 ? '20' : '')
  }];

  return (
    <>
      {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
      <hr className="form_hr" />
      <Row gutter={10} justify="space-around" align="middle" className="m-b-5">
        <Col lg={14} md={14} sm={24} xs={24}>
          <h2 className="form_heading_sub">Identification Documents - 100 Point Checklist</h2>
          <p className="m-0">A minimum of 100 points of identification has to be provided with an application. Use this as a checklist when preparing your identification documents.</p>
        </Col>
        <Col lg={10} md={10} sm={24} xs={24}>
          <div div className="uploader-progress-container m-t-0-imp">
            {progressBar()}
          </div>
        </Col>
      </Row>
      <div className={`checklist-container ${fsh ? 'form-section-container' : ''}`}>
        {/* <hr className="form_hr_sub" /> */}
        <div className="upload-documents-container">
          <Row gutter={0} justify="space-around" align="middle" className="row-container label-row">
            {Object.keys(docListLabelObj).map((item, i) => {
              return (
                <Col key={i} lg={colWidth[item].lg} md={colWidth[item].md} sm={colWidth[item].sm} xs={colWidth[item].xs}
                  className="row-content" style={{ 'textAlign': colWidth[item].align }}>
                  <div className={`row-value ${colWidth[item].flexClass}`}>{docListLabelObj[item]}</div>
                </Col>
              );
            })}
          </Row>
          <div className="separator">Primary Documents</div>
          {docListPrimaryArr.map((item, i) => {
            return (
              <Row key={i} gutter={0} justify="space-around" align="middle" className="row-container">
                {Object.keys(item).map((it, k) => {
                  return (
                    <Col key={k} lg={colWidth[it].lg} md={colWidth[it].md} sm={colWidth[it].sm} xs={colWidth[it].xs}
                      className="row-content" style={{ 'textAlign': colWidth[it].align }}>
                      <div className="label-on-mobile">{docListLabelObjMobile[it]}</div>
                      <div className={`row-value ${colWidth[it].flexClass}`}>{item[it]}</div>
                    </Col>
                  );
                })}
              </Row>
            )
          })}
          <div className="separator">Secondary Documents</div>
          {docListSecondaryArr.map((item, i) => {
            return (
              <Row key={i} gutter={0} justify="space-around" align="middle" className="row-container">
                {Object.keys(item).map((it, k) => {
                  return (
                    <Col key={k} lg={colWidth[it].lg} md={colWidth[it].md} sm={colWidth[it].sm} xs={colWidth[it].xs}
                      className={`row-content ${colWidth[it].flexClass}`} style={{ 'textAlign': colWidth[it].align }}>
                      <div className="label-on-mobile">{docListLabelObjMobile[it]}</div>
                      <div className={`row-value ${colWidth[it].flexClass}`}>{item[it]}</div>
                    </Col>
                  );
                })}
              </Row>
            )
          })}
        </div>
      </div>
      {totalPoint > 0 &&
        <div div className="uploader-progress-container">{progressBar()}</div>
      }
    </>
  );//End return
}//End function

export default Step19CheckList;