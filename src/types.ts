/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  fullDescription: string;
  tools: string[];
  year: string;
  client: string;
  gallery?: string[];
  challenge?: string;
  direction?: string;
  result?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: any;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image?: string;
  company?: string;
}
