# Getting Started

```shell
$ yarn add @dolittle/projections
```

## Configuring State

> The projection engine only supports Mongo at the moment.

The engine produces two kinds of states; the result of a completed projection and
possible intermediate state that is used to fulfill projections as events occur.
These needs to be configured in order for the projection engine to work.

```typescript
import { Client } from '@dolittle/sdk';

const client = Client
    .forMicroservice('eafb2efe-3185-4142-a517-51fb5d03a5a0')
    .withProjections(_ => _.storeInMongo('mongodb://localhost:27017', 'MyDatabase'))
    .withProjectionIntermediates(_ => _.storeInMongo('mongodb://localhost:27017', 'MyEventStore'))
    ... more config...
    .build();
```

The projection intermediates should be stored in the same database as the event store.
It is state that is only meaningful to the projection engine and is also critical to guarantee consistency and
idempotency. Since this project is for now sitting outside the context of the runtime, it does not now about the event store
directly, and therefor it must be configured manually.

## Projections

Projections are defined by defining it for a specific type.

```typescript
import { Client } from '@dolittle/sdk';

const client = Client
    .forMicroservice('eafb2efe-3185-4142-a517-51fb5d03a5a0')
    .withProjectionFor(MyType, p => {})
    ... more config...
    .build();
```

## Unique identifier

Every projection is identified by its unique identifier, just as any other event processor type in Dolittle.
This identifier is specified when creating projections.

```typescript
import { Client } from '@dolittle/sdk';

const client = Client
    .forMicroservice('eafb2efe-3185-4142-a517-51fb5d03a5a0')
    .withProjectionFor(MyType, p => p
        .withId('27c2ad1c-c673-4e91-a1d8-805851e99ff4'))
    ... more config...
    .build();
```

## Model name

The name of model which will be used as the collection name for instance when using Mongo, is inferred
by default from the type name given to it. This is possible to override using the `useModelName` on the
builder.

```typescript
import { Client } from '@dolittle/sdk';

const client = Client
    .forMicroservice('eafb2efe-3185-4142-a517-51fb5d03a5a0')
    .withProjectionFor(MyType, p => p
        .withId('27c2ad1c-c673-4e91-a1d8-805851e99ff4')
        .useModelName('MyTypes'))
    ... more config...
    .build();
```
