import React, { ReactNode } from 'react';

import './Regular.css';

type RegularProps = { children: ReactNode };

const Regular = ({ children }: RegularProps) => <div className="regular">{children}</div>;

export default Regular;
