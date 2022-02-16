import 'mongoose'
import mongoose, { Model, Document, Schema } from 'mongoose'


export interface PersonType {
  telegramChatId: number
  telegramUserId: number
  agency: boolean
}

export interface PersonDocumentType extends PersonType, Document {
  //instance methods
}

export type PersonResType = PersonDocumentType | null

export interface PersonModelType extends Model<PersonDocumentType> {
  findByTelegramChatId: (telegramChatId: number) => Promise<PersonResType>
  findByTelegramUserId: (telegramUserId: number) => Promise<PersonResType>
}

const PersonSchema: Schema<PersonDocumentType> = new mongoose.Schema({
  telegramChatId: Number,
  telegramUserId: Number,
  agency: Boolean
})

PersonSchema.statics.findByTelegramChatId = async function (
  telegramChatId: number,
  callback?: () => any
): Promise<PersonResType> {
  const persons: PersonDocumentType[] = await this.find({ telegramChatId: telegramChatId }, callback).exec()

  if (persons.length === 0) {
    console.log('no such person')
    return null
  }
  if (persons.length === 1) {
    return persons[0]
  }
  if (persons.length > 1) {
    console.log(`multiple persons found in database with telegramChatId ${telegramChatId}`)
    return persons[0]
  }
}

PersonSchema.statics.findByTelegramUserId = async function (
  telegramUserId: number,
  callback?: () => any
): Promise<PersonResType> {
  const persons: PersonDocumentType[] = await this.find({ telegramUserId: telegramUserId }, callback).exec()

  if (persons.length === 0) {
    console.log('no such person')
    return null
  }
  if (persons.length === 1) {
    return persons[0]
  }
  if (persons.length > 1) {
    console.log(`multiple persons found in database with telegramUserId ${telegramUserId}`)
    return persons[0]
  }
}

const Person = mongoose.model<PersonDocumentType, PersonModelType>('Person', PersonSchema)


export default Person
