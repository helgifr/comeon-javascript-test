import React from 'react';

import './Categories.css';

export default function Categories({
  categories,
  changeCategories,
  clicked
}) {
  return (
    categories.map(({ id, name }) => (
      <div
        key={name}
        className={(id === clicked ? 'clicked ' : '') + `category item`}
        onClick={() => changeCategories(id)}
      >
        <div className="content">
          <div className="header">{name}</div>
        </div>
      </div>
    ))
  );
}