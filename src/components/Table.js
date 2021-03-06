import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import PopulationSearch from './PopulationSearch';

function Table() {
  const { searchInput, filterSearch,
    filtredList, optionsList, removeBtn, removeAllFilters } = useContext(MyContext);

  return (
    <div>
      <label htmlFor="search">
        <input
          id="search"
          type="text"
          data-testid="name-filter"
          name="searchInput"
          value={ searchInput }
          onChange={ filterSearch }
        />
      </label>
      <PopulationSearch />
      <div>
        {optionsList.map((opt, index) => (
          <p
            data-testid="filter"
            key={ index }
          >
            {opt.col}
            {' '}
            {opt.operator}
            {' '}
            {opt.num}
            {' '}
            <button
              onClick={ () => removeBtn(opt) }
              type="button"
            >
              X
            </button>
          </p>
        ))}
        <button
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
          type="button"
        >
          Remover todas filtragens
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>climate</th>
            <th>created</th>
            <th>diameter</th>
            <th>edited</th>
            <th>films</th>
            <th>gravity</th>
            <th>name</th>
            <th>orbital_period</th>
            <th>population</th>
            <th>rotation_period</th>
            <th>surface_water</th>
            <th>terrain</th>
            <th>url</th>
          </tr>
        </thead>
        <tbody>
          {filtredList.map((planets, index) => (
            <tr key={ index }>
              <td>{planets.climate}</td>
              <td>{planets.created}</td>
              <td>{planets.diameter}</td>
              <td>{planets.edited}</td>
              <td>{planets.films}</td>
              <td>{planets.gravity}</td>
              <td data-testid="planet-name">{planets.name}</td>
              <td>{planets.orbital_period}</td>
              <td>{planets.population}</td>
              <td>{planets.rotation_period}</td>
              <td>{planets.surface_water}</td>
              <td>{planets.terrain}</td>
              <td>{planets.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
