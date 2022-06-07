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
          {deleteResidents().map((planets, index) => (
            <tr key={ index }>
              <td>{planets.climate}</td>
              <td>{planets.created}</td>
              <td>{planets.diameter}</td>
              <td>{planets.edited}</td>
              <td>{planets.films}</td>
              <td>{planets.gravity}</td>
              <td>{planets.name}</td>
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
