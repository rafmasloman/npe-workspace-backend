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
const member_routes_1 = __importDefault(require("./src/routes/member.routes"));
const task_routes_1 = __importDefault(require("./src/routes/task.routes"));
const cors_1 = __importDefault(require("cors"));
const file_routes_1 = __importDefault(require("./src/routes/file.routes"));
const comment_routes_1 = __importDefault(require("./src/routes/comment.routes"));
const milestone_routes_1 = __importDefault(require("./src/routes/milestone.routes"));
const payroll_routes_1 = __importDefault(require("./src/routes/payroll.routes"));
//For env File
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: '*',
}));
const API_VERSION = 'v1';
const API_URL = 'api';
app.use(`/${API_URL}/${API_VERSION}/users`, (0, admin_routes_1.default)());
app.use(`/${API_URL}/${API_VERSION}/auth`, (0, auth_routes_1.default)());
app.use(`/${API_URL}/${API_VERSION}/project`, (0, project_routes_1.default)());
app.use(`/${API_URL}/${API_VERSION}/client`, (0, client_routes_1.default)());
app.use(`/${API_URL}/${API_VERSION}/member`, (0, member_routes_1.default)());
app.use(`/${API_URL}/${API_VERSION}/task`, (0, task_routes_1.default)());
app.use(`/${API_URL}/${API_VERSION}/files`, (0, file_routes_1.default)());
app.use(`/${API_URL}/${API_VERSION}/comment`, (0, comment_routes_1.default)());
app.use(`/${API_URL}/${API_VERSION}/milestone`, (0, milestone_routes_1.default)());
app.use(`/${API_URL}/${API_VERSION}/payroll`, payroll_routes_1.default.routes());
app.use(error_middleware_1.default);
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
