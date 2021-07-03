import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import Tarea from './Tarea';

const ListadoTareas = () => {

  // Obtener el state de proyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  // Obtener las tareas del proyecto
  const tareasContext = useContext(tareaContext);
  const { tareasproyecto } = tareasContext;

  if (!proyecto) return <h2>Selecciona un proyecto</h2>;

  // Elimina un proyecto
  const onClickEliminar = () => {
    eliminarProyecto(proyecto._id);
  };

  return (
    <Fragment>
      <h2>Proyecto: {proyecto.nombre}</h2>

      <ul className="listado-tareas">
        { tareasproyecto.length === 0
          ? <li className="tarea"><p>No hay tareas</p></li>
          :
          <TransitionGroup>
            {
              tareasproyecto.map(tarea =>
                <CSSTransition
                  key={tarea._id}
                  timeout={300}
                  classNames="tarea"
                >
                  <Tarea
                    tarea={tarea}
                  />
                </CSSTransition>
              )
            }
          </TransitionGroup>
        }
      </ul>

      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onClickEliminar}
      >Eliminar Proyecto &times;</button>
    </Fragment>
  );
};

export default ListadoTareas;