import React from 'react';
export function Header() {

  return (
    <header className="flex justify-center flex-col items-center w-full h-[12.5rem] bg-gray-900" >
      <img className=" w-24 h-24 md:w-32 md:h-32" src="src/assets/listit.svg" alt="Logo ListIt" />
    </header>
  );
}