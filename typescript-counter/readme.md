# @saheelwagh/streak counter  - a basic streak counter coded in typescript

This is a basic streak counter as taught in Joe Previte's ts email course at typescriptcourse.com 

Written in typescript
meant for the browser (uses `localstorage`)

## How to install
``` shell
  yarn add @
```

### usage
```
import {streakCounter} from ''
const today = new Date()
const streak = streakCounter(localStorage, today)

```