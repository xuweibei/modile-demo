const SETFOOTER = 'SETFOOTER';

const setFooter = function (paythods) {
  return {
    type: SETFOOTER,
    paythods,
  };
};

export { setFooter };
