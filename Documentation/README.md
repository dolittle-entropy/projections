# Dolittle Projections Documentation

## Introduction

The Dolittle Projections engine is in a proof of concept state. It only supports TypeScript as of now
and is not an official service of the Dolittle runtime environment. This means that it runs in
process with the process that defines the projections. It has however been architected in a way
to allow for separating these and formalize the engine as an official runtime service.

The design of how this should work, its API and ideas date back a decade and has been loosely
inspired by the initial C# stab at defining an API that can be found [here](https://github.com/dolittle-entropy/MapReduce).

## Table of contents

| Title | Description |
| ----- | ----------- |
| [Get Started](getting-started.md) | Guide on how to get started |
| [Keys](keys.md) | Documentation on how keys are resolved from events |
| [State](state.md) | Description on how state management works in the engine |