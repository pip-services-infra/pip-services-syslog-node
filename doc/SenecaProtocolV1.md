# Seneca Protocol (version 1) <br/> Event Log Microservice

Event Log microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    connection: {
        protocol: 'tcp', // Microservice seneca protocol
        localhost: 'localhost', // Microservice localhost
        port: 8803, // Microservice seneca port
    }
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'eventlog',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [SystemEventV1 class](#class1)
* [DataPage<SystemEventV1> class](#class2)
* [cmd: 'get_events'](#operation1)
* [cmd: 'log_event'](#operation2)

## Data types

### <a name="class1"></a> SystemEventV1 class

Represents a record of a system activity performed in the past

**Properties:**
- id: string - unique record id
- correlation_id: string - unique id of transaction that caused the event
- time: Date - date and time in UTC when the event took place (default: current time)
- source: string - server name where event took place (default: current host)
- type: string - event type: 'restart', 'upgrade', 'shutdown', 'transaction' etc.
- severity: number - severity level (impact on system operations) from 0: Low to 1000: High
- message: string - descriptive message
- details: Object - additional details that can help system administrators in troubleshooting

### <a name="class2"></a> DataPage<SystemEventV1> class

Represents a paged result with subset of requested SystemEventV1 objects

**Properties:**
- data: [SystemEventV1] - array of retrieved SystemEventV1 page
- count: int - total number of objects in retrieved resultset

## Operations

### <a name="operation1"></a> Cmd: 'get_events'

Retrieves a list of system events by specified criteria

**Arguments:** 
- filter: object - filter parameters
  - search: string - (optional) search substring to find in source, type or message
  - type: string - (optional) type events
  - source: string - (optional) server where events occured
  - severity: number - (optional) severity of events
  - from_time: Date - (optional) start of the time range
  - to_time: Date - (optional) end of the time range
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0)
  - take: int - (optional) page length (default: 100)
  - total: boolean - (optional) include total counter into paged result (default: false)

**Returns:**
- err: Error - occured error or null for success
- result: [SystemEventV1] or SystemEventV1Page - retrieved SystemEventV1 objects in plain array or page format

### <a name="operation2"></a> Cmd: 'log_event'

Log system event

**Arguments:** 
- event: SystemEventV1 - system activity to be logged

**Returns:**
- err: Error - occured error or null for success
- result: SystemEventV1 - logged system activity
