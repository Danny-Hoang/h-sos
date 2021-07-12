import { getTokens, saveToken } from "../App/Utils/token";

beforeAll(() => {
    jest.mock('@react-native-community/async-storage');
})

test("Generate authorization", async () => {
    const { token, authorization } = await getTokens();
    console.log('Authorization: ', token, authorization)
})

afterAll(() => {
    jest.unmock('@react-native-community/async-storage')
});