import type { ComponentProps } from 'react';

import './button.css';

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'quiet';
};

export const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => {
  const classes = className ? `button ${className}` : 'button';

  return <button className={classes} data-variant={variant} {...props} />;
};
