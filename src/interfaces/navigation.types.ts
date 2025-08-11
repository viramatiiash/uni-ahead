
export interface NavigationLink {
  title: string;
  link: string;
}

export interface NavigationProps {
  linksArray: NavigationLink[];
  navStyles: string;
  linkStyles: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}
