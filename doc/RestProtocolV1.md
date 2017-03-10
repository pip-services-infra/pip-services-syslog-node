# HTTP REST Protocol (version 1) <br/> SysLog Microservice

SysLog microservice implements a REST compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [SystemActivity class](#class1)
* [SystemActivityPage class](#class2)
* [GET /syslog](#operation1)
* [POST /syslog](#operation2)

## Data types

### <a name="class1"></a> SystemActivity class

Represents a record of a system activity performed in the past

**Properties:**
- id: string - unique record id
- time: Date - date and time when activity took place (default: current time)
- server: string - server name where activity took place (default: current host)
- type: string - activity type: 'restart', 'upgrade', 'shutdown', etc.
- severity: number - severity level (impact on system operations) from 0: Low to 1000: High
- details: Object - additional details that can help system administrators in troubleshooting

### <a name="class2"></a> SystemActivityPage class

Represents a paged result with subset of requested SystemActivity objects

**Properties:**
- data: [SystemActivity] - array of retrieved SystemActivity page
- count: int - total number of objects in retrieved resultset

## Operations

### <a name="operation1"></a> Method: 'GET', route '/syslog'

Retrieves a list of system activities by specified criteria

**Parameters:** 
- type: string - (optional) type activities
- server: string - (optional) server where activities occured
- severity: number - (optional) severity of activities
- start: Date - (optional) start of the time range
- end: Date - (optional) end of the time range
- skip: int - (optional) start of page (default: 0). Operation returns paged result
- take: int - (optional) page length (max: 100). Operation returns paged result

**Response body:**
Array of SystemActivity objects or SystemActivityPage object if paging was requested or error

### <a name="operation2"></a> Method: 'POST', route '/syslog'

Log system activity

**Request body:**
SystemActivity object to be logged

**Response body:**
Logged SystemActivity object or error
