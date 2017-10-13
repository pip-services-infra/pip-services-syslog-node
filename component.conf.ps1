$VersionControl = 'git'
$Package = 'npm'
$Build = 'typescript'
$Document = 'none'

$Test = 'mocha'
$TestInclude = './obj/test'
$TestTimeout = 10000
$TestStyle = 'tdd'

$Deploy = 'none'
$Run = 'process'
$RunStartCommand = 'node'
$RunStartArguments = @('./bin/run.js', './config/config.yml')