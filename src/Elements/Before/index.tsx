import React from 'react';
import type { ReactNode } from 'react';

import './Before.css';

type BeforeProps = { children: ReactNode };

const Before = ({ children }: BeforeProps) => (
  <div className="before">{children}</div>
);

export default Before;
