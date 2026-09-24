import type { ComponentProps } from 'react';

import './container.css';

type ContainerProps = ComponentProps<'div'>;

export const Container = ({ className, ...props }: ContainerProps) => {
  const classes = className ? `container ${className}` : 'container';

  return <div className={classes} {...props} />;
};
