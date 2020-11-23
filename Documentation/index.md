# Dolittle Projections Documentation

## Introduction

The Dolittle Projections engine is in a proof of concept state. It only supports TypeScript as of now
and is not an official service of the Dolittle runtime environment. This means that it runs in
process with the process that defines the projections. It has however been architected in a way
to allow for separating these and formalize the engine as an official runtime service.

## State

The projection engine stores 2 types of state; documents in a read / view cache, often referred to as
read models. The second type is the intermediate state. This type of state is internal to the engine
and should be stored alongside in the same database as the rest of the Dolittle event store.

## Getting started

```shell
$ yarn add @dolittle/projections
```

### Configuring Mongo

The projection engine only supports Mongo at the moment.
