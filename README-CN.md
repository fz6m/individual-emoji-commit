# Individual emoji commit

使用 emoji 高度自定义你的 commit message

Language: [English](./README.md) | 简体中文

## 特性

- 自动识别当前提交的类型并附加最佳 emoji

- 支持定义你喜欢的 emoji 对于任何提交类型

## 示例

<img src='https://cdn.jsdelivr.net/gh/fz6m/Private-picgo@moe-2021/img/20210517024321.gif' />

## 使用

有三种方式可以触发该插件附加 emoji ：

 - 点击图标: 点击 git 面板上侧导航栏的图标 (🌸)

 - 快捷键: `ctrl/cmd + shift + i`

 - 命令: Individual Emoji 🌈: insert emoji to commit message

## 配置

### random mode

随机使用你提供的 emoji

#### `individualEmoji.random.enable`

- default: `false`

#### `individualEmoji.random.list`

- default: `['🍓', '🍉', '🍇', '🍒', '🍡', '🍥', '🍩', '🍰', '🍭', '🌸', '🌈']`

example:

```js
{
  "individualEmoji.random.enable": true,
  "individualEmoji.specified.enable": false, // 使用 random 模式需要关闭 specified 模式
  "individualEmoji.random.list": ["🧀", "🍫", "🍪"]
}
```

### specified mode

#### `individualEmoji.specified.enable`

- default: `true`

#### `individualEmoji.specified.typeConfig`

- default: 默认使用 [gitmoji](https://gitmoji.dev/) 的 emoji 最佳实践

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
    // 覆盖默认提供的配置 ['feat', ['✨']]
    ["feat", ["🌸", "🌈"]],
    // 若没有提供 emoji，默认从 individualEmoji.random.list 内随机获取
    ["fix"],
    // 固定该提交类型的 emoji
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

