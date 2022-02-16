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
require("mongoose");
const mongoose_1 = __importDefault(require("mongoose"));
const SessionSchema = new mongoose_1.default.Schema({
    person: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Person'
    },
    deviceInfo: String
});
SessionSchema.statics.findByPerson = function (person, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessions = yield this.find({ person: person }, callback).exec();
        if (sessions.length === 0) {
            console.log('no such person');
            return null;
        }
        if (sessions.length === 1) {
            return sessions[0];
        }
        if (sessions.length > 1) {
            console.log(`multiple sessions found in database with telegramUserId ${person}`);
            return sessions[0];
        }
    });
};
const Session = mongoose_1.default.model('Session', SessionSchema);
exports.default = Session;
//# sourceMappingURL=Session.js.map