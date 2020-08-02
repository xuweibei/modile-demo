const footerObj = {
  show: 'home',
};

function showFooter(state = footerObj, actions) {
  switch (actions.type) {
    case 'SETFOOTER':
      return Object.assign({ show: actions.paythods });
    default:
      return state;
  }
}

export default showFooter;
