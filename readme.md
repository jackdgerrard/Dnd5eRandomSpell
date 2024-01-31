using [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) and [Random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) in vanilla browser based JS to get a random spell from [A DND API](https://5e-bits.github.io/docs/)

There's no polyhedral dice big enough to roll a random spell, so it could be a fun game mechanic for a DM to implement however they like. 

I think it could be fun to have a character who can only cast random spells. 

At the moment this doesn't display damage or healing variables as it causes errors when the web page expects a field that a fetched spell doesn't have

I want to add a search bar here to so it can be used as a reference, because the party I play with has a few magic users and we often have to pause the game to go find details of a spell in the PHB. 

Many thanks to the awesome API providers for this with no authentication requirements.


Code formatting is done with [prettier](https://prettier.io/), as  [MDN web docs](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide/Code_style_guide/JavaScript#operators) do. 