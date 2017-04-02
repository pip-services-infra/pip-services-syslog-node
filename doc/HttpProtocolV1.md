# HTTP Protocol (version 1) <br/> Event Log Microservice

EventLog microservice implements a HTTP compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [SystemEventV1 class](#class1)
* [DataPage<SystemEventV1> class](#class2)
* [POST /eventlog/read](#operation1)
* [POST /eventlog/write](#operation2)

## Data types

### <a name="class1"></a> SystemEventV1 class

Represents a record of a system event performed in the past

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

### <a name="operation1"></a> Method: 'POST', route '/eventlog/get_events'

Retrieves a list of system events by specified criteria

**Request body:**
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

**Response body:**
Array of SystemEventV1 objects or SystemEventV1Page object if paging was requested or error

### <a name="operation2"></a> Method: 'POST', route '/eventlog/log_event'

Log system event

**Request body:**
- event: SystemEventV1 - the object to be logged

**Response body:**
Logged SystemEventV1 object or error
