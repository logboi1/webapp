import { create } from "zustand";
import { appStateStoreSlice } from "./appStateStore";

const useStore = create((...a) => ({
  ...appStateStoreSlice(...a),
}));

export default useStore;
