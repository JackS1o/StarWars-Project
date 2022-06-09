import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function PopulationSearch() {
  const { selectChange, selectInput, filterBtn, selectOptions } = useContext(MyContext);
  const { column, operator, num } = selectChange;

  return (
    <div>
      <label htmlFor="select">
        <select
          data-testid="column-filter"
          id="select"
          name="column"
          value={ column }
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
    </div>
  );
}

export default PopulationSearch;
