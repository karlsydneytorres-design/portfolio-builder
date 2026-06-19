// Portfolio Site Builder — Core Data Model

export type BlockType =
  | "text"
  | "image"
  | "project_card"
  | "contact_form"
  | "social_links";

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type BlockStyle = {
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  padding?: number;
};

// --- Per-block-type content shapes ---
// Loosely typed for now; tighten into a discriminated union
// once you build out the renderer for each block type.

export type TextContent = {
  text: string;
};

export type ImageContent = {
  url: string;
  alt?: string;
};

export type ProjectCardContent = {
  title: string;
  description?: string;
  imageUrl?: string;
  link?: string;
};

export type ContactFormContent = {
  recipientEmail: string;
  fields?: ("name" | "email" | "message")[];
};

export type SocialLinksContent = {
  links: { platform: string; url: string }[];
};

export type BlockContent =
  | TextContent
  | ImageContent
  | ProjectCardContent
  | ContactFormContent
  | SocialLinksContent;

// --- Core Block ---

export type Block = {
  id: string;
  type: BlockType;
  position: Position;
  size: Size;
  zIndex: number;
  content: BlockContent;
  style?: BlockStyle;
};

// --- Site ---

export type Theme = {
  colorScheme: string;
  font: string;
};

export type SEO = {
  title?: string;
  description?: string;
  ogImage?: string;
};

export type Site = {
  id: string;
  userId: string;
  subdomain: string;
  theme: Theme;
  blocks: Block[];
  isPublished: boolean;
  seo?: SEO;
};
