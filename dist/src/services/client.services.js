"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_config_1 = __importDefault(require("../config/prisma-client.config"));
const not_found_error_1 = __importDefault(require("../error/not-found.error"));
class ClientService {
    static createClient(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield prisma_client_config_1.default.client.create({
                    data: Object.assign({}, payload),
                });
                return client;
            }
            catch (error) {
                console.log('Client Create : ', error);
                throw error;
            }
        });
    }
    static updateClient(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield prisma_client_config_1.default.client.update({
                    where: {
                        id,
                    },
                    data: Object.assign({}, payload),
                });
                return client;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getAllClient() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield prisma_client_config_1.default.user.findMany();
                return clients;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getClientDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield prisma_client_config_1.default.client.findUnique({
                    where: {
                        id,
                    },
                });
                if (!client) {
                    throw new not_found_error_1.default('Invalid id Client');
                }
                return client;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deleteClient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findClient = yield prisma_client_config_1.default.client.findUnique({
                    where: {
                        id,
                    },
                });
                if (findClient) {
                    throw new not_found_error_1.default('Invalid id Client');
                }
                const client = yield prisma_client_config_1.default.client.delete({
                    where: {
                        id,
                    },
                });
                return client;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.default = ClientService;
