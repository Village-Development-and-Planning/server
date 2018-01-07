module.exports = (type, parent) => {
  return {
    _tags: {},
    pre: {
      fill: [
        // eg. {scope: 'global', name: 'selectedDistrict.villages'},
        // eg. {scope: 'answer', name: '2.10'},
      ],
    },
    question: {
      ui: type,
      // 'MULTIPLE_CHOICE',
      // 'GPS',
      // 'INPUT',
      // 'INFO',
      // 'MESSAGE',
      // 'NONE',

      validation: null,
      // 'NUMBER',
      // 'SURVEYOR_CODE ( 4-digit /[0-9]{4}/ ),
    },
    answer: {
      scope: (
        (
          parent &&
          parent.child.strategy == 'select' &&
          parent.child.select &&
          parent.child.select.repeat
        ) ?
        parent.child.select.repeat :
        'once'
      ),
    },
    child: {
      strategy: 'cascade', // OR 'select'
      // select: {
      //   ui: 'grid',
      //   repeat: 'multiple', // OR 'multiple',
      // },
    },
    post: [],
    exit: {
      strategy: 'parent', // OR 'loop'
    },
  };
};
