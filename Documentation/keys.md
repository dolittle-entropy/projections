# Keys

In order for the engine to be able to uniquely identify the documents it is creating, updating or deleting;
it needs a way to identify from the events coming through the stream for the projection what property
it should use as the key.

The engine supports a few methods for doing this:

* Default behavior is to use the `EventSourceId` that was used when the event was produced. This information sits on the `EventContext`.
If no strategy is defined on the projection or elsewhere; this is what it will use.
* You can specify strategies on a top level for the projection. The strategies specified will be tried in the order they're registered.
* On every event projected from, you can specify a property on the event to use as key. This is optional and it will fallback to whatever is
defined on the projection as strategies or the default if none is specified.

Favored order:

* Specific property on event projected from
* Projections strategies, in order of definition
* Default strategy; `EventSourceId` of the event.

## Strategies on Projections

When using strategies on projections it is important to remember they will be tried in the order they are defined.
If one strategy fails to get the key, it will fall through to the next.

** IMPORTANT **

Once you defined key strategies on the projection level, it will not fall back to `EventSourceId`.
If you want this behavior you'll have to explicitly add the `.usingEventSourceId()` call on the builder.
The typical use case for this is if you have an established convention for your events. This could be
that you have a well defined or a set of well defined properties that represent the key across multiple
different event types.

Example:

```typescript
import { Client } from '@dolittle/sdk';

const client = Client
    .forMicroservice('eafb2efe-3185-4142-a517-51fb5d03a5a0')
    // Event types and other configuration setup
    .withProjectionFor(MyModel, p => p
        .withKeys(_ => _
            .usingProperty('someProperty')
            .usingProperty('someOtherProperty')
            .usingEventSourceId()))
    ...)
    .build();
```

## Property on event

Events can decide to model what represents the unique identifier as they please. The engine can't deduct
this information in any way, if your convention doesn't cover it - or you simply want to be more explicit
about this in the definition - you can tell the engine to use the key from a specific property on the event
type.

```typescript
import { Client } from '@dolittle/sdk';

const client = Client
    .forMicroservice('eafb2efe-3185-4142-a517-51fb5d03a5a0')
    // Event types and other configuration setup
    .withProjectionFor(MyModel, p => p
        .from(MyEvent, e => e
            .usingKeyFrom(ev => ev.someIdentifier))
    ...)
    .build();
```
