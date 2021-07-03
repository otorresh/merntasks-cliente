import React from 'react';
import NuevoProoyecto from '../proyectos/NuevoProyecto';
import ListadoProyectos from '../proyectos/ListadoProyectos';

const Sidebar = () => {
  return (
    <aside>
      <h1>MERN<span>Tasks</span></h1>

      <NuevoProoyecto />

      <div className="proyectos">
        <h2>Tus Proyectos</h2>

        <ListadoProyectos />
      </div>
    </aside>
  );
};

export default Sidebar;