import React from "react";

const MovieGenre = () => {
  return (
    <section>
      <div className="w-full">
        {/* Hacer que el 'genre name' sea el nombre del genero que se haya buscado */}
        <p className="text-slate uppercase">Genre name</p>
        <div className="max-w-full h-[1px] bg-gray"></div>
      </div>
      <div>
        {/* Hacer un fetcheo de las peliculas de el genero que se haya buscado */}
      </div>
    </section>
  );
};

export default MovieGenre;
