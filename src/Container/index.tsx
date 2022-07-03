import React, { useRef, useEffect, useState } from 'react';

import Main from './Main';
import Scroll from './Scroll';
import './Container.css';

const Container = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [height, setHeight] = useState(0);
    const [position, setPosition] = useState(0);

    useEffect(() => setHeight(containerRef?.current?.getBoundingClientRect()?.height ?? 0), [containerRef, setHeight]);

    const handleScroll = (shift: number) => {
        if (height) {
            let p = position + 100 * shift / height;

            if (p < 0) {
                setPosition(0);
            } else if (p > 100) {
                setPosition(100);
            } else {
                setPosition(p);
            }
        }
    }

    return (
        <div className="container" ref={containerRef}>
            <Main/>
            <Scroll position={position} onScroll={handleScroll}/>
        </div>
    );
}

export default Container;