<h1>Mapping App</h1>
<h2>Flow Specification</h2>

Flow consumes a single Question object, and a global-context object and interacts with the user.  It has the following phases:

1. pre:  for loading pre-fill options, etc.
1. question:  the UI for the question object (ie., the current node).
1. answer: how to store answer of the current node (and its children) into the context.
1. child:  flow of the children of the current node.
1. post: for making post-answer hooks.
1. exit:  how to exit node?  default:  return to parent;  loop questions may use these.

Each of the above have specific implementations, which together provide various functionalities.

# Pre Flow

``` js
pre: {
  fill: [
    // eg. {scope: 'global', name: 'selectedDistrict.villages'},
    // eg. {scope: 'answer', name: '2.10'},
  ],
},
```
# Question: for question UI, etc.

``` js
question: {
  ui: 'SINGLE_CHOICE',
  // 'MULTIPLE_CHOICE',
  // 'GPS',
  // 'INPUT',

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
}
```

### Post flow

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
}
