export const useMenuLocalStorage = () => {
  const menuState = useState<string | null>("menuState", () => null);

  const disableMenu = (menu: string) => {
    menuState.value = menu;
    console.log(`Menu state set to: ${menu}`);
    
  };

  return { menuState, disableMenu };
};
