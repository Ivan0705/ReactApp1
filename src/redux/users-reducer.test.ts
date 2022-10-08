import usersReducer, {actions, InitialStateType} from "./users-reducer"; // @ts-ignore
const state: InitialStateType = {
    users: [
        {id: 0, name: "Ivan", followed: false, photos: {small: null, large: null}, status: "status 0"}, {
            id: 1,
            name: "Ivan",
            followed: false,
            photos: {small: null, large: null},
            status: "status 1"
        }, {id: 3, name: "Ivan", followed: true, photos: {small: null, large: null}, status: "status 3"}],
    pageSize: 6,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
};
// @ts-ignore
test("", () => {
    const newState = usersReducer(state, actions.followSuccess(1));
    // @ts-ignore
    expect(newState.users[0].followed).toBeFalsy();
    // @ts-ignore
    expect(newState.users[1].followed).toBeTruthy();
});