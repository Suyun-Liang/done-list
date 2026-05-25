# DoneList

A gentle "anything counts" life log app.

Instead of focusing on unfinished tasks, DoneList focuses on what already happened.

## Current V1 Features

- Add, edit and delete today's entries
- Show relative time for today's entries
- View past entries on a /history page grouped by calendar day
- Search entries and comments
- Add / Delete comments on past entries
- Fill small gaps in the past timeline with quiet days
- Persist data with LocalStorage
- Show lightweight validation feedback for empty entry input
- Navigate between home and history pages

## Tech Stack

- Next.js
- React
- JavaScript
- CSS Modules
- LocalStorage

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

Main folders:

- `src/app/` - Home and history pages
- `src/components/` - UI components: Forms, lists, entries, search, timeline
- `src/context/` - EntriesContext for app data and entry actions
- `src/hooks/` - Custom hooks for localStorage, debounce and ticking time

Shared helpers:

- `src/utils.js` - Date formatting, relative time and timeline grouping
- `src/helper.js` - Shared input cleanup helpers

## Regression Checklist

Before changing behavior, manually check:

- Add an entry from the home page
- Edit and delete today's entry
- Refresh and confirm entries still persist
- Open history page
- Add and delete comment on a past entry
- Search by entry text
- Search by comment text
- Clear search and confirm the normal history view returns
- Submit empty entry input and confirm validation feedback appears
- Run `npm run build`

## Known Limitations

Current V1 intentionally keeps some interactions simple:

- Data is stored locally using `localStorage` only
- There is no backend, sync or account system yet
- Search uses simple case-insensitive text matching
- Editing and deleting are currently limited to today's entries
- Comments can only be added from history view
- There is no automated test suite yet
