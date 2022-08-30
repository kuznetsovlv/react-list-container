import React, { useCallback } from 'react';

import './Scroll.css';

type ScrollProps = {
  contentHeight: number;
  height: number;
  position: number;
  top: number;
  onScroll: (shift: number) => void;
};

const Scroll = ({
  contentHeight,
  height,
  position,
  top,
  onScroll
}: ScrollProps) => {
  const sliderHeight = contentHeight
    ? Math.min(Math.max((height * height) / contentHeight, 10), height)
    : height;

  return (
    <div
      className="scroll"
      onClick={useCallback(
        ({ clientY }: React.MouseEvent<HTMLDivElement>) =>
          onScroll((100 * (clientY - top)) / height),
        [height, top, onScroll]
      )}
    >
      <div
        className="slider"
        style={{
          top: `${position}%`,
          transform: `translate(0, ${-position}%)`,
          height: sliderHeight
        }}
        onMouseDown={useCallback(
          ({ clientY: startClientY }: React.MouseEvent<HTMLDivElement>) => {
            const startPosition = position;
            const handleShift = ({ clientY }: MouseEvent) => {
              onScroll(
                Math.max(
                  Math.min(
                    startPosition + (100 * (clientY - startClientY)) / height,
                    100
                  ),
                  0
                )
              );
            };

            const handlerUp = () => {
              window.document.removeEventListener('mousemove', handleShift);
              window.document.removeEventListener('mouseup', handlerUp);
            };

            window.document.addEventListener('mousemove', handleShift, false);
            window.document.addEventListener('mouseup', handlerUp);
          },
          [position, height, onScroll]
        )}
        onClick={useCallback((event: React.MouseEvent<HTMLDivElement>) => {
          event.stopPropagation();
          event.cancelable = true;
        }, [])}
      />
    </div>
  );
};

export default Scroll;
