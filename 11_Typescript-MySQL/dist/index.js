"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('Codigo de Typescript');
const server_1 = __importDefault(require("./server/server"));
const router_1 = __importDefault(require("./router/router"));
const mysql_1 = __importDefault(require("./mysql/mysql"));
// Arrancar Server
const server = server_1.default.init(3000);
server.app.use(router_1.default);
// Arrancar DB
mysql_1.default.instance;
server.start(() => {
    console.log('Servidor corriendo en el puerto 3000');
});
