import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { List } from "./List";

export const Form = () => {
  const [state, setState] = useState({
    nombre: "",
    sintomas: "",
  });
  const [error, setError] = useState(false);
  const { nombre, sintomas } = state;
  const [itemsActuales, setItemsActuales] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const itemsActualesLS = localStorage.getItem("items");
    if(itemsActualesLS !== null) {
      const itemsActualesParseados = JSON.parse(itemsActualesLS);
      setItemsActuales(itemsActualesParseados.reverse());
    }
  }, [isCreating]);

  const array = [];
  const handleCreate = (e) => {
    e.preventDefault();
    if (nombre.length < 2 || sintomas.length < 5) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }

    const nuevoTodo = {
      ...state,
      id: Date.now(),
    };
    array.push(nuevoTodo);

    //Guardar en LS
    if (localStorage.getItem("items") === null) {
      localStorage.setItem("items", JSON.stringify(array));
    } else {
      const items = localStorage.getItem("items");
      const itemsParseados = JSON.parse(items);
      itemsParseados.push(nuevoTodo);
      localStorage.setItem("items", JSON.stringify(itemsParseados));
    }

    //Mostrar alert
    Swal.fire("Creada!", "", "success");

    //Reseteamos el formulario
    setState({
      nombre: "",
      sintomas: "",
    });

    //Cambiamos a isCreating para inducir a un nuevo cambio del useEffect y cargar el LS nuevo
    setIsCreating(!isCreating);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás segur@?",
      text: "Esta acción no puede revertirse",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const items = localStorage.getItem("items");
        const itemsParseados = JSON.parse(items);
        const nuevosItems = itemsParseados.filter((item) => item.id !== id);
        localStorage.setItem("items", JSON.stringify(nuevosItems));

        //Cambiamos a isCreating para inducir a un nuevo cambio del useEffect y cargar el LS nuevo
        setIsCreating(!isCreating);

        Swal.fire("Eliminada!", "", "success");
      }
    });
  };

  const handleUpdate = (id, nombre, sintomas) => {
    const items = localStorage.getItem("items");
    const itemsParseados = JSON.parse(items);
    const itemAct = {
      nombre,
      sintomas,
      id,
    };
    const actualizados = itemsParseados.map((item) =>
      item.id === id ? itemAct : item
    );
    localStorage.setItem("items", JSON.stringify(actualizados));

    //Cambiamos a isCreating para inducir a un nuevo cambio del useEffect y cargar el LS nuevo
    setIsCreating(!isCreating);

    Swal.fire("Actualizada!", "", "success");
  };

  return (
    <>
      <div className="col-sm-12 col-md-6 px-5 py-2">
        <form onSubmit={handleCreate}>
          <div className="mb-3">
            {error && (
              <div className="alert alert-danger text-center">
                <strong>Revisa los datos del formulario </strong>
              </div>
            )}
            <label htmlFor="nombre" className="form-label text-white">
              Nombre paciente
            </label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={nombre}
              onChange={(e) => setState({ ...state, nombre: e.target.value })}
            />
            <label htmlFor="sintomas" className="form-label text-white mt-3">
              Síntomas
            </label>
            <textarea
              type="text"
              className="form-control mb-4"
              name="sintomas"
              value={sintomas}
              onChange={(e) => setState({ ...state, sintomas: e.target.value })}
            ></textarea>
            <div className="d-grid col-6 mx-auto">
              <button className="btn btn-outline-primary" type="submit">
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
      {itemsActuales && (
        <List
          items={itemsActuales}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      )}
    </>
  );
};
