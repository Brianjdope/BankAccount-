const express = require('express')
const cors = require("cors");
const app = express()
const port = 3000
const mongoose = require('mongoose');
const UserManager = require('./database')

const bodyParser = require('body-parser');

app.use(cors());
app.use( bodyParser.json() );

const chatRoomMessages = [
  {
    id: 'BBAF3F21',
    name: "Caren",
    message: "When cats climb a tree, they can't go back down it head first. This is because their claws are facing the same way, instead, they have to go back down backward.",
    timestamp: 1699014186620,
    reactions: ['👍']
  },
  {
    id: '0284BAD3',
    name: "Caren",
    message: "A group of cats is called a “clowder.”",
    timestamp: 1699015186620,
    reactions: ['🐈']
  },
  {
    id: '03A4BAD3',
    name: "Caren",
    message: "According to a Hebrew legend, God created cats after Noah prayed for help in protecting the food stores on the Ark from being eaten by rats. In return, God made a lion sneeze and out came a pair of cats. ",
    timestamp: 1699016186620,
    reactions: []
  },
  {
    id: 'EE4DAD3',
    name: "Albert",
    message: "Your cat not only rubs their head against you as a sign of affection, but they are also making you as their territory. They use the scent glands they have around their face, the base of their tails, and their paws to do so.",
    timestamp: 1699016286620,
    reactions: ['👍']
  },
  {
    id: 'EE4DAFA',
    name: "Brian",
    message: "Cats are actually more popular in the United States than dogs are. There are around 88 million pet cats versus 75 million pet dogs. ",
    timestamp: 1699016286620,
    reactions: []
  },
  {
    id: 'ABC9C3DE',
    name: "Brian",
    message: "Cat's can't taste sweetness. Scientists believe it's due to a genetic mutation that affects key taste receptors. ",
    timestamp: 1699026286620,
    reactions: ['👍', '🔥']
  },
  {
    id: '738901A3',
    name: "Brian",
    message: "In Japan, cats are thought to have the power to turn into super spirits when they die. This may stem from the Buddist believe that cats are temporary resting places for powerful and very spiritual people. ",
    timestamp: 1699036286620,
    reactions: ['🔥']
  },
  {
    id: '57A20A5C',
    name: "Albert",
    message: "Europe introduced cats into the Americas as a form of pest control in the 1750s.",
    timestamp: 1699036286620,
    reactions: []
  },
  {
    id: '57420A5C',
    name: "Caren",
    message: "Some Evidence suggests that domesticated cats have been around since 3600 B.C.E., over 2,000 years before the Ancient Egyptians. ",
    timestamp: 1700136286620,
    reactions: ['🐈']
  }
];

async function getChatRoomMessages() {
  // note: there is a 5 second delay
  await new Promise(r => setTimeout(r, 5000));
  return chatRoomMessages;
}

const response = {
    name: "Caren",
    color: "Red",
    location: "Leonia",
    age: "17",
    gender: "Female",
    grade: "Senior",
    status: "Online",
}

// TODO: return a list of channels that the user is in
const channels = ["#general", "#project", "#q-and-a", "#random", "#zoom-invite-links"];

app.post('/messages', (req, res) => {
  const newMessage = req.body;
  chatRoomMessages.push(newMessage);
  res.end(JSON.stringify(chatRoomMessages));
})

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(response));
})

app.get('/messages', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const messages = await getChatRoomMessages();
  res.end(JSON.stringify(messages));
});

app.get('/channels', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(channels));
})

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
})

app.get('/login', async (req, res) => {
  console.log(await UserManager.getUser('John Doe'))
})