const webSocket = require("ws");

const connections = {};
function webSocketServer(server) {
  const wss = new webSocket.Server({ server });
  wss.on("connection", function connection(ws) {
    ws.on("message", function incoming(message) {
      if (typeof message === "string") {
        let key = message;
        connections[key] = ws;
      } else {
        message = JSON.parse(message);
        const receiver = connections[message.receiver];
        if (receiver) {
          receiver.send(JSON.stringify(message));
        }
      }
    });
    ws.on("close", () => {
      const user_id = Object.keys(connections).find(
        (key) => connections[key] === ws
      );
      delete connections[user_id];
    });
  });
}
module.exports = webSocketServer;
