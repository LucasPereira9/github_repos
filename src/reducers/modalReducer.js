const initialState = {
    isModalOpen: false
  };
  
  const modalReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'TOGGLE_MODAL_STATE':
        return {
          ...state,
          isModalOpen: !state.isModalOpen
        };
      default:
        return state;
    }
  };
  
  export default modalReducer;