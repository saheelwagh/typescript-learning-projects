- build a streak counter like the one you see in Duolingo. I chose this because it's unique compared to a todo app but not large enough in feature-set to overwhelm us. 
- we'll learn how to build a TypeScript project from scratch (without templates or special bundlers) 
- We believe in the importance of testing and believe more courses should teach using a TDD approach. We'll do this in our course because we think it's a valuable skill to have.
- we'll teach you how to distribute your code on npm and consume it in a production app. Too many courses fall short and don't go the full mile. This one is different. We'll start from zero and help you get your code packaged up and ready for the world to use.
-  create a new repository on GitHub by heading to github.new. We'll call this streak-counter.
- 

``` 
import {streakCounter} from '@jsjoeio/streak-counter'

const today = new Date()
const streak = streakCounter(localStorage, today)
// streak returns an object:
// {
//    currentCount: 1,
//    lastLoginDate: "11/11/2021",
//    startDate: "11/11/2021",
// }
``` 
- To start our project, we need to first initialize it as an npm project. I’m going to use yarn so run yarn --init -y