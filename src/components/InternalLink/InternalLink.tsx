import { InternalLinkProps } from '@interfaces/internalLink.types';
import { HashLink } from 'react-router-hash-link';

export const InternalLink: React.FC<InternalLinkProps> = ({
  to,
  children,
  className,
}) => {
  return (
    <HashLink to={to} smooth className={className}>
      {children}
    </HashLink>
  );
};
