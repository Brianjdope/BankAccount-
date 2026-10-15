# Team Chat App (repo: BankAccount-)

A Slack-style chat app with channels and a message feed, built with React and
an Express backend. Team project with Caren and Albert Chung.

> The repo name comes from its first commits (Sept 2023): two small Java
> exercises, `code` (a `BankAccount` class) and `Random_numbers`. The project
> then grew into the chat app below.

## Features

- Channel sidebar: `#general`, `#project`, `#q-and-a`, `#random`, `#zoom-invite-links`
- Message feed with sender name and timestamp
- Send new messages (`POST /messages`)
- User profile panel

## Tech stack

- **Frontend:** React (Create React App), `react-bootstrap-typeahead`
- **Backend:** Node.js, Express, Mongoose (MongoDB at `mongodb://127.0.0.1:27017/test`)

## Run locally

Requires Node.js and a local MongoDB.

```bash
# 1. backend (http://localhost:3000)
cd backend
npm install
npm start

# 2. frontend, in a second terminal
npm install
npm start
```

Restart the backend after backend code changes.

## API

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/messages` | All chat messages |
| `POST` | `/messages` | Add a message |
| `GET` | `/channels` | Channel list |

## Known issues

- Messages live in an in-memory array, so they reset when the backend restarts (MongoDB is only used for users).
- The frontend requests `/messages/<channel>`, but the backend has no per-channel route yet.
- Both apps default to port 3000 — run the frontend on another port when prompted.

## Project structure

```text
backend/
  index.js      Express server, sample messages, channels
  database.js   Mongoose user model helpers
src/
  App.js        App, UserProfile, ChannelsList, ChatHeader, MessagesList, MessageInput
code, Random_numbers   original Java exercises
```
