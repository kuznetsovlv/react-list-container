import React, {DragEventHandler, useState} from 'react';

import './Scroll.css';

type ScrollProps = { position: number, onScroll: (shift: number) => void };

const Scroll = ({ position, onScroll }: ScrollProps) => {

    const [startPosition, setStartPosition] = useState(0);

    const handleShift: DragEventHandler<HTMLDivElement> = ({ clientY }) => onScroll(clientY - startPosition);

    return (
        <div className="scroll">
            <div className="slider" style={{top: `${position}%`, transform: `translate(0, ${-position}%)`}}
                 onDragStart={({ clientY }) => setStartPosition(clientY) } onDrag={handleShift} onDragEnd={handleShift}/>
        </div>
    );
};

export default Scroll;
