import React, { Component } from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;
// const { Search } = Input;

class SelectPermission extends Component {
  state = {
    checkedKeys: [],
    checkAllBox: false
  };

  onCheck = (checkedKeys) => {
    let checkArr = (checkedKeys.checked || checkedKeys);
    this.setState({ checkedKeys: checkArr }, () => {
      this.props.onChange(this.state.checkedKeys);
      // console.log(checkArr);
      this.checkAll(checkArr);
    });
  };

  checkAll = (arr) => {
    let checkAllIndex = arr.indexOf('check_all');
    let checkAll = (checkAllIndex !== -1);
    let equalArr = (this.props.data.allIds.length === arr.length);
    if (checkAll && !equalArr) {
      this.setState({ checkAllBox: true, checkedKeys: ['check_all', ...this.props.data.allIds] }, () => {
        this.props.onChange(this.state.checkedKeys);
      });
      return false
    }//End if condition
    // if (!checkAll && equalArr) {
    //   this.setState({ checkAllBox: false, checkedKeys: [] }, () => { this.props.onChange(this.state.checkedKeys); });
    // }//End if condition
    if (checkAll && !(this.props.data.allIds.length === (arr.length - 1))) {
      arr.splice(checkAllIndex, 1);
      this.setState({ checkAllBox: false, checkedKeys: arr }, () => { this.props.onChange(this.state.checkedKeys); });
    }//End if condition
  }//End function

  // renderTreeNodes = data =>
  //   data.map(item => {
  //     if (item.children) {
  //       return (
  //         <TreeNode title={item.title} key={item.key} >
  //           {this.renderTreeNodes(item.children)}
  //         </TreeNode>
  //       );
  //     }
  //     return <TreeNode key={item.key} title={item.title} />;
  //   });


  // onChange = e => {
  //   const filteredData = this.props.data.filter(value => {
  //     const searchStr = e.target.value.toLowerCase();
  //     const main = value.title.toLowerCase().includes(searchStr);
  //     const children = value.children ? value.children.some(item => item.title.toLowerCase().includes(searchStr)) : false;
  //     const subChildren = (value.children && value.children.children) ? value.children.children.some(item => item.title.toLowerCase().includes(searchStr)) : false;
  //     return main || children || subChildren;
  //   });
  //   console.log(filteredData);
  // };

  render() {
    const data = this.props.data.data;
    // console.log(data);
    return (
      <React.Fragment>
        <strong>Select permissions</strong>
        {/* <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} /> */}
        <div className="check_list_container">
          {(data && data.length > 0) &&
            <React.Fragment>
              {/* <Tree
                checkable
                checkStrictly
                defaultExpandAll
                onCheck={(e) => this.onCheck(e)}
                selectable={false}
                checkedKeys={this.state.checkedKeys}
                showLine={false}
              // onSelect={(e) => console.log(e)}
              icon={false}
              >
                <TreeNode title={'Check All'} key={'check_all'} className="check_all">
                  {this.renderTreeNodes(data)}
                </TreeNode>
              </Tree> */}




              <Tree
                checkable
                // checkStrictly={true}
                onCheck={(e) => this.onCheck(e)}
                selectable={false}
                checkedKeys={this.state.checkedKeys}
                treeData={data}
                showLine={{ showLeafIcon: false }}

              />




            </React.Fragment>
          }
          {/* - { this.state.checkedKeys} - */}
        </div>
      </React.Fragment>
    );//End return
  }//End render
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ checkedKeys: this.props.value }, () => {
        this.props.onChange(this.state.checkedKeys);
      });
    }//end if condition
  }//End componentDidUpdate
}//End class

export default SelectPermission;