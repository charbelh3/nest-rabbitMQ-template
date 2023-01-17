import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop()
  name: string;
  @Prop()
  password: string;
  @Prop()
  email: string;
}

export default SchemaFactory.createForClass(User);
