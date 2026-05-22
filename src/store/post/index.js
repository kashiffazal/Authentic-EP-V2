export default function StorePost(dispatch) {
  return ({
    post_stv: (type, payload_value) => {
      dispatch(
        function () {
          return dispatch => { dispatch({ type: type, payload: payload_value }); };
        }()
      )//End dispatch
    }//End first object
  })//End return statement
}//End fucntion
