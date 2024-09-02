import { pluginAction, SavablePlugin } from "@/types";
import { createContext, useContext } from "react";

export const PluginsContext = createContext<SavablePlugin[]>([]);
export const PluginsDispatchContext = createContext<React.Dispatch<pluginAction> | null>(null);

export function usePlugins() {
    return useContext(PluginsContext);
}

export function usePluginsDispatch() {
    const dispatch = useContext(PluginsDispatchContext);
    if (dispatch === null) throw new Error("usePluginsDispatch must be within PluginsDispatchContext.Provider");
    return dispatch;
}
