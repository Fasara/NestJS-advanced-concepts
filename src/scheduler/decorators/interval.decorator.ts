import { SetMetadata } from '@nestjs/common';

export const INTERVAL_KEY = 'INTERVAL_KEY';
export const Interval = (milliseconds: number) =>
  SetMetadata(INTERVAL_KEY, milliseconds);
