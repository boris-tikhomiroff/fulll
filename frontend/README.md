# Github User Search Application

This project is a technical test for a job application at FULLL. It is a React.js application using TypeScript to query the GitHub API and display user search results.

## Table of Contents

- [Features](#features)
- [Libraries](#libraries)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Features

- Query GitHub users using the GitHub API.
- Handle edge cases:
  - No results found.
  - GitHub API rate limit exceeded.
  - User typing quickly and navigating back and forth in search queries.
- Add a checkbox on each card item.
- Add a "Select All" checkbox with the number of selected items.
- Perform actions on selected items:
  - Duplicate items.
  - Delete items.
- Edit mode:
  - Display checkboxes on cards.
  - Display "Select All" checkbox.
  - Display duplicate and delete actions.
- Responsive design.

## Libraries

This project uses the following libraries:

- **react**: ^18.3.1
- **@testing-library/jest-dom**: ^6.4.8
- **@testing-library/react**: ^16.0.0
- **@testing-library/user-event**: ^14.5.2
- **cypress**: ^13.13.2
- **jest**: ^27.5.1
- **jest-environment-jsdom**: ^29.7.0

##### Note:

Only React and testing libraries are allowed for this project. No other external libraries are permitted to ensure the focus remains on React and testing skills.

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```

##### Note:

This project uses a specific version of Node.js defined in the .nvmrc file at the root of the project. If you have nvm installed, you can use the following script at the end in your .bashrc or .zshrc file to automatically switch to the correct Node.js version when you navigate to the project directory:

```bash
load-nvmrc() {
local node_version="$(nvm version)"
local nvmrc_path="$(nvm_find_nvmrc)"

if [ -n "$nvmrc_path" ]; then
  local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

  if [ "$nvmrc_node_version" = "N/A" ]; then
    nvm install
  elif [ "$nvmrc_node_version" != "$node_version" ]; then
    nvm use
  fi
elif [ "$node_version" != "$(nvm version default)" ]; then
  echo "Reverting to nvm default version"
  nvm use default
fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

## Usage

1. Type a username in the search input to query GitHub search users api.
2. Toggle edit mode using the edit button.
3. Select users using the checkboxes.
4. Use the "Select All" checkbox to select/deselect all users.
5. Duplicate or delete selected users using the respective buttons.

## Project Structure

src/
├── components/
│ ├── Header
│ ├── SearchResult
│ ├── UserCard
│ ├── SearchInput
│ ├── Loader
│ ├── Message
├── context/
│ ├── search.context.tsx
│ ├── edit.context.tsx
├── hooks/
│ ├── useDebounce.ts
│ ├── useQuery.ts
├── services/
│ ├── users.services.ts
├── type/
│ ├── index.ts
├── App.tsx
├── index.tsx
