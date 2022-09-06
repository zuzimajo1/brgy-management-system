import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import EventRedux from "./EventRedux";
import EventTodayRedux from "./EventTodayRedux";
import FaceRecognitionRedux from "./FaceRecognitionRedux";
import MasterlistRedux from "./MasterlistRedux";
import NavbarRedux from "./NavbarRedux";
import RecordRedux from "./RecordRedux";
import UserRedux from "./UserRedux";


const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  navbar: NavbarRedux,
  masterlist: MasterlistRedux,
  facerecog: FaceRecognitionRedux,
  events: EventRedux,
  eventtoday: EventTodayRedux,
  user: UserRedux,
  recordData: RecordRedux,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
