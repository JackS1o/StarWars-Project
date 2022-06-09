import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import MyContext from './MyContext';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [filtredList, setFiltredList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectOptions, setSelectOptions] = useState([]);
  const [optionsList, setOptionsList] = useState([]);
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
    const options = ['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water'];
    setSelectOptions(options);
    const filtredArray = data.filter((input) => input.name
      .toLowerCase().includes(searchInput));

    const updateTable = optionsList.reduce((acc, fil) => acc.filter((planet) => {
      switch (fil.operator) {
      case 'maior que':
        return Number(planet[fil.column]) > Number(fil.num);
      case 'menor que':
        return Number(planet[fil.column]) < Number(fil.num);
      case 'igual a':
        return Number(planet[fil.column]) === Number(fil.num);
      default:
        return true;
      }
    }), filtredArray);
    setFiltredList(updateTable);
  }, [data, searchInput, optionsList]);

  const filterSearch = ({ target }) => {
    setSearchInput(target.value);
  };

  const removeBtn = (opt) => {
    const removeOpt = optionsList.filter((el) => el !== opt);
    setOptionsList(removeOpt);
    setSelectOptions([...selectOptions, opt.column]);
  };

  const removeAllFilters = () => {
    const options = ['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water'];
    setOptionsList([]);
    setSelectOptions(options);
  };

  const filterBtn = () => {
    const { column, operator, num } = selectChange;
    const optFilter = selectOptions.filter((op) => op !== column);
    setSelectOptions(optFilter);
    setSelectChange({
      column: optFilter[0],
      operator: 'maior que',
      num: 0,
    });
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
    setOptionsList([...optionsList, selectChange]);
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
    selectOptions,
    optionsList,
    removeBtn,
    removeAllFilters,
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
