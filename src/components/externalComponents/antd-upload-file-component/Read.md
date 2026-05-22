<UploadFile
  className="m-b-10"
  title=""
  msg=""
  //multiple={true}
  accept=".csv, .jpg, .jpeg, .png"
  restrictExtension="csv,jpg,pdf"
  loader={st.loader}
  progress={st.uploadProgress}
  disabled={st.textAreaValue}
  onChange={(files) => this.setState({uploadableFile : files, textAreaValue : ''})}
  type={1 // 1.2}
/>