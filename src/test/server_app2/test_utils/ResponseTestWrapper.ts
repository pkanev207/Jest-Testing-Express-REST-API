import { DataBase } from "../../../app/server_app/data/DataBase";
import { Server } from "../../../app/server_app/server/Server";

jest.spyOn(DataBase.prototype, "insert").mockResolvedValueOnce("1234");

// await new Server().startServer();

// await new Promise(process.nextTick) // this solves timing issues

// expect(responseWrapper.body).toEqual(
//   expect.objectContaining({
//     userId: expect.any(String),
//   })
// );


