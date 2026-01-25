import { Inject, Module } from '@nestjs/common';
import {
  ConfigurableModuleClass,
  HTTP_MODULE_OPTIONS,
} from './http-client.module-definition';

@Module({})
export class HttClientModule extends ConfigurableModuleClass {
  constructor(@Inject(HTTP_MODULE_OPTIONS) private options) {
    super();
    console.log('HTTP Client Module Options:', this.options);
  }
}
