# Issues

- Value converter support (e.g. Guid/EventSourceId -> string - see OperationGroup and getKey + PostJoinEvent - keyStrategy + PropertySet, State.ts - setMany)
- Having to remove 'model.' in PostJoinEvent
- ObjectComparer needs to know if it should go deep (e.g. Luxon DateTime - not needed)