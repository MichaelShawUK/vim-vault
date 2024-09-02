import { createContext } from "react";
import { User } from "@/types";

const AuthenticatedUserContext = createContext<User|null>(null);

export default AuthenticatedUserContext;
