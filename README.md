# EventLog Microservice

This is a system event logging microservice from Pip.Services library. 
It logs important system events like starts and stops of servers,
upgrades to a new version, fatal system errors or key business transactions.

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca Plugin
* External APIs: HTTP/REST, Seneca
* Persistence: Memory, Flat Files, MongoDB

This microservice has no dependencies on other microservices.

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services/pip-clients-eventlog-node)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)

##  Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Seneca, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
class SystemEventV1 implements IStringIdentifiable {
    public id: string;
    public time: Date;
    public correlation_id: string;
    public source: string;
    public type: string;
    public severity: EventLogSeverityV1;
    public message: string;
    public details: StringValueMap;

}

class EventLogTypeV1
{
    public static readonly Restart: string = "restart";
    public static readonly Failure: string = "failure";
    public static readonly Warning: string = "warning";
    public static readonly Transaction: string = "transaction";
    public static readonly Other: string = "other";
}

enum EventLogSeverityV1
{
    Critical = 0,
    Important = 500,
    Informational = 1000
}

interface IEventLogV1 {
    getEvents(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<SystemEventV1>) => void): void;
    
    logEvent(correlationId: string, event: SystemEventV1, 
        callback?: (err: any, event: SystemEventV1) => void): void;
}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-infrastructure/pip-services-eventlog-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.json** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yaml** file. 

Example of microservice configuration
```yaml
- descriptor: "pip-services-container:container-info:default:default:1.0"
  name: "pip-services-eventlog"
  description: "EventLog microservice"

- descriptor: "pip-services-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "pip-services-eventlog:persistence:file:default:1.0"
  path: "./data/eventlog.json"

- descriptor: "pip-services-eventlog:controller:default:default:1.0"

- descriptor: "pip-services-eventlog:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    dependencies: {
        ...
        "pip-clients-eventlog-node": "^1.0.*"
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-eventlog-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.EventLogHttpClientV1(config);

// Connect to the microservice
client.open(null, function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Log system event
client.logEvent(
    null,
    {
        type: 'restart',
        source: 'server1',
        message: 'Restarted server'
    },
    function (err, event) {
        ...
    }
);
```

```javascript
var now = new Date();

// Get the list system events
client.getEvents(
    null,
    {
        from_time: new Date(now.getTime() - 24 * 3600 * 1000),
        to_time: now,
        source: 'server1'
    },
    {
        total: true,
        skip: 0, 
        take: 10  
    },
    function(err, page) {
    ...    
    }
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.

