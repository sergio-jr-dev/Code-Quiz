import type { ComponentProps } from 'react';

import './button.css';

type ButtonProps = ComponentProps<'button'>;

export const Button = ({ className, ...props }: ButtonProps) => {
  const classes = className ? `button ${className}` : 'button';

  return <button className={classes} {...props} />;
};
