import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    if (value === undefined || value === '') {
      throw new BadRequestException('Value cannot be empty');
    }

    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Value must be a valid integer');
    }
    return val;
  }
}
