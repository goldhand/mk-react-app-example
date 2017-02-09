import React from 'react';


const Hello = ({
  value,
  onClick,
}) => {

  if (value === 1) {
    value--;
  }

  if (value === 2) {
    value++;
  }

  return (
    <h1 onClick={onClick}>{value}</h1>
  );
}

export default Hello;
