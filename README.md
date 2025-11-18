# D&D Manager App

## To start

cd dnd-manager-app
npm install
npm run dev

## Thought process in creating this project

The inspiration for this project came from the fact that during my bi-weekly remote D&D sessions, I always find it difficult to keep track of objects in my inventory when using Roll20 (a D&D app for managing online TTRPG games), as it is difficult to access items and also to add new ones.

I decided to implement an inventory section for the basic project and also a spell section if I had more time remaining.
For the style, I took inspiration from classic D&D character sheets and asked ChatGPT to make a very basic mockup, to at least have a general idea of where the items should go and what kind of components I would need.

With the exception of Lucide React, I decided not to use external libraries as I wanted to focus as much as possible on the construction of the various HTML elements and functionalities.

I also decided to use only simple CSS and not install external UI libraries or Tailwind to keep everything as simple as possible and leverage CSS to its maximum.

After a while, I decided not to implement the spell section, as I thought it would push the scope too far for creating a minimal functional app. I preferred to focus on the inventory functionality, trying to keep an eye on both functionality and style to provide a pleasant user experience.

## General description of the project

This is a React+TypeScript app to keep track of a user's inventory in Dungeons And Dragons, for managing their money and equipment in-game, allowing the user to add items and sell them.

The API used for fetching the equipment is the open D&D 5e API, available at https://www.dnd5eapi.co/. In particular, I used the /api/equipment endpoint to retrieve the list of buyable equipment and the /api/equipment/{index} endpoint to retrieve the details of a specific item.

When a user loads the app for the first time, two fetches are run: one for retrieving the list of the user's equipment (currently hardcoded) and another for the buyable equipment.

I created a custom model for the equipment lists returned from the fetch, which extends one of the object's return models by enriching it with a cost property, used for the buy/sell section. Since the items coming from the general equipment API didn't have a cost, I generated it randomly.

These two lists and the initial user's data are both saved in local storage to preserve the changes in inventory that a user makes. Using the searchbar, the list is filtered by the query, which is useful in case a user has too many items.

To modify the user's equipment, one can click either the buy or sell button at the bottom of the page. They both open a modal that shows cards of items with their name and cost. At the top of the modal, the current money is tracked. The buy list shows only the items that are not already in the user's equipment, while the sell list shows only the items that are currently in the user's equipment. Furthermore,the buyable items are sorted in ascending order by cost to make it easier for the user to find affordable items and items shown are in the range of the user's current money.
When a user clicks on a card, that item is immediately added to or removed from the equipment list, and the current money is updated accordingly. The selected item is highlighted to give feedback to the user and after being bought it is immediately removed from the buyable items list.
In the sell modal, I also decided to add a "selling sound" just for fun and flair, but I also included the option to disable the sound and saved this choice in local storage to be loaded at the start of the application.

As already mentioned, the persistence of state is handled by local storage, and the passing of general props like money and equipment is managed by two contexts, as I wanted to avoid props drilling and this was the only solution if I didn't want to use external state management libraries.

## Additional features that I didn't have time to implement:

- Select all checkbox to sell all items in inventory
- Searchbar for items to buy/sell
- Toast notifications when buying/selling items
- Accessibility implementation
- Dark theme toggle
- Pagination in the buy/sell modals
- Make sound button a shared component to use also in buy equipment
- Ascendent/descendent ordering in items to buy, choosing by different parameters like name or cost
- Tests for components and contexts
- Different icons for every element, grouping them by macro-categories (eg. consumable items, armor, weapons)
- A spell section that tracked user's current learned spells and allowed user to serach for new ones to learn filtering them by level or by realm (eg. necromancy, evocation, etc.)
- Login section to upload user's personal character

Happy to discuss any of it in the level of detail you prefer, just let me know!

## Licenses

Cash Sound Effect by <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=38915">freesound_community</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=38915">Pixabay</a>

Font Vecna by <a href="https://www.dafont.com/vecna.font">Mr. Vincent Connare</a> is licensed under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>
