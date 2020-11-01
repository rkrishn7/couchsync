const animation = {
  entered: {
    opacity: 1,
    transform: 'scale(1)',
    transformOrigin: 'bottom right',
  },
  entering: {
    opacity: 0,
    transform: 'scale(0.5)',
    transformOrigin: 'bottom right',
  },
  exited: {
    opacity: 0,
    transform: 'scale(0)',
    transformOrigin: 'bottom right',
  },
  exiting: {
    opacity: 0,
    transform: 'scale(0.5)',
    transformOrigin: 'bottom right',
  },
  unmounted: {
    opacity: 0,
    transform: 'scale(0)',
    transformOrigin: 'bottom right',
  },
};

export default animation;
