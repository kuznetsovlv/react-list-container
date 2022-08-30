import React, { useMemo } from 'react';
import type { ReactNode } from 'react';

import Item from './Item';
import './List.css';

type ListProps = {
  list: ReactNode[];
  itemSize: number;
  before: ReactNode;
  beforeSize: number;
  after: ReactNode;
  afterSize: number;
  height: number;
  position: number;
  contentHeight: number;
};

const List = ({
  list,
  itemSize,
  before,
  beforeSize,
  after,
  afterSize,
  height,
  position,
  contentHeight
}: ListProps) => {
  const shift = ((contentHeight - height) * position) / 100;

  const listCoords = Math.max(shift - beforeSize, 0);

  const from = Math.floor(listCoords / itemSize);

  const to = Math.floor((listCoords + height) / itemSize);

  const itemShift = -(listCoords % itemSize);

  return (
    <ul className="list">
      {shift < beforeSize && <Item top={itemShift}>{before}</Item>}
      {useMemo(
        () =>
          list.slice(from, to + 1).map((el, index) => (
            <Item key={String(index + from)} top={itemShift}>
              {el}
            </Item>
          )),
        [from, to, itemShift]
      )}
      {(shift > contentHeight - height - afterSize ||
        contentHeight - afterSize < height) && (
        <Item top={itemShift}>{after}</Item>
      )}
    </ul>
  );
};

export default List;
