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
  /** Backend `supported_endpoint_types` for code-sample / docs routing. */
  endpointTypes?: string[];
  /**
   * Context window display label from `bsCtx*` (preferred) or legacy `128K`/`1M`.
   * Null when unknown.
   */
  context?: string | null;
  /** Context window in thousands of tokens; 0 when unknown (filter helper). */
  contextK?: number;
  /** USD display from Backend ratios; omitted when unknown. */
  retailPrice?: {
    input: string;
    output: string;
    cache: string;
    unit: string;
  };
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
  /** Source-locale key for filter matching (Chinese IDs). */
  matchKey?: string;
}

export interface FilterSection {
  id: string;
  label: string;
  options: FilterOption[];
}
