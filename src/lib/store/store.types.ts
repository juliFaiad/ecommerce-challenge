import store from "./store";

export type TRootState = ReturnType<typeof store.getState>;
export type TAppStore = typeof store;
export type TAppDispatch = typeof store.dispatch;
