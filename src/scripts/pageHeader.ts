/**
 * Alpine.js component for PageHeader.astro.
 * Register with: Alpine.data("pageHeader", pageHeaderData)
 */
export function pageHeaderData() {
  return {
    mobileMenuOpen: false,
    kontaktOpen: false,
    headerFloating: false,
    headerVisible: false,
    lastScrollY: 0,

    init() {
      this.lastScrollY = window.scrollY;
    },

    closeMenus() {
      this.mobileMenuOpen = false;
      this.kontaktOpen = false;
      this.headerFloating = false;
      this.headerVisible = false;
    },

    /**
     * Below the desktop nav breakpoint, the header scrolls away with the
     * page normally and only becomes a floating bar once the user scrolls
     * back up (see the `.header-floating` styles in PageHeader.astro).
     */
    handleScroll(el: HTMLElement) {
      const currentScrollY = window.scrollY;

      if (this.mobileMenuOpen || window.innerWidth >= 900) {
        this.lastScrollY = currentScrollY;
        return;
      }

      const headerHeight = el.offsetHeight;

      if (currentScrollY <= headerHeight) {
        this.headerFloating = false;
        this.headerVisible = false;
        this.lastScrollY = currentScrollY;
      } else if (currentScrollY > this.lastScrollY + 4) {
        this.headerFloating = false;
        this.headerVisible = false;
        this.lastScrollY = currentScrollY;
      } else if (currentScrollY < this.lastScrollY - 4) {
        this.headerFloating = true;
        requestAnimationFrame(() => {
          this.headerVisible = true;
        });
        this.lastScrollY = currentScrollY;
      }
    },
  };
}
