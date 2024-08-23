import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/types/dispatchTypes";
import { RootState } from "@/types/rootStateTypes";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
