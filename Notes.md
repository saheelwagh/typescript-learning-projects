[Joe Previte's typescript email course](https://www.typescriptcourse.com)

This course uses a streak counter to teach typescript concepts
it's unique compared to a todo app but not large enough in feature-set to overwhelm us

also teaches tdd
and to  distribute code to npm and consume it

Typescript is a superset of JS

## Initializing a ts project from scratch
1. yarn add -D typescript jest ts-jest @types/jest
2. yarn tsc -init
3. Run yarn ts-jest config:init to initialize our Jest config
4. add test : jest to scripts in package.json

what is ts-jest ? diff from normal jest
what all does @types provide ?


### what is @types ?
In ts world type definitions exist either inside the library or outside
 If it's out like in the case of Jest, it usually lives in a central repository called DefinitelyTyped. Those types are then exposed to the world via @types packages.

 create __tests__ folder
  
a jest test starts by being described -> describe(`test name`,`arrow fn to specify what it should do`)
it(`should pass`, arrow fn that returns result of `expect` function )
describe->it->expect->test values
what is the role of the strings passed into describe and it ? what values can they take ?

then run the test using yarn test

## day 2
- discuss the req of this counter
- implement the first couple using tdd

When building a library, you plan beforehand to know what the API will look like. We’ve started that work in our README

We need to continually ask ourselves, “What type of experience do I want to provide to users of my library? How can TypeScript help me provide a positive development experience?”

This small project will show you how TypeScript provides an excellent DX for library authors and consumers.

### Streak counter requirements
streak -> user does something for consecutive days
        break chain -> reset streak counter
        if streak does not exist -> inititalise
#### initializeStreak function
create
->streak obeject
    ->having
        -> current count
        -> last login date
        -> start date
add to and return it from local storage

create index.ts in src folder 

Pay attention to two things here. See the : followed by a word? Those are called 
##### parameter type annotations.
annotating types for fn params
Storage -> localStorage
Date 

Remember, all we’re doing right now is writing the least amount of code to get the compiler to compile our code. Import streakCounter using import { streakCounter } from "../src/index"; in your test and run yarn test again.



### TDD Process 
inspired by [course](https://click.convertkit-mail2.com/gkuwp9vokpawugv83otr/9qhzhdug4v6enwf9/aHR0cHM6Ly9xdWlpLmdpdGJvb2suaW8vbGVhcm4tZ28td2l0aC10ZXN0cy8=)

1. Write a failing test
2. Make compiler happy
3. Write enough code to make the test pass

how to view test results better than in a vscode terminal ?
visualise import and export using sketchnote

Because we’re using ts-jest, it type checks our test files, and it’s complaining about our call to streakCounter. It expects Storage, but we’re passing in a string

Let’s fix that by mocking localStorage with jsdom
a utility library for mocking the DOM in our tests.

```
let mockLocalStorage: Storage;  var of the type Storage
+
+ beforeEach(() => { what is beforeEach here ?
+   const mockJSDom = new JSDOM("", { url: "https://localhost" });
+   JSDOM takes in url for what ? what is the string purpose ?
+   mockLocalStorage = mockJSDom.window.localStorage; mock dom has window and its child methods
+ });

```

interface -> specifies what properties (and their types) an object entitty should have

variableName : type = value
function (param1 : type, param2 : type) returns type {

}

But you’re probably wondering, do we really need this test? Shouldn’t we instead test the functionality instead of looking at object properties?
ans) this is an API. Since we tell them these values are expected to be returned, we should test that this really is the case. 

we also need to test functionality though

We need the formattedDate function we used in our tests. Although we could add it to src/index.ts, we want to keep that test logic specific to our API. By that, I mean we don’t want to add/export any function from there that doesn’t need to be exposed to the user. 


Therefore, we’ll add it to a helpers file called src/utils.ts and export it. Don’t forget to import it in __test__/index.test.ts

We have one final test to add for this section. We need to make sure the streak is being stored in localStorage. Although we don’t expect the user to ever talk directly to localStorage, it’s crucial for our library to work.

### Day 3
- [ ] implement increment functionality
- [ ] implement reset functionality
- [ ] refactor

When writing open source libraries, one of the main things to consider is what pieces of code should be exposed to the end-user

the return type: ”increment” | undefined. We’re using what’s called a string literal type. This means our function literally returns  ”increment” instead of any old type. Very handy for state machines and other scenarios where you want to use a specific string.

Our function takes two parameters: date and overrideDefaults. That tells TypeScript that the second parameter is optional. Since we always need a date to create a Streak object, we pass that in and make it required. If we want to override one of the defaults for some reason - i.e., incrementing the currentCount we can do so by specifying in the overrideDefaults object. See the ? after overrideDefaults?

See Partial? That’s another TypeScript utility type. It tells TypeScript that the object passed in can be a partial (not the whole thing) of Streak. This means it can have some of Streak's properties, but not all. Again, we’re doing this so that this function is flexible. 


ℹ️ Note: Typically, you want to avoid typecasting with as since it’s like telling TypeScript you know better than the compiler, but in this instance, this is the correct way to type this since we understand what streakInLocalStorage gets parsed too. Read more here.

. One of the habits I’ve started, thanks to TypeScript, is thinking more deeply about my function signatures. What will the types be for these parameters? Should I pass in two parameters or an object? What will the return type be? TypeScript adds guardrails that help guide us towards the right solution when using these functions. It’s wonderful. The more you use the language, the more you start to experience the benefits.

## Day 4
Next up, we need to check index.ts. When you’re writing a library, you have to think about the API you’re exposing. Our package will indicate index.ts is the “starting point.” This means any code exported in this file will be available to the end consumer. It should only be the single-function streakCounter

 We’ll publish this under a named scope, i.e., <npm username>/streak-counter. Why? Well, that way, it doesn’t matter if the name is taken! It’s also nicer for the community since this is a practice project, and we won’t squat any names.

 As you can see, we’re just adding many new keys used by different runtimes and tools.  Explaining all of these is out of the scope of the lesson (read about different module formats here), but we’ll focus on one in particular: types. This is how we inform TypeScript of our types and include them in our npm package. More details on that [here](https://click.convertkit-mail2.com/4zul9qexw9c7uwodrrux/l2heh6uoq8mlm9b6/aHR0cHM6Ly93d3cudHlwZXNjcmlwdGxhbmcub3JnL2RvY3MvaGFuZGJvb2svZGVjbGFyYXRpb24tZmlsZXMvcHVibGlzaGluZy5odG1sI2luY2x1ZGluZy1kZWNsYXJhdGlvbnMtaW4teW91ci1ucG0tcGFja2FnZQ==).
 We’ve also modified our test script to use this NODE_OPTIONS thing. That’s because we’re using this modern bundler, and it can’t handle our typical Jest config. We also need to modify the Jest config to be jest.config.cjs and remove the JSDoc block. It should look like this:

 ℹ️ Note: This creates a new GitHub Action that installs our dependencies, runs our tests, builds our project, and then publishes it to npm (as long as it's a new version) on every push.

 Proficiency in a language also includes things like this: sharing code. You can get away with not knowing how to do this, but it vastly improves your skills. It makes you a more valuable team member because now, you can save your team time by sharing code. You know exactly how to do it. And you know how to share your code with the world. This is even more important as more and more companies are embracing open core and open source as part of how they operate.