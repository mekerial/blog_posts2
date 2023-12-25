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
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const settings_1 = require("./settings");
Object.defineProperty(exports, "app", { enumerable: true, get: function () { return settings_1.app; } });
const db_1 = require("./db/db");
const port = 3002;
settings_1.app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
}));
