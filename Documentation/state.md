# State

The projection engine stores 2 types of state; documents in a read / view cache, often referred to as
read models. The second type is the intermediate state. This type of state is internal to the engine
and should be stored alongside in the same database as the rest of the Dolittle event store.
