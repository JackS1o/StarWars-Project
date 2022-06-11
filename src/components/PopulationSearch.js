import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function PopulationSearch() {
  const { selectChange, selectInput, filterBtn,
    selectOptions, orderFilter, orderTable, orderBtn } = useContext(MyContext);
  const { col, operator, num } = selectChange;
  const { column, sort } = orderTable;

  return (
    <div>
      <label htmlFor="select">
        <select
          data-testid="column-filter"
          id="select"
          name="col"
          value={ col }
          onChange={ selectInput }
        >
          {selectOptions.map((op, index) => (
            <option
              key={ index }
            >
              {op}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="size">
        <select
          id="size"
          data-testid="comparison-filter"
          name="operator"
          value={ operator }
          onChange={ selectInput }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <label htmlFor="input">
        <input
          id="input"
          data-testid="value-filter"
          type="number"
          name="num"
          value={ num }
          onChange={ selectInput }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ filterBtn }
      >
        Filtrar
      </button>
      <label htmlFor="order">
        <select
          htmlFor="order"
          id="order"
          data-testid="column-sort"
          name="column"
          value={ column }
          onChange={ orderFilter }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </label>
      <label htmlFor="radioInput">
        <input
          id="radioInput"
          data-testid="column-sort-input-asc"
          type="radio"
          name="sort"
          value="ASC"
          checked={ sort === 'ASC' }
          onChange={ orderFilter }
        />
        ASC
      </label>
      <label htmlFor="radioInput2">
        <input
          id="radioInput2"
          data-testid="column-sort-input-desc"
          type="radio"
          name="sort"
          value="DESC"
          checked={ sort === 'DESC' }
          onChange={ orderFilter }
        />
        DESC
      </label>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ orderBtn }
      >
        ORDENAR
      </button>
    </div>
  );
}

export default PopulationSearch;
