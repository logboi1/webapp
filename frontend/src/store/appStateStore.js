export const appStateStoreSlice = (set) => ({
  isLoggedIn: false,
  setLoginStatus: (loggedIn) => set({ isLoggedIn: loggedIn }),

  canTimeout: false,
  setCanTimeout: (canTimeout) => set({ canTimeout: canTimeout }),

  isIdle: false,
  setIsIdle: (idle) => set({ isIdle: idle }),

  ModalVisible: false,
  setModalVisible: (isModalVisible) => set({ ModalVisible: isModalVisible }),

  //this should not be reset because the app is always ready after the splashscreen loads
  isAppReady: false,
  setIsAppReady: (isAppReady) => set({ isAppReady: isAppReady }),

  securityToken: null,
  setSecurityToken: (securityToken) => set({ securityToken: securityToken }),

  loading: false,
  setLoading: (loading) => set({ loading: loading }),

  reset: () =>
    set({
      isLoggedIn: false,
      isIdle: false,
      ModalVisible: false,
      loading: false,
      canTimeout: false,
    }),
});
