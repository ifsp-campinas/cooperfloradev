import * as actionTypes from '../actions/actionsTypes';
import firebaseSetup from '../../firebaseSetup';
import firebase from 'firebase/app';


const initialState = {
  user:{
    name: null,
    phone: null,
    email: "Andre@bordignon.com",
    password: null,
    token: null,
    userId: null
  },
  error: null,
  loading: false,
  authRedirect: '/'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      // console.log("Cheguei no start");
      // console.log(action.email);
      // console.log(action.password);

      // console.log(firebaseSetup);

      firebase.auth().signInWithEmailAndPassword(action.email, action.password)
      .then(function(){
        console.log("Usuário logado com sucesso");
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        //document.getElementById("errorMessage").innerText = errorMessage;
      });

      return {
        ...state,
        error: null,
        loading: true
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
      }
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
}

export default reducer;