import React from 'react';
import type { ReactNode } from 'react';

import './After.css';

type AfterProps = { children: ReactNode };

const After = ({ children }: AfterProps) => (
  <div className="after">{children}</div>
);

export default After;
