import express, { Express } from "express";
import http from "http";
import { Server } from "socket.io";

export class App {
	private app: Express;
	private http: http.Server;
	private io: Server;

	constructor() {
		this.app = express();
		this.http = http.createServer(this.app);
		this.io = new Server(this.http);
		this.listenSocket();
		this.setupRoutes();
	}

	listenServer() {
		this.http.listen(3000, () => console.log("Server is running"));
	}

	listenSocket() {
		this.io.on("connection", (socket) => {
			console.log("user connected =>", socket.id);

			socket.on("disconnect", () => console.log("User disconnected"));

			socket.on("message", (data) => {
				console.log(data);
				this.io.emit("message", data);
			});
		});
	}

	setupRoutes() {
		this.app.get("/", (req, res) => {
			res.sendFile(__dirname + "/index.html");
		});
	}
}

const app = new App();
app.listenServer();
