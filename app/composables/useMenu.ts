export const useMenu = () => {
  return useState('menu-state', () => ({
    isOpen: true,
    activeItem: null,
    collapsed: false,
  }));
};
