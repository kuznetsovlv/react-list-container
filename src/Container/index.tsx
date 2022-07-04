import React, { useRef, useEffect, useState } from 'react';

import List from './List';
import Scroll from './Scroll';
import './Container.css';

const Container = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [{ height, top }, setRect] = useState({
        height: 0,
        top: 0
    });
    const [position, setPosition] = useState(0);

    useEffect(() => setRect(containerRef?.current?.getBoundingClientRect() ?? { height: 0, top: 0 }), [containerRef, setRect]);

    return (
        <div className="container" ref={containerRef}>
            <List/>
            <Scroll contentHeight={0} height={height} position={position} top={top} onScroll={setPosition}/>
        </div>
    );
}

export default Container;