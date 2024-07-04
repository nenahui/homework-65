export interface Page {
  title: string;
  content: string;
}

export interface PageMutation extends Page {
  page: string;
}
