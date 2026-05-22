import React, { useEffect, useState } from 'react';
import { message } from 'antd';

const TagWidget = (pr) => {
  const [tagArr, setTagArr] = useState([]);

  useEffect(() => {
    setTagArr(pr.tagArr);
  }, [pr.tagArr])

  const filterSpw = (e) => {
    var filteredData = pr.tagArr.filter((a) => {
      return (a.label.toLowerCase().includes(e.toLowerCase()) || a.tag.toLowerCase().includes(e.toLowerCase()));
    });
    setTagArr(filteredData);
  }//End function

  const copyOnClick = (e) => {
    var inp = document.createElement('input');
    document.body.appendChild(inp);
    inp.value = e.target.textContent;
    inp.select();
    document.execCommand('copy', false);
    inp.remove();
    message.config({ duration: 5, maxCount: 3, });
    message.success(e.target.textContent + ' copied.');
  }//End function

  const tagData = (data) => {
    //   <table border='0' width="100%" className="tag-table">
    //   <tbody>
    //     {data.map((item,i) => {
    //       return (
    //         <tr key={i}><td valign="center" width="50%"><span className="label">{item.label}</span></td><td align="right" width="50%"><button className="btnToLink tag" onClick={e => copyOnClick(e)} type="button">{item.tag}</button></td></tr>
    //       )//End return
    //     })}
    //   </tbody>
    // </table>
    return (
      <div border='0' className="tag-list-container">
        {data.map((item, i) => {
          return (
            <div key={i} className="tag-section">
              <div className="label">{item.label}</div>
              <div className="value"><button className="btnToLink tag" onClick={e => copyOnClick(e)} type="button">{item.tag}</button></div>
            </div>
          )//End return
        })}
      </div>
    )//End return
  }//End function

  return (
    <div className="tag-container container">
      <h4>Available Variables</h4>
      <input className="search-field" onChange={(e) => filterSpw(e.target.value)} placeholder="Filter Tags" />
      <div className="tags-list" id="scroll-style-4">
        {tagData(tagArr)}
      </div>
    </div>
  )//End return
}//End function

export default TagWidget;