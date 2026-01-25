import { ConfigurableModuleBuilder } from '@nestjs/common';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: HTTP_MODULE_OPTIONS, // Renamed export to avoid confusion with other modules options tokens
} = new ConfigurableModuleBuilder<{
  baseUrl?: string;
}>({ alwaysTransient: true })
  .setExtras<{ isGlobal: boolean }>({
    isGlobal: true,
  })
  .build();
