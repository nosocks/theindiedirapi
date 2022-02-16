import { model, Schema, Document } from 'mongoose'

interface IProfile extends Document {
  name: string
  email: string
  bio: string
  avatarUrl: string
  tags: string[]
}

const ProfileSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  bio: {
    type: String,
  },
  avatarUrl: {
    type: String,
  },
  tags: {
    type: [String],
  },
}, {
  collection: 'profiles'
})

const ProfileModel = model<IProfile>('Profile', ProfileSchema);

export { ProfileModel, IProfile }
