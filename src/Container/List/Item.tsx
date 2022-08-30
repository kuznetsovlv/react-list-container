import React from 'react';
import type { ReactNode } from 'react';

import './Item.css';

type ItemProps = { children: ReactNode; top: number };

const Item = ({ children, top }: ItemProps) => (
  <li className="item" style={{ top: `${top}px` }}>
    {children}
  </li>
);

export default Item;
