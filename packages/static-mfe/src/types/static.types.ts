// Types for static pages
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ManualSection {
  id: string;
  title: string;
  content: string;
  subsections?: ManualSection[];
}

export interface SitemapItem {
  title: string;
  path: string;
  description?: string;
  children?: SitemapItem[];
}
