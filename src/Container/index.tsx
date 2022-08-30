import React, { useRef, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import classNames from 'classnames';

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

const Container = ({
  list,
  itemSize,
  beforeSize,
  afterSize,
  ...props
}: ContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const contentHeight = beforeSize + afterSize + list.length * itemSize;

  const [{ height, top }, setRect] = useState({
    height: 0,
    top: 0
  });
  const [position, setPosition] = useState(0);

  useEffect(
    () =>
      setRect(
        containerRef?.current?.getBoundingClientRect() ?? { height: 0, top: 0 }
      ),
    [containerRef, setRect]
  );

  const needScroll = contentHeight > height;

  return (
    <div
      className={classNames('container', { withscroll: needScroll })}
      ref={containerRef}
      onWheel={({ deltaY }) => {
        if (needScroll) {
          setPosition(
            Math.max(
              Math.min(
                position + (100 * deltaY) / (contentHeight - height),
                100
              ),
              0
            )
          );
        }
      }}
    >
      <List
        {...props}
        list={list}
        itemSize={itemSize}
        beforeSize={beforeSize}
        afterSize={afterSize}
        height={height}
        position={position}
        contentHeight={contentHeight}
      />
      {needScroll && (
        <Scroll
          contentHeight={contentHeight}
          height={height}
          position={position}
          top={top}
          onScroll={setPosition}
        />
      )}
    </div>
  );
};

export default Container;
