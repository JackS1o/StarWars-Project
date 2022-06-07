import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { data } = useContext(MyContext);

  const deleteResidents = () => {
    const newData = [];
    data.forEach((planets) => {
      delete planets.residents;
      newData.push(planets);
    });
    return newData;
  };

  return (
    <div>
      <table>
        <tr>
          {deleteResidents().map((planet) => (
            <>
              <th>{planet.climate}</th>
              <th>{planet.created}</th>
              <th>{planet.diameter}</th>
              <th>{planet.edited}</th>
              <th>{planet.films}</th>
              <th>{planet.gravity}</th>
              <th>{planet.name}</th>
              <th>{planet.orbital_period}</th>
              <th>{planet.population}</th>
              <th>{planet.rotation_period}</th>
              <th>{planet.surface_water}</th>
              <th>{planet.terrain}</th>
              <th>{planet.url}</th>
            </>
          ))}
        </tr>
      </table>
    </div>
  );
}

export default Table;
