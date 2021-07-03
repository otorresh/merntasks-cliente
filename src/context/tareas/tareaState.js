import React, { useReducer } from 'react';
import TareaReducer from './tareaReducer';
import tareaContext from './tareaContext';
import clienteAxios from '../../config/axios';
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from '../../types';


const TareaState = props => {
  const initalState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null,
  };

  // Crear dispatch y state
  const [state, dispatch] = useReducer(TareaReducer, initalState);

  // Crear las funciones

  // Obtener las tareas de un proyecto
  const obtenerTareas = async proyecto => {
    try {
      const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto } });
      console.log(resultado);
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Agregar una tarea al proyecto seleccionado
  const agregarTarea = async tarea => {
    try {
      const resultado = await clienteAxios.post('/api/tareas', tarea);
      dispatch({
        type: AGREGAR_TAREA,
        payload: resultado.data
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Valida y muestra un error en caso de que sea necesario
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    });
  };

  // Eliminar tarea por id
  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Extrae una tarea para edición
  const guardarTareaActual = tarea => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    });
  };

  // Edita o modifica una tarea
  const actualizarTarea = async tarea => {
    try {
      const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea
      });
    } catch (error) {
      console.error(error);
    }
    
  };

  // Elimina la tareaseleccionada
  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA
    });
  };

  return (
    <tareaContext.Provider
      value={{
        tareas: state.tareas,
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea,
      }}
    >
      {props.children}
    </tareaContext.Provider>
  );
};

export default TareaState;