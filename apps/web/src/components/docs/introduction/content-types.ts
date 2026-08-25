export type NavMethod = "GET" | "POST";

export type NavLink = {
  type: "link";
  label: string;
  href: string;
  method?: NavMethod;
  active?: boolean;
};

export type NavSection = {
  type: "section";
  label: string;
  children: NavLink[];
};

export type NavFolder = {
  type: "folder";
  label: string;
  defaultOpen: boolean;
  children: Array<NavLink | NavSection>;
};

export type NavItem = NavFolder | NavSection | NavLink;

export type TocItem = {
  id: string;
  title: string;
  depth: 2 | 3;
};

export type Advantage = {
  title: string;
  bullets: string[];
};

export type ProductBlock = {
  id: string;
  title: string;
  bullets: string[];
};
