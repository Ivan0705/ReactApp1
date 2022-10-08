import {usersAPI} from "../api/users-api";
import {APIResponseType, ResultCodesEnum} from "../api/api"; // @ts-ignore
jest.mock('../api/users-api');
const userAPIMock = usersAPI;
const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
};
// @ts-ignore
userAPIMock.follow.mockReturnValue(result);
// @ts-ignore
test("", () => {
    // @ts-ignore
    const dispatchMock = jest.fn();
    // @ts-ignore
    // @ts-ignore
    expect(dispatchMock).toBeCalledTimes(0);

});