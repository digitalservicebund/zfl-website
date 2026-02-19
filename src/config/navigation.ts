type NavItem = {
  segment: string;
  title: string;
  children?: NavItem[];
}

export type ResolvedNavItem = {
  path: string;
  title: string;
  children?: ResolvedNavItem[];
}

const navigation: NavItem[] = [
  { segment: "begleitungen", title: "Begleitungen" },
  { segment: "schulungen", title: "Schulungen" },
  // { segment: "anleitungen-und-hilfsmittel", title: "Anleitungen und Hilfsmittel" },
  // {
  //   segment: "ueber-uns",
  //   title: "Über uns",
  //   children: [
  //     { segment: "zahlen-und-fakten", title: "Zahlen und Fakten" },
  //     { segment: "daran-arbeiten-wir", title: "Daran arbeiten wir" },
  //   ],
  // },
];

// Resolves the navigation items to full paths
export default navigation.map((item) => ({
  path: `/${item.segment}`,
  title: item.title,
  children: item.children?.map((child) => ({
    path: `/${item.segment}/${child.segment}`,
    title: child.title,
  })),
})) satisfies ResolvedNavItem[];
