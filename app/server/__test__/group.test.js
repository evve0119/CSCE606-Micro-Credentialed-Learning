const request = require("supertest");
const users = require("../controllers/users");
// const app = require("../app")
const express = require("express")
const app = express()

describe("organize credentials", function () {
    beforeAll(() =>{
        // connect dataset
    });
    afterAll(() => {
        // disconnect dataset
        // clean dataset
    });

    test("new group", async () => {
        // test different group name 
        // white space at the beginning or end
    });
    test("delete group", async () => {
        // compare the dataset before and after executing the function
    });
    test("update group", async () => {
        // compare the dataset before and after executing the function
    });
});