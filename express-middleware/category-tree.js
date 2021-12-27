/*
// read from /data/categories.csv
categories = [{
  categoryId: 1,
  name: 'root',
}, {
  categoryId: 2,
  name: 'dummy_category_1',
}, {
  categoryId: 3,
  name: 'dummy_category_2',
}, {
  categoryId: 4,
  name: 'dummy_category_3',
}, {
  categoryId: 5,
  name: 'dummy_category_4',
}];

// read from /data/category-parent-child-mapping.csv
categoryParentChildMapping = [{
  categoryId: 2,
  parentId: 1,
}, {
  categoryId: 3,
  parentId: 1,
}, {
  categoryId: 4,
  parentId: 2,
}, {
  categoryId: 5,
  parentId: 3,
}];

rootCategoryId: 1;

categoryTree = makeTree({
  categories,
  categoryParentChildMapping,
  rootCategoryId,
});

// categoryTree looks like:
// {
//   id: 1,
//   name: 'root',
//   children: [
//     {
//       id: 2,
//       name: 'dummy_category_1',
//       children: [
//         {
//           id: 4,
//           name: 'dummy_category_3',
//           children: [],
//         },
//       ],
//     },
//     {
//       id: 3,
//       name: 'dummy_category_2',
//       children: [
//         {
//           id: 5,
//           name: 'dummy_category_4',
//           children: [],
//         },
//       ],
//     },
//   ],
// };
*/

module.exports = async (req, res) => {
  // PLEASE IMPLEMENT ME
  const categoryTree = {
    id: 1,
    name: 'root',
    children: [
      {
        id: 2,
        name: 'dummy_category_1',
        children: [
          {
            id: 4,
            name: 'dummy_category_3',
            children: [],
          },
        ],
      },
      {
        id: 3,
        name: 'dummy_category_2',
        children: [
          {
            id: 5,
            name: 'dummy_category_4',
            children: [],
          },
        ],
      },
    ],
  };

  res.json(categoryTree);
};
