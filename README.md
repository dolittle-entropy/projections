# Dolittle Projections

[![npm version](https://badge.fury.io/js/%40dolittle%2Fprojections.svg)](https://badge.fury.io/js/%40dolittle%2Fprojections)
[![Build Status](https://github.com/dolittle-entropy/projections/workflows/TypeScript%20Library%20CI%2FCD/badge.svg)](https://github.com/dolittle-entropy/projections/actions?query=workflow%3A%22TypeScript+Library+CI%2FCD%22)
[![CodeQl](https://github.com/dolittle-entropy/projections/workflows/CodeQL/badge.svg)](https://github.com/dolittle-entropy/projections/actions?query=workflow%3ACodeQL)

## Goal

The goal of this project is to prove the concept of a declarative projection engine for [Dolittle](https://dolittle.io) based on event sourcing.
### Initial Design

![](./initial_design.png)

## Pre-requisites

- NodeJS 14*
- Yarn
- Docker

## Getting started

First get all the dependencies resolved. Run the following from anywhere in the repository:

```shell
$ yarn
```

There is a runtime environment pre-configured as a Docker Compose setup.
Navigate to the [environment folder](./Samples/Environment) and run:

```shell
$ docker-compose up
```

Then, the simplest way to work with the code is to run the [basic sample](./Samples/Basic).
Navigate to the folder and run:

```shell
$ yarn dev
```
