const { login } = require("../services/authService");
const { User } = require("../db/userModel");

const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

const { loginController } = require("./authController");
// let res = { json: jest.fn() };
const res = { status: jest.fn(() => res), json: jest.fn(() => res) };
describe("login Service test", () => {
  let user = {};
  let mEmail = "";
  let mPassword = "";
  let token = "";

  beforeEach(() => {
    mEmail = "mike@mail.com";
    mPassword = "1234";

    user = {
      _id: "63d3e2b541637d18a9767273",
      email: "mike@mail.com",
      password: "1234",
      subscription: "pro",
      createdAt: new Date().getTime(),
      token: "",
    };

    token = jsonwebtoken.sign(
      {
        _id: user._id,
        createdAt: user.createdAt,
      },
      process.env.JWT_SECRET
    );
  });

  it("should return status code 200", async () => {
    const req = {
      body: {
        reqEmail: mEmail,
        password: mPassword,
      },
    };

    jest.spyOn(User, "findOne").mockImplementationOnce(async () => user);
    jest
      .spyOn(User, "findOneAndUpdate")
      .mockImplementationOnce(async () => (user.token = token));

    jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => user.password);

    jest.spyOn(jsonwebtoken, "sign").mockImplementationOnce(() => token);

    await loginController(req, res);

    const status = res.status.mock.lastCall[0];
    expect(status).toBe(200);
  });

  it("should return token, login, subscription", async () => {
    const req = {
      body: {
        reqEmail: mEmail,
        password: mPassword,
      },
    };

    jest.spyOn(User, "findOne").mockImplementationOnce(async () => user);
    jest
      .spyOn(User, "findOneAndUpdate")
      .mockImplementationOnce(async () => (user.token = token));

    jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => user.password);

    jest.spyOn(jsonwebtoken, "sign").mockImplementationOnce(() => token);

    await loginController(req, res);

    const { token: userToken, user: returnedUser } = res.json.mock.lastCall[0];

    expect(userToken).toBe(user.token);
    expect(returnedUser.subscription).toBe(user.subscription);
    expect(returnedUser.email).toBe(user.email);
  });

  it("should return string token, login, subscription", async () => {
    const req = {
      body: {
        reqEmail: mEmail,
        password: mPassword,
      },
    };

    jest.spyOn(User, "findOne").mockImplementationOnce(async () => user);
    jest
      .spyOn(User, "findOneAndUpdate")
      .mockImplementationOnce(async () => (user.token = token));

    jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => user.password);

    jest.spyOn(jsonwebtoken, "sign").mockImplementationOnce(() => token);

    await loginController(req, res);

    const { token: userToken, user: returnedUser } = res.json.mock.lastCall[0];

    expect.stringContaining(userToken);
    expect.stringContaining(returnedUser.email);
    expect.stringContaining(returnedUser.subscription);
  });

  it("should return token", async () => {
    jest.spyOn(User, "findOne").mockImplementationOnce(async () => user);
    jest
      .spyOn(User, "findOneAndUpdate")
      .mockImplementationOnce(async () => (user.token = token));

    jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => user.password);

    jest.spyOn(jsonwebtoken, "sign").mockImplementationOnce(() => token);

    const result = await login(mEmail, mPassword);

    expect(result.token).toBe(user.token);
  });

  it("should return email and subscription", async () => {
    jest.spyOn(User, "findOne").mockImplementationOnce(async () => user);
    jest
      .spyOn(User, "findOneAndUpdate")
      .mockImplementationOnce(async () => (user.token = token));

    jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => user.password);

    jest.spyOn(jsonwebtoken, "sign").mockImplementationOnce(() => token);

    const result = await login(mEmail, mPassword);

    expect(result.subscription).toBe(user.subscription);
    expect(result.email).toBe(user.email);
  });
});
