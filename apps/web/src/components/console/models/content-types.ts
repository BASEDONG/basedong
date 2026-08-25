export interface ModelCardData {
  id: string;
  title: string;
  provider: string;
  description: string;
  logo: string;
  badge: string | null;
  deprecated: boolean;
  typeTags: string[];
  featureTags: string[];
}

export interface NavItem {
  key: string;
  label: string;
  icon: string;
  href?: string;
  active?: boolean;
}

export interface NavGroup {
  key: string;
  label: string;
  badge?: string;
  items: NavItem[];
}

export interface FooterLink {
  key: string;
  label: string;
  href: string;
  icon: string;
}

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterSection {
  id: string;
  label: string;
  options: FilterOption[];
}
