
const users = require("../controllers/users");
const request = require("supertest");
const app = require("../app")

describe("testing pages", () => {
    test("testing rigister page", () => {
        const req = {},
        res = {render: jest.fn()};
        users.renderRegister(req, res);
        expect(res.render.mock.calls[0][0]).toBe("users/register.ejs");
    });
    test("testing login page", () => {
        const req = {},
        res = {render: jest.fn()};
        users.renderLogin(req, res);
        expect(res.render.mock.calls[0][0]).toBe("users/login.ejs");
    });
    test("testing user home page", async () => {
        // const query = {body:{username: "kk", password: "kk"}};
        // try{
        //     await request(app).post("/login").send(query);
        // } catch(err){
        //     console.log(`Error ${err}`);
        // }       
        // const req = {},
        // res = {render: jest.fn()};
        // users.myHomePage(req, res);
        // expect(res.render.mock.calls[0][0]).toBe("users/myHomePage.ejs");
    });
    test("testing new group form page", () => {
        // const req = {},
        // res = {render: jest.fn()};
        // users.renderNewGroupForm(req, res);
        // expect(res.render.mock.calls[0][0]).toBe("users/newGroup.ejs");
    });
    test("testing edit group form page", () => {
        // const req = {},
        // res = {render: jest.fn()};
        // users.renderGroupForm(req, res);
        // expect(res.render.mock.calls[0][0]).toBe("users/editGroup.ejs");
    });
    test("testing credentials page", () => {
        // const req = {},
        // res = {render: jest.fn()};
        // users.renderAllCredentials(req, res);
        // expect(res.render.mock.calls[0][0]).toBe("users/allCredentials.ejs");
    });
});