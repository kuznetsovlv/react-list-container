import React, {ReactNode} from 'react';

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

const List = ({list, itemSize, before, beforeSize, after, afterSize, height, position, contentHeight }: ListProps) => {
    const shift = (contentHeight - height) * position / 100;

    const from = Math.max(Math.floor((shift - beforeSize) / itemSize), 0);

    const to = Math.floor((shift - beforeSize + height) / itemSize);

    const itemShift = beforeSize + from * itemSize - shift;

    return (
        <ul className="list">
            {shift < beforeSize && <Item top={-shift}>{before}</Item>}
            {list.slice(from, to + 1).map((el, index) => <Item key={String(index + from)} top={itemShift}>{el}</Item>)}
            {(shift > contentHeight - height - afterSize || contentHeight - afterSize < height) && <Item top={shift - contentHeight + afterSize}>{after}</Item>}
        </ul>
    );
}

export default List;
