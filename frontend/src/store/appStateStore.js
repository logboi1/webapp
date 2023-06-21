export const appStateStoreSlice = (set) => ({
  isLoggedIn: false,
  setLoginStatus: (loggedIn) => set({ isLoggedIn: loggedIn }),

  userProfile: {},
  setUserProfile: (userProfile) => set({ userProfile: userProfile }),
});
