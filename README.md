# Individual emoji commit

Using emoji to highly customize commit message.

## Feature

- Automatically identify commit type and use the best Emoji

- Support defining your favorite Emoji for different commit types

## Preview

<img src='https://cdn.jsdelivr.net/gh/fz6m/Private-picgo@moe-2021/img/20210517024321.gif' />

## Usage

Three ways to trigger the addition of Emoji.

 - Click icon: click git panel navigation icon (🌸)

 - Keyboard: `ctrl/cmd + shift + i`

 - Command: Individual Emoji 🌈: insert emoji to commit message

## Config

### random mode

Each commit uses a random Emoji

#### `individualEmoji.random.enable`

- default: `false`

#### `individualEmoji.random.list`

- default: `['🍓', '🍉', '🍇', '🍒', '🍡', '🍥', '🍩', '🍰', '🍭', '🌸', '🌈']`

example:

```js
{
  "individualEmoji.random.enable": true,
  "individualEmoji.specified.enable": false, // using random mode needs to turn off specified mode
  "individualEmoji.random.list": ["🧀", "🍫", "🍪"]
}
```

### specified mode

#### `individualEmoji.specified.enable`

- default: `true`

#### `individualEmoji.specified.typeConfig`

- default: Best practices of [gitmoji](https://gitmoji.dev/)

```js
// https://gitmoji.dev/
[
  ['feat', ['✨']],
  ['chore', ['🔥']],
  ['fix', ['🐛']],
  ['style', ['🎨']],
  ['pref', ['⚡️']],
  ['docs', ['📝']],
  ['build', ['🚀']],
  ['test', ['✅']],
  ['release', ['🔖']],
  ['wip', ['🚧']],
  ['revert', ['⏪️']],
  ['refactor', ['♻️']],
  ['merge', ['🔀']],
]
```

example:

```js
{
  "individualEmoji.specified.enable": true,
  "individualEmoji.specified.typeConfig": [
    // override default this type config ['feat', ['✨']]
    ["feat", ["🌸", "🌈"]],
    // random from individualemoji.random.list
    ["fix"],
    // not use random emoji
    ["chore", "🍎"]
  ]
}
```

### `individualEmoji.pos`

- default: `start`

```bash
    # start
    feat(scope): some text => feat(scope) 🌈: some text

    # end
    feat: some text => feat: some text 🌈
```

