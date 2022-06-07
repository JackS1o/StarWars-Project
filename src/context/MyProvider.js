import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import MyContext from './MyContext';

function MyProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiResponse = async () => {
      try {
        const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
        const response = await fetch(url);
        const { results } = await response.json();
        setData(results);
      } catch (error) {
        return error;
      }
    };
    apiResponse();
  }, []);

  const context = {
    data,
  };

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MyProvider;
