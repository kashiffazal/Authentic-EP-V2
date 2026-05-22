import { GetIndexFromArray, RemoveEmptyFromArray, DeleteRowFromList, SortArrayById } from './index';
const MultiFielsServeces = {
   addRow: (array) => {
      let dataArr = [...array];
      let count = (parseInt(dataArr[dataArr.length - 1]) + 1);
      dataArr.push(count.toString());
      return dataArr;
   },//End function
   removeRow: (array, index, formValues,formValIndex) => {
      // console.log(array);
      // console.log(index);
      // console.log(formValues);
      // console.log(formValIndex);
      let dataArr = [...array];
      dataArr.splice(index, 1);
      Object.keys(formValues).forEach((item) => { delete formValues[item][formValIndex] })
      return [dataArr, formValues];
   },//End function
   addDisabled: (arr, index) => { return (arr.length - 1) > index; },//End function
   lessDisabled: (arr) => { return arr.length === 1; },//End function
   onChange: (fieldName, fieldValue, fieldState) => {
      fieldName = fieldName.split('%');
      if (!fieldState[fieldName[0]]) { fieldState[fieldName[0]] = {} }
      fieldState[fieldName[0]][fieldName[1]] = fieldValue;
      return fieldState;
   },//End function
   loadDataOnMount: (data, dateFieldsArr = false, dateFun = false) => {
      data = { ...data };
      //Separating nested obj if available
      let nested = null;
      if (data.nested) { nested = data.nested; delete data.nested }//End if condition
      //Getting Row Count by given data
      let rowLen = Object.keys(data[Object.keys(data)[0]]).length;
      let rowArr = [];
      for (var k = 0; k < rowLen; k++) { rowArr.push((k + 1)); }//End for loop
      //Set setFieldsValue object
      let formValObj = {}
      Object.keys(data).forEach(item => {
         let pro = 1; Object.keys(data[item]).forEach(it => { formValObj[item + '%' + pro] = data[item][it]; pro++; })
      })
      //Return without nested fields
      let rowNestedObj = {};
      if (nested) {
         Object.keys(nested).forEach(item => {
            let property = Object.keys(nested[item]);
            rowNestedObj[item] = Object.keys(nested[item][property[0]]);
            property.forEach(it => {
               Object.keys(nested[item][it]).forEach((t, i) => { formValObj[it + '%' + t] = nested[item][it][t]; })
            })
         })
      }//End if condition for nested

      if (dateFieldsArr) {
         Object.keys(formValObj).forEach((item) => {
            dateFieldsArr.forEach((it) => {
               if (item.indexOf(it) !== -1) { formValObj[item] = dateFun(formValObj[item]); }
            });
         })
      }//End if condition
      return { rowArr, formValObj, rowNestedObj }
   },//End function

   //Nested Fields
   addNestedRow: (rowNestedObj, propertyName) => {
      let obj = { ...rowNestedObj };
      if (!obj[propertyName] || obj[propertyName].length < 1) {
         obj[propertyName] = [1];
      } else {
         let count = (parseInt(obj[propertyName][obj[propertyName].length - 1]) + 1);
         obj[propertyName].push(count.toString());
      }
      return obj
   },//End function
   lessNestedRow: (rowNestedObj, propertyName, nIndex, formValues) => {
      let obj = { ...rowNestedObj };
      obj[propertyName].splice(nIndex, 1);

      //Remove specific data from nested object
      let nestObj = { ...formValues.nested }//Create new instance
      if (Object.keys(nestObj).length > 0) {
         let nestedObj = nestObj[propertyName];//Get specific child object to delete properties
         let property = Object.keys(nestObj[propertyName][Object.keys(nestObj[propertyName])[0]])[nIndex];//Get Removable property name
         Object.keys(nestedObj).forEach(item => { delete nestedObj[item][property] })//Removing values
         nestObj[propertyName] = nestedObj;//Update specific child nested object
         formValues.nested = nestObj;//Update nested object
      }//End if condition
      return [obj, formValues];
   },//End function
   addNestedDisabled: (arr, index = undefined) => {
      if (arr && arr.length > 0) {
         if (arr && index !== undefined) { return (Object.keys(arr).length - 1) > index; }
         return true;
      } else {
         if (arr && arr.length > 0 && !index) { return true; } else {
            if (!arr) { return false; }
         }//End if condition
      }//End if condition
   },//End function
   onChangeNestd: (fieldName, fieldValue, parentIndex, fieldState) => {
      fieldName = fieldName.split('%');
      if (!fieldState.nested) { fieldState.nested = {}; }
      if (!fieldState.nested[parentIndex]) { fieldState.nested[parentIndex] = {} }
      if (!fieldState.nested[parentIndex][fieldName[0]]) { fieldState.nested[parentIndex][fieldName[0]] = {} }
      fieldState.nested[parentIndex][fieldName[0]][fieldName[1]] = fieldValue;
      return fieldState
   },//End function

   SelectOneItemOneTime: (rowArr, originalListArr, formProps, fieldName) => {
      let count = rowArr.length;
      let oriList = [...originalListArr];
      let newList = [];
      let holdDel = [];
      for (var i = 0; i < count; i++) {
         let k = formProps.getFieldValue(`${fieldName}%${(i + 1)}`);
         holdDel[i] = oriList[GetIndexFromArray(oriList, 'id', k)];
         oriList = DeleteRowFromList(oriList, k);
      }//End for loop
      for (var k = 0; k < holdDel.length; k++) { newList[k + 1] = SortArrayById(RemoveEmptyFromArray([...oriList, holdDel[k]])); }//End for loop
      return newList;
   },//End function

   ResetFieldsByFieldName: (rowArr, fieldName, formProps) => {
      let count = rowArr.length;
      let obj = {};
      for (var i = 0; i < count; i++) { obj[`${fieldName}%${(i + 1)}`] = ''; }//End for loop
      formProps.setFieldsValue(obj);
      return true;
   }//End function

}//End MultiFielsServeces
export default MultiFielsServeces;