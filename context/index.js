import React from 'react';

const initialState = 'ALL';

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VIEW_OPEN':
      return 'OPEN';
    case 'VIEW_CLOSED':
      return 'CLOSED';
    default:
      return 'ALL';
  }
};

export default React.createContext({});
