# Seneca Protocol (version 1) <br/> SysLog Microservice

SysLog microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    type: 'tcp', // Microservice seneca protocol
    localhost: 'localhost', // Microservice localhost
    port: 8803, // Microservice seneca port
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'syslog',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [SystemActivity class](#class1)
* [SystemActivityPage class](#class2)
* [cmd: 'get_system_activities'](#operation1)
* [cmd: 'log_system_activity'](#operation2)

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

### <a name="operation1"></a> Cmd: 'get_system_activities'

Retrieves a list of system activities by specified criteria

**Arguments:** 
- filter: object - filter parameters
  - type: string - (optional) type activities
  - server: string - (optional) server where activities occured
  - severity: number - (optional) severity of activities
  - start: Date - (optional) start of the time range
  - end: Date - (optional) end of the time range
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Returns:**
- err: Error - occured error or null for success
- result: [SystemActivity] or SystemActivityPage - retrieved SystemActivity objects in plain array or page format

### <a name="operation2"></a> Cmd: 'log_system_activity'

Log system activity

**Arguments:** 
- activity: SystemActivity - system activity to be logged

**Returns:**
- err: Error - occured error or null for success
- result: SystemActivity - logged system activity
