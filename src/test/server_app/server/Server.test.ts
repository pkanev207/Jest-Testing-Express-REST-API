import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess";
import { LoginHandler } from "../../../app/server_app/handlers/LoginHandler";
import { RegisterHandler } from "../../../app/server_app/handlers/RegisterHandler";
import { Server } from "../../../app/server_app/server/Server";

jest.mock("../../../app/server_app/auth/Authorizer");
jest.mock("../../../app/server_app/data/ReservationsDataAccess");
jest.mock("../../../app/server_app/handlers/LoginHandler");
jest.mock("../../../app/server_app/handlers/RegisterHandler");
jest.mock("../../../app/server_app/handlers/ReservationsHandler");
// console.log((res.end as any as jest.Mock).mock.calls.length);

const requestMock = {
  url: "",
  headers: {
    "user-agent": "jest-test",
  },
};

const responseMock = {
  end: jest.fn(),
  writeHead: jest.fn(),
};

const serverMock = {
  listen: jest.fn(),
  close: jest.fn(),
};

jest.mock("http", () => ({
  createServer: (cb: Function) => {
    cb(requestMock, responseMock);
    return serverMock;
  },
}));

describe("Server test suit", () => {
  let sut: Server;

  beforeEach(() => {
    sut = new Server();
    expect(Authorizer).toBeCalledTimes(1);
    expect(ReservationsDataAccess).toBeCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should start server on port 8080 and end the request", async () => {
    await sut.startServer();
    expect(serverMock.listen).toBeCalledWith(8080);
    expect(responseMock.end).toBeCalled();
  });

  // prototype spies - only work with classes
  it("should handle register requests", async () => {
    requestMock.url = "localhost:8080/register";
    const handleRequestSpy = jest.spyOn(
      RegisterHandler.prototype,
      "handleRequest"
    );

    await sut.startServer();
    expect(handleRequestSpy).toBeCalledTimes(1);
    expect(RegisterHandler).toBeCalledWith(
      requestMock,
      responseMock,
      expect.any(Authorizer)
    );
  });

  it("should handle login requests", async () => {
    requestMock.url = "localhost:8080/login";
    const handleRequestSpy = jest.spyOn(
      LoginHandler.prototype,
      "handleRequest"
    );

    await sut.startServer();
    expect(handleRequestSpy).toBeCalledTimes(1);
    expect(LoginHandler).toBeCalledWith(
      requestMock,
      responseMock,
      expect.any(Authorizer)
    );
  });

  it("should do noting for not supported routes", async () => {
    requestMock.url = " localhost:8080/someRandomRoute";
    const validateTokenSpy = jest.spyOn(Authorizer.prototype, "validateToken");

    await sut.startServer();
    expect(validateTokenSpy).not.toBeCalled();
  });

  it("should stop the server if started", async () => {
    await sut.startServer();
    await sut.stopServer();
    expect(serverMock.close).toBeCalledTimes(1);
  });
});
