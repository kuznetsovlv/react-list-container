import React, {DragEventHandler, MouseEventHandler, useState} from 'react';

import './Scroll.css';

type ScrollProps = {
    contentHeight: number;
    height: number;
    position: number;
    top: number;
    onScroll: (shift: number) => void
};

const Scroll = ({ contentHeight, height, position, top, onScroll }: ScrollProps) => {
    const sliderHeight = contentHeight ? Math.min(Math.max(height * height / contentHeight, 10), height) : height;

    return (
        <div className="scroll" onClick={({ clientY }) => onScroll(100 * (clientY - top) / height)}>
            <div
                className="slider"
                style={{top: `${position}%`, transform: `translate(0, ${-position}%)`, height: sliderHeight }}
                onMouseDown={({ clientY: startClientY }) => {
                    const startPosition = position;
                    const handleShift = ({ clientY }: MouseEvent) => {

                        onScroll(Math.max(Math.min(startPosition + 100 * (clientY - startClientY) / height, 100), 0));
                    }

                    const handlerUp = () => {
                        window.document.removeEventListener('mousemove', handleShift);
                        window.document.removeEventListener('mouseup', handlerUp);
                    }

                    window.document.addEventListener('mousemove', handleShift, false);
                    window.document.addEventListener('mouseup', handlerUp);

                }}
                onClick={(event) => {
                    event.stopPropagation();
                    event.cancelable = true;
                }}
            />
        </div>
    );
};

export default Scroll;
