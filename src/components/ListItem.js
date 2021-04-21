import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { VscChromeClose } from 'react-icons/vsc';

export const ListItem = ({nombre, sintomas, id, handleDelete, handleUpdate,}) => {
  const [state, setState] = useState({
    nombreForm: nombre,
    sintomasForm: sintomas,
  });
  const { nombreForm, sintomasForm } = state;
  const [open, setOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(id, nombreForm, sintomasForm);
  };

  return (
    <>
      <li>
        <div className="div alert alert-dark">
          <div>
            <strong>{nombre} - </strong>
            <strong>Síntomas:</strong> {sintomas}
          </div>
          <div className="row mt-3">
            <div className="col-12 d-flex justify-content-end">
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(id)}
              >
                <FaTrash />
              </button>
              <button
                type="button"
                className="btn btn-success mx-2 text-white"
                onClick={ () => setOpen(!open)}
              >
                {!open ? <MdModeEdit /> : <VscChromeClose />}
              </button>
            </div>
          </div>
          {open && <div className="row">
            <form onSubmit={handleSubmit}>
                <p>{id}</p>
              <label htmlFor="nombre" className="form-label">
                Nombre paciente
              </label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={nombreForm}
                onChange={(e) =>
                  setState({ ...state, nombreForm: e.target.value })
                }
              />
              <label htmlFor="sintomas" className="form-label mt-3">
                Síntomas
              </label>
              <textarea
                type="text"
                className="form-control mb-4"
                name="sintomas"
                value={sintomasForm}
                onChange={(e) =>
                  setState({ ...state, sintomasForm: e.target.value })
                }
              ></textarea>
              <div className="d-grid col-6 mx-auto">
              <button className="btn btn-outline-primary" type="submit">
                Actualizar
              </button>
            </div>
            </form>
          </div>}
        </div>
      </li>
    </>
  );
};
