<h1>Mapping App</h1>
<h2>Flow Specification</h2>

Flow consumes a single Question object, and a global-context object and interacts with the user.  

```js
module.exports = {
  flow: {
```    

It has the following phases:

1. pre:  for loading pre-fill options, etc.
1. question:  the UI for the question object (ie., the current node).
1. answer: how to store answer of the current node (and its children) into the context.
1. child:  flow of the children of the current node.
1. post: for making post-answer hooks.
1. exit:  how to exit node?  default:  return to parent;  loop questions may use these.

Each of the above have specific implementations, which together provide various functionalities.

# Pre Flow

```js
pre: {
```

1. fill: specifies list of pre-fill entries.

   ```js
     fill: [
       // eg. {scope: 'global', name: 'selectedDistrict.villages'},
       // eg. {scope: 'answer', name: '2.10'},
     ],
   ```

2. skip:  specifies pre-requisites to do this question.
   ```js
     skip: {
       question: null, // eg. '2.5.1'
       option: [], // eg. [1, 3, 5]
     }
   ```

```js
},
```

# Question: for question UI, etc.

```js
question: {
```

1. ui:  declare UI to use.
   ```js
     ui: 'SINGLE_CHOICE',
     // 'MULTIPLE_CHOICE',
     // 'GPS',
     // 'INPUT',
     // 'INFO'
   ```
2. validation: specify validations for the input.
   ```js
     validation: null,
     // 'NUMBER',
     // 'SURVEYOR_CODE ( 4-digit /[0-9]{4}/ ),
   },
   ```

# Answering scope for the question

```js
answer: {
  scope: 'once',
  // 'option', 'multiple'
},
```

# Child flow

```js
child: {
  strategy: 'cascade', // OR 'select'

  select: {
    ui: 'grid',
    repeat: 'once', // OR 'multiple',
  },
},
```

# Post flow

The use-cases are:

1. Load Surveyor data from API call.
2. Load Districts from Surveyor data, Villages from District, etc.

```js
post: {
},
```

# Exit Flow

```js
exit: {
  strategy: 'parent', // OR 'repeat'
},
```

```js
  } // flow =
} // module.exports = { flow }
```

