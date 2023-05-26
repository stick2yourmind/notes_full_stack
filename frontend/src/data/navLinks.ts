export type NavLink = {
  name: string,
  href: Pages
}

export enum Pages {
  // eslint-disable-next-line no-unused-vars
  ACTIVE = '/',
  // eslint-disable-next-line no-unused-vars
  ARCHIVED = '/archived'
}

export const navLinks:NavLink[] = [
  {
    name: 'Active',
    href: Pages.ACTIVE
  },
  {
    name: 'Archived',
    href: Pages.ARCHIVED
  }
];