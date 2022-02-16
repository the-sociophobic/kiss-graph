import 'mongoose'
import mongoose, { Model, Document, Schema } from 'mongoose'


export interface SessionType {
  person: mongoose.Schema.Types.ObjectId
  deviceInfo?: string
}

export interface SessionDocumentType extends SessionType, Document {
  //instance methods
}

export type SessionResType = SessionDocumentType | null

export interface SessionModelType extends Model<SessionDocumentType> {
  findByPerson: (person: number) => Promise<SessionResType>
}

const SessionSchema: Schema<SessionDocumentType> = new mongoose.Schema({
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person'
  },
  deviceInfo: String
})


SessionSchema.statics.findByPerson = async function (
  person: number,
  callback?: () => any
): Promise<SessionResType> {
  const sessions: SessionDocumentType[] = await this.find({ person: person }, callback).exec()

  if (sessions.length === 0) {
    console.log('no such person')
    return null
  }
  if (sessions.length === 1) {
    return sessions[0]
  }
  if (sessions.length > 1) {
    console.log(`multiple sessions found in database with telegramUserId ${person}`)
    return sessions[0]
  }
}

const Session = mongoose.model<SessionDocumentType, SessionModelType>('Session', SessionSchema)


export default Session
