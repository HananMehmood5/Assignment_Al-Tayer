# Development

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
nvm install 12
nvm use 12
npm install --global yarn
yarn
yarn develop
```

# Challenge

## Frontend

For frontend challenge we expect you to implement a quicksearch component with the states of zeplin link. see https://scene.zeplin.io/project/610794abd00b1f10707afd40.

Our focus is not pixel perfect design implementation. Our focus is how you manage your states.
You can implement the complete component inside quick-search.jsx
API for `quicksearch`: /quick-search?searchString=red
You need to find a way to not send API request on every character change on the input field.

## Backend

For backend challenge we already implemented the frontend for an expandable component which use a nested object structure.
What we want from you is constructing this nested object by implementing a makeTree function.

Under Category-tree.js

You can use the dummy objects to implement your makeTree function first. When you are able to see the expected nested object structure you can go ahead and read from CSV files for both category information and parent child mapping information.

## Readme - Challenge (Time efforts)
