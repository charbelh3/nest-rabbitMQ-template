import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import errors from '../config/errors';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: any) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (metadata.type === 'query') {
        const { error } = this.schema.query.validate(value);
        if (error) throw new Error(error);
      } else if (metadata.type === 'body') {
        const { error } = this.schema.body.validate(value);
        if (error) throw new Error(error);
      }
    } catch (e) {
      throw new BadRequestException(errors.validationFailed);
    }
    return value;
  }
}
