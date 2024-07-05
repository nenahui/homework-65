export interface Page {
  title: string;
  content: string;
  img?: string;
}

export interface PageMutation extends Page {
  page: string;
}

export interface PagesKeys {
  [key: string]: { title: string };
}
