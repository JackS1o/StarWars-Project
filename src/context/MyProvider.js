import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import MyContext from './MyContext';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [filtredList, setFiltredList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectChange, setSelectChange] = useState({
    column: 'population',
    operator: 'maior que',
    num: 0,
  });

  useEffect(() => {
    const apiResponse = async () => {
      try {
        const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
        const response = await fetch(url);
        const { results } = await response.json();
        const filtredResults = results.map((item) => {
          delete item.residents;
          return item;
        });
        setData(filtredResults);
        setFiltredList(filtredResults);
      } catch (error) {
        return error;
      }
    };
    apiResponse();
  }, []);

  const selectInput = ({ target }) => {
    const { name, value } = target;

    setSelectChange({
      ...selectChange,
      [name]: value,
    });
  };

  useEffect(() => {
    const filtredArray = data.filter((input) => input.name
      .toLowerCase().includes(searchInput));
    setFiltredList(filtredArray);
  }, [data, searchInput]);

  const filterSearch = ({ target }) => {
    setSearchInput(target.value);
  };

  const filterBtn = () => {
    const { column, operator, num } = selectChange;
    const filteredByClick = filtredList.filter((planet) => {
      if (operator === 'maior que') {
        return planet[column] > Number(num);
      }
      if (operator === 'menor que') {
        return planet[column] < Number(num);
      }
      return Number(planet[column] === num);
    });
    setFiltredList(filteredByClick);
  };

  const context = {
    searchInput,
    setSearchInput,
    selectChange,
    setSelectChange,
    filtredList,
    selectInput,
    filterSearch,
    setFiltredList,
    filterBtn,
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
