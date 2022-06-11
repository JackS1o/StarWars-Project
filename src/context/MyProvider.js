import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import MyContext from './MyContext';

const options = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [filtredList, setFiltredList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectOptions, setSelectOptions] = useState(options);
  const [optionsList, setOptionsList] = useState([]);
  const [selectChange, setSelectChange] = useState({
    col: 'population',
    operator: 'maior que',
    num: 0,
  });
  const [orderTable, setOrderTable] = useState({
    column: 'population',
    sort: 'ASC',
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
        }).sort((a, b) => a.name.localeCompare(b.name));
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

  const orderFilter = ({ target }) => {
    const { name, value } = target;
    setOrderTable({
      ...orderTable,
      [name]: value,
    });
  };

  const orderBtn = () => {
    const { column, sort } = orderTable;
    setOrderTable({
      column,
      sort,
    });
  };

  useEffect(() => {
    const { column } = orderTable;
    if (orderTable.sort === 'ASC') {
      const orderTableFilter = filtredList.sort((a, b) => a[column] - b[column]);
      return setFiltredList(orderTableFilter);
    }
    return setFiltredList(filtredList.sort((a, b) => b[column] - a[column]));
  }, [filtredList, orderTable]);

  useEffect(() => {
    const filtredArray = data.filter((input) => input.name
      .toLowerCase().includes(searchInput));

    const updateTable = optionsList.reduce((acc, fil) => acc.filter((planet) => {
      switch (fil.operator) {
      case 'maior que':
        return Number(planet[fil.col]) > Number(fil.num);
      case 'menor que':
        return Number(planet[fil.col]) < Number(fil.num);
      case 'igual a':
        return Number(planet[fil.col]) === Number(fil.num);
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
    setSelectOptions([...selectOptions, opt.col]);
  };

  const removeAllFilters = () => {
    setOptionsList([]);
    setSelectOptions(options);
  };

  const filterBtn = () => {
    const { col, operator, num } = selectChange;
    const optFilter = selectOptions.filter((op) => op !== col);
    setSelectOptions(optFilter);
    setSelectChange({
      col: optFilter[0],
      operator: 'maior que',
      num: 0,
    });
    const filteredByClick = filtredList.filter((planet) => {
      if (operator === 'maior que') {
        return planet[col] > Number(num);
      }
      if (operator === 'menor que') {
        return planet[col] < Number(num);
      }
      return Number(planet[col] === num);
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
    orderFilter,
    orderTable,
    orderBtn,
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
