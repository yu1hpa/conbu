import React from "react";

export const Header = () => {
  return(
    <div>
      <header className="py-2 border-b-4 border-gray-300">
        <div  className="py-4 grid place-items-center">
          <a className="text-center hover:opacity-50">
            <h1 className="text-5xl font-mono text-pink-800">
              <a href="https://github.com/yu1hpa/conbu">CONBU</a>
            </h1>
          </a>
        </div>
        <div className="flex justify-center">
          <span className="underline decoration-green-600 text-pink-800">CO</span>
            VID-19 INFECTED PEOPLE SOI
          <span className="underline decoration-green-600 text-pink-800">N</span>
            SUU
          <span className="underline decoration-green-600 text-pink-800">BU</span>
            NKAI
            (素因数分解)
        </div>
      </header>
    </div>
  );
};
