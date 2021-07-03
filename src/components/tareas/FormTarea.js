import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

  // Extraer si un proyecto está activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  // Obtener las función del context de tarea
  const tareasContext = useContext(tareaContext);
  const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

  // Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: ''
      });
    }
  }, [tareaseleccionada]);

  // State del formulario
  const [tarea, guardarTarea] = useState({
    nombre: ''
  });

  if (!proyecto) return null;

  // Leer los valores del formulario
  const handleChange = e => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value
    });
  };

  // Extraer el nombre del proyecto
  const { nombre } = tarea;

  const onSubmit = e => {
    e.preventDefault();

    // Validar
    if (nombre.trim() === '') {
      validarTarea();
      return;
    }

    // Pasar la validación

    // Si es edición o si es nueva tarea
    if (tareaseleccionada === null) {
      // Agregar la nueva tarea al state de tarea
      tarea.proyecto = proyecto._id;
      agregarTarea(tarea);
    } else {
      // Actualizar tarea existente
      actualizarTarea(tarea);

      // Elimina tareaseleccionada del state
      limpiarTarea();
    }

    // Obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyecto.id);

    // Reiniciar el form
    guardarTarea({
      nombre: ''
    });
  }

  return (
    <div className="formulario">
      <form
        onSubmit={onSubmit}
      >
        <div  className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-block btn-primario"
            value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
          />
        </div>
      </form>
      { errortarea ? <p className="mensaje error">El nombre de la Tarea es obligatorio</p> : null }
    </div>
  );
};

export default FormTarea;