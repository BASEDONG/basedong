export type NavMethod = "GET" | "POST" | "DELETE" | "PUT";

export type NavLink = {
  type: "link";
  label: string;
  href: string;
  method?: NavMethod;
};

/** Section may nest further sections (e.g. 聊天 → 原生OpenAI格式 → endpoints). */
export type NavSection = {
  type: "section";
  label: string;
  children: Array<NavLink | NavSection>;
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
