import React from 'react';
import { Transition } from 'react-transition-group';
import * as Animations from './animations';

const DEFAULT_ANIMATION_DURATION = 300;

export type AnimationType = keyof typeof Animations;

interface AnimateProps {
  show: boolean;
  duration?: number;
  type: AnimationType;
  appear?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
}

export const Animate: React.FC<AnimateProps> = ({
  duration = DEFAULT_ANIMATION_DURATION,
  children,
  show,
  type,
  appear = true,
  mountOnEnter = true,
  unmountOnExit = true,
}) => {
  const styles = Animations[type];

  return (
    <Transition
      in={show}
      timeout={{
        enter: 0,
        exit: duration,
      }}
      appear={appear}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}>
      {state =>
        React.Children.map(children, child =>
          React.cloneElement(child as React.ReactElement<any>, {
            style: {
              ...styles[state],
              ...{
                transition: `all ${duration}ms linear`,
              },
            },
          })
        )
      }
    </Transition>
  );
};
