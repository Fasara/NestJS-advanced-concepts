import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule implements OnApplicationBootstrap {
  constructor(private readonly moduleRef: ModuleRef) {}

  async onApplicationBootstrap() {
    /**
     * The ModuleRef.resolve method constructs a dedicated DI subtree where the TagService is the root node of that tree.
     * This means that any dependencies of the TagService will be resolved within this subtree, and they will not be shared with the rest of the application.
     * This is particularly useful for request-scoped providers, as it ensures that each request gets its own instance of the service and its dependencies.
     */
    const contextId = ContextIdFactory.create();
    this.moduleRef.registerRequestByContextId({ hello: 'world' }, contextId);
    const tagsService = await this.moduleRef.resolve(TagsService, contextId);
    console.log(tagsService);
    // const tagsServices = await Promise.all([
    //   this.moduleRef.resolve(TagsService, contextId),
    //   this.moduleRef.resolve(TagsService, contextId),
    // ]);
    // console.log(tagsServices[0] === tagsServices[1]);
  }
}
