how to execute a nodejs code
there is exec function in child_process module in nodejs which can be used to execute a command in the shell. Here is how you can use it to execute a nodejs code.

we can use util file in nodejs 
then promisefy() this util


# Websocket
if any case we need to use websocket in our project then api request want websocket connection then he can connect with my backend server with websocket protocol

if any rest api request want connection then he can connect with my backend server with http protocol

to handle both request

we use combine http and websocket protocol in our project
that is creaet a server instance in our code 
and listen to it
then we can use http protocol to handle rest api request
and websocket protocol to connect with client with websocket protocol

# Event Driven Mechanism
Event-driven mechanism is a programming paradigm that is based on the concept of events and event handlers. In this paradigm, the program is divided into a series of events that are triggered by user interactions or other
external factors. Each event is handled by a separate function or method, which is responsible for performing the necessary actions.



## adding chokidar for consistent connection with our file
***npm i chokidar*** install it


//if any changes happen in file it suddenly active
//like name  -> work same

Events are properly reported
macOS events report filenames
events are not reported twice
changes are reported as add / change / unlink instead of useless rename


### After significantly typed by user then it will be reported to our backend
for every character we are not call to the backend
only when user stop typing then it will be reported to our backend
the pause of the user is emitted to the backend
this concept is called as debouncing
# Debouncing
Debouncing is a technique used to prevent excessive function calls or API requests when a user interacts with a UI element, such as a text input field. It works by delaying the execution of a function or API request until a certain amount of time has passed since the last user interaction. This helps to prevent unnecessary function calls or API requests, which can improve performance and reduce the load on
the server.

### ForkBomb -> 
A fork bomb is a type of denial-of-service (DoS) attack on a system, where a malicious or careless program repeatedly replicates itself to exhaust system resources, like CPU time and process table entries.

A fork bomb creates new processes in a loop, and each of those processes creates more processes, rapidly overwhelming the system.

infinite Number of system calls are executed
and this cause to failure of RAM 

### for live terminal we use Xterm


# A simple Library Which create a Docker image is -> dockerode
***npm i dockerode*** install it
# Dockerode
Dockerode is a Node.js library that allows you to interact with Docker from your Node.js application
It provides a simple and intuitive API for creating, managing, and removing Docker containers, images, and
networks.

# Steps to turn up a docker conatiner after creating a projects

1 . setUp the docker image
***docker build -t sandbox***

run docker desktop
***docker run -it sandbox***


## socket connection for terminal using raw websocket connection
https://www.npmjs.com/package/ws

both websocket and https connections are works on TCP
firstly we need to establish a connection with the server The TCP connection setup first
then after TCP connection upgrade to a pipelining(WebSocket Connection);

# read about how to connect the web browser using docker 
in terminal of the project do npm run dev
it will start the server
then open the browser and type localhost:3000 you can not get the page
so that you run `npm run dev -- --host 0.0.0.0` in the terminal
read about vite  --host flag
