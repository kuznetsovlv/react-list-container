import React, {DragEventHandler, useState } from 'react';

import './Scroll.css';

type ScrollProps = {
    contentHeight: number;
    height: number;
    position: number;
    top: number;
    onScroll: (shift: number) => void
};

const Scroll = ({ contentHeight, height, position, top, onScroll }: ScrollProps) => {
    const [{ startClientY, startPosition }, setStartPosition] = useState({ startClientY: 0, startPosition: 0 });

    const sliderHeight = contentHeight ? Math.min(Math.max(height * height / contentHeight, 5), height) : height;

    const handleShift: DragEventHandler<HTMLDivElement> = ({ clientY }) => onScroll(Math.max(Math.min(startPosition + 100 * (clientY - startClientY) / height, 100), 0));

    return (
        <div className="scroll" onClick={({ clientY }) => onScroll(100 * (clientY - top) / height)}>
            <div className="slider" style={{top: `${position}%`, transform: `translate(0, ${-position}%)`, height: sliderHeight }}
                 onDragStart={({ clientY }) => setStartPosition({startClientY: clientY, startPosition: position }) } onDrag={handleShift} onDragEnd={handleShift}/>
        </div>
    );
};

export default Scroll;
