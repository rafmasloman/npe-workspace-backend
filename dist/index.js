"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const admin_routes_1 = __importDefault(require("./src/routes/admin.routes"));
const error_middleware_1 = __importDefault(require("./src/middleware/error.middleware"));
const auth_routes_1 = __importDefault(require("./src/routes/auth.routes"));
const project_routes_1 = __importDefault(require("./src/routes/project.routes"));
const client_routes_1 = __importDefault(require("./src/routes/client.routes"));
//For env File
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(express_1.default.json());
const API_VERSION = 'v1';
const API_URL = 'api';
app.use(`/${API_URL}/${API_VERSION}/users`, (0, admin_routes_1.default)());
app.use(`/${API_URL}/${API_VERSION}/auth`, (0, auth_routes_1.default)());
app.use(`/${API_URL}/${API_VERSION}/project`, (0, project_routes_1.default)());
app.use(`/${API_URL}/${API_VERSION}/client`, (0, client_routes_1.default)());
app.use(error_middleware_1.default);
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
