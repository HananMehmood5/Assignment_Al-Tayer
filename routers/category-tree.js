const readCSVFile = require('../lib/read-csv-file');

const ROOT_CATEGORY_ID = 1;

const buildCategoryTree = (categories, categoryParentChildMapping, parentId) => {
  const children = categoryParentChildMapping.reduce((acc, item) => (
    parseInt(item.parentId, 10) === parseInt(parentId, 10)
      ? [...acc, item.categoryId]
      : acc
  ), []);

  return children.reduce((tree, categoryId) => {
    const category = categories[categoryId];

    if (category) {
      const childNode = {
        id: category.categoryId,
        name: category.name,
        children: buildCategoryTree(categories, categoryParentChildMapping, categoryId),
      };
      tree.push(childNode);
    }

    return tree;
  }, []);
};

const createTreeFromCSVFiles = async () => {
  const [categoriesData, categoryMappingData] = await Promise.all([
    readCSVFile('data/categories.csv'),
    readCSVFile('data/category-parent-child-mapping.csv'),
  ]);

  if (!categoriesData || !categoryMappingData) {
    throw new Error('Failed to read CSV data.');
  }

  const categories = categoriesData.reduce((lookup, category) => ({
    ...lookup,
    [category.categoryId]: category,
  }), {});

  return {
    id: ROOT_CATEGORY_ID,
    name: categories[ROOT_CATEGORY_ID].name,
    children: buildCategoryTree(categories, categoryMappingData, ROOT_CATEGORY_ID),
  };
};

module.exports = async (_, res, next) => {
  try {
    const tree = await createTreeFromCSVFiles();
    res.json(tree);
  } catch (e) {
    next(e);
  }
};
