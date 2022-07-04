import React, {useRef, useEffect, useState, ReactNode} from 'react';

import List from './List';
import Scroll from './Scroll';
import './Container.css';

type ContainerProps = {
    list: ReactNode[];
    itemSize: number;
    before: ReactNode;
    beforeSize: number;
    after: ReactNode;
    afterSize: number;
};

const Container = ({list, itemSize, beforeSize, afterSize, ...props}: ContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const contentHeight = beforeSize + afterSize + list.length * itemSize;

    const [{ height, top }, setRect] = useState({
        height: 0,
        top: 0
    });
    const [position, setPosition] = useState(0);

    useEffect(() => setRect(containerRef?.current?.getBoundingClientRect() ?? { height: 0, top: 0 }), [containerRef, setRect]);

    return (
        <div
            className="container"
            ref={containerRef}
            onWheel={({ deltaY }) => setPosition(Math.max(Math.min(position + 100 * deltaY / (contentHeight - height), 100),0))}
        >
            <List {...props}
                  list={list}
                  itemSize={itemSize}
                  beforeSize={beforeSize}
                  afterSize={afterSize}
                  height={height}
                  position={position}
                  contentHeight={contentHeight}
            />
            <Scroll contentHeight={contentHeight} height={height} position={position} top={top} onScroll={setPosition}/>
        </div>
    );
}

export default Container;