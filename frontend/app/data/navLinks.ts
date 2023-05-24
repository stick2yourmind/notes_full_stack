export type NavLink = {
  name: string,
  href: Pages
}

export enum Pages {
  ACTIVE = "/",
  ARCHIVED = "/archived"
}

export const navLinks:NavLink[] = [
  {
    name: "Active",
    href: Pages.ACTIVE
  },
  {
    name: "Archived",
    href: Pages.ARCHIVED
  }
]