# Team Chat App (repo: BankAccount-)

A Slack-style chat app with channels and a message feed, built with React and
an Express backend. Team project with Caren and Albert Chung.

> The repo name comes from its first commits (Sept 2023): two small Java
> exercises, `code` (a `BankAccount` class) and `Random_numbers`. The project
> then grew into the chat app below.

## Features

This is a student prototype; several parts of the UI are placeholders.

- Channel dropdown with a hardcoded list: `#general`, `#project`, `#q&a`, `#random`, `#zoom invite links`
- Message feed, saved in the browser's `localStorage`, meant to show sender name and timestamp; it currently shows blank entries (see Known issues)
- Message input that sends each message to `POST /messages`; the sender name is picked at random from Albert, Caren, and Brian
- User profile panel with hardcoded mock data (Caren)
- Chat header with a static `#general` title and "Members: 100" count

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
| `GET` | `/` | Hardcoded user profile JSON |
| `GET` | `/messages` | All chat messages (sample messages, with a deliberate 5-second delay) |
| `POST` | `/messages` | Add a message; responds with the full message array |
| `GET` | `/channels` | Hardcoded channel list |
| `GET` | `/login` | Unfinished stub: logs a database lookup for "John Doe" and never responds |

## Known issues

- Messages live in an in-memory array, so they reset when the backend restarts (MongoDB is only used for users).
- The frontend requests `/messages/<channel>`, but the backend has no per-channel route yet.
- The frontend never calls `GET /messages`, `GET /channels`, or `GET /`: the feed loads only from `localStorage`, so the backend's sample messages never appear, and the channel list and profile are hardcoded separately in the UI.
- `POST /messages` responds with the whole message array, but the frontend appends that array as one message, so each send adds an entry with a blank sender and text.
- Message fields don't match: the backend's sample messages use `name`/`message`, while the frontend renders `username`/`text`.
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
