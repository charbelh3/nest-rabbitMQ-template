import { HttpException } from '@nestjs/common';
import errors from 'src/config/errors';

export default (timeoutMs: number, promise: () => Promise<any>) => {
  let timeoutHandle: NodeJS.Timeout;
  const timeoutPromise = new Promise((resolve, reject) => {
    timeoutHandle = setTimeout(
      () => reject(new HttpException(errors.timeoutError, 408)),
      timeoutMs,
    );
  });

  return Promise.race([promise(), timeoutPromise]).then((result) => {
    clearTimeout(timeoutHandle);
    return result;
  });
};
