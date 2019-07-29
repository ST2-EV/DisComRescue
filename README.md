# DisCom
This is the repository for call for code 2019.<br />
This is the web client which will be used by the authorities.---->https://discom200.herokuapp.com/<br />
https://discom200.herokuapp.com/map<br />
<br />
The link to the mobile app node: https://github.com/bnair2001/disasterCommsApp <br />
The link to the code that runs in the pi: https://github.com/bnair2001/disComNodejs <br />
Our idea is an improvement to last year's winner project owl. Project owl's one major drawback was that it needs a central system or a mama duck we intend to solve that by using a blockchain to send and receive data from the nodes.
<Br />
<br />
Brief rundown:<br />
So we used a pi to make our nodes and during a disaster, it would be dropped on the places where communication has been cut. And the survivors would use the app to connect to the network and then answer a few questions and it would also take the coordinates and mine a new block on the blockchain and send it to the node to which it is connected and the node would then push the blockchain to the other nodes and they would all have a copy of it and other people information also gets added to it and thereby a large blockchain containing all the details of the survivors are stored in the node and when at least one of the phones connected to the node have mobile data it would automatically push the chain to the IBM cloud and thereby alerting to the authorities and first responders. 
<br />

![Flowchart explaining how our system works](https://cdn.discordapp.com/attachments/600996330579689492/605371841057390608/fl1_1.jpg)

Features:<br />
Multiple phones can be connected to a single node and they can communicate with each other via the app.<br />
It can be easily scaled and once in the future when we make it as a web app that gets served once a user connects to a node our network will be platform-independent.<br />
We also have a notification system that sends a message to users who are in a danger prone area prompting to make the local map offline.<br />
The blockchain allows for each node in the network to have a copy of everyone's data thereby making the network more reliable.<br />
<br />
Future advancements:<br />
It works only with android phones as of now. So the web app is the next important thing.<br />
Switching to a high gain wifi antenna.<br />
Using loRa instead of traditional wifi to give us more range.<br />
Making a durable casing for the pi to withstand harsh conditions and attaching a solar-based power source to the pi.<br />
Implementing ipfs in our network to allow images and other static files to be added to the network allowing the user to attach a picture of his surroundings to the blockchain.<br />
<br />
Every year there is at least one flood happening in India and often times the people are alerted of the disaster but no steps are taken to counteract it . I hope with the help of IBM we can make this idea a reality and help save people's lives in india.







