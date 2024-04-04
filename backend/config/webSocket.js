const webSocket = require("ws");

const connections = {};
function webSocketServer(server) {
  const wss = new webSocket.Server({ server });
  wss.on("connection", function connection(ws) {
    console.log("Connected");
    ws.on("message", function incoming(message) {
      message = JSON.parse(message);
      console.log(message);
      if (message.chat) {
        const receiver = connections[message.receiver];
        if (receiver) {
          receiver.send(JSON.stringify(message));
        }
      } else {
        connections[message.my_user_id] = ws;
      }
      // console.log(connections);
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
