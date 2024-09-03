import { createContext, useContext } from "react";
import { User } from "@/types";

export const AuthenticatedUserContext = createContext<User|null>(null);


export function useAuthenticatedUser() {
    return useContext(AuthenticatedUserContext);
}
