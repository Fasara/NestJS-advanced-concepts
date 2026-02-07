## Schematics

A schematic is a template-based generator that is a set of instructions for transforming a software project by generating or modifying code.

We can utilize these schematics to enforce architectural rules and conventions, making our project consistent and inter-operative. Or we could create schematics to help us generate commonly-used code - shared services, modules, interfaces, health checks, docker files, etc.

For more real-world example, with the help of schematics we could reduce the amount of time we might need to setup all the boilerplate for creating a new microservice within our organization by creating a microservice schematic that generates all of the common code / loggers / tools / etc that we might commonly use in our organizations microservices.

In schematics, the virtual file system is represented by a Tree. A Tree data structure contains a base (or a set of files that already exist), as well as a staging are (which is a list of changes to be applied to that base).

When making modifications, we don't actually change the base itself, we add those modifications to the staging area.

A **Rule** object defines a function that takes a Tree, applies transformations, and returns a **New Tree**. The main file of a schematic (*index.ts* file) defines the rules that implement the schematic's logic.

A transformation is represented by an Action - of which there are 4 action type: **Create, Rename, Overwrite, Delete**.

Each schematic runs in a context by a SchematicContext object.