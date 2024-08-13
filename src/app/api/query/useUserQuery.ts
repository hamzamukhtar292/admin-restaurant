import { createGlobalState } from "../state";

type UserState = {
    name:string;
    isSignedIn: boolean;
};

export const useUserState = 
createGlobalState<UserState>('user', {
    name: "hamza",
    isSignedIn:true,
})