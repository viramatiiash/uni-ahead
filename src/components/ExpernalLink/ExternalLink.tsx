import { ExternalLinkProps } from '@interfaces/externalLink.types';

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  children,
  className,
  target = '_blank',
  rel = 'noopener noreferrer',
}) => {
  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
};
