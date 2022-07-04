import React, { ReactNode } from 'react';

type ItemProps = { children: ReactNode; top: number };

const Item = ({ children, top }: ItemProps) => <li className="item" style={{ top }}>{children}</li>;

export default Item;
