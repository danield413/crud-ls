import React from "react";
import { ListItem } from "./ListItem";

export const List = ({items , handleDelete, handleUpdate}) => {
  return (
  <div className="col-sm-12 col-md-6 rounded py-3">
      <div className="row">
        <h3 className="text-white text-start">Creados</h3>
        <p className="text-white text-center">Aquí aparecen tus creados</p>
        <ul>
          <div className="overflow-auto" id="div-scroll">
          { items !== null && items.map(todo => (
            <ListItem key={todo.id} nombre={todo.nombre} sintomas={todo.sintomas} id={todo.id} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
          ))}

          </div>
        </ul>
      </div>
  </div>
  );
};
