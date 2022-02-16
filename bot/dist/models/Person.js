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
const PersonSchema = new mongoose_1.default.Schema({
    telegramChatId: Number,
    telegramUserId: Number,
    agency: Boolean
});
PersonSchema.statics.findByTelegramChatId = function (telegramChatId, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const persons = yield this.find({ telegramChatId: telegramChatId }, callback).exec();
        if (persons.length === 0) {
            console.log('no such person');
            return null;
        }
        if (persons.length === 1) {
            return persons[0];
        }
        if (persons.length > 1) {
            console.log(`multiple persons found in database with telegramChatId ${telegramChatId}`);
            return persons[0];
        }
    });
};
PersonSchema.statics.findByTelegramUserId = function (telegramUserId, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const persons = yield this.find({ telegramUserId: telegramUserId }, callback).exec();
        if (persons.length === 0) {
            console.log('no such person');
            return null;
        }
        if (persons.length === 1) {
            return persons[0];
        }
        if (persons.length > 1) {
            console.log(`multiple persons found in database with telegramUserId ${telegramUserId}`);
            return persons[0];
        }
    });
};
const Person = mongoose_1.default.model('Person', PersonSchema);
exports.default = Person;
//# sourceMappingURL=Person.js.map