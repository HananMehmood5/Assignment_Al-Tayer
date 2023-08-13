const readCSVFile = require('../lib/read-csv-file');
const cache = require('../lib/cache');
const config = require('../config');

const ROOT_CATEGORY_ID = 1;

const buildCategoryTree = (categories, categoryParentChildMapping, parentId) => {
  const parentCategoryChildren = categoryParentChildMapping.reduce((acc, item) => (
    parseInt(item.parentId, 10) === parseInt(parentId, 10)
      ? [...acc, item.categoryId]
      : acc
  ), []);

  return parentCategoryChildren.reduce((tree, categoryId) => {
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

const categoryTreeCacheTTL = 1000 * 60 * config.redis.cacheMaxMinutes;

const categoryTreeRouteHandler = async (_, res) => {
  try {
    // Fetch category tree from cache or fallback to CSV files
    const tree = await cache.getOrFallback({
      key: config.redis.categoryCacheKey, // Specify a unique key for the cached value
      fallback: createTreeFromCSVFiles,
      ttl: categoryTreeCacheTTL,
    });

    res.status(200).json(tree);
  } catch (e) {
    console.error('Error occurred:', e);
    res.status(500).json({ error: 'Something bad happened on server' });
  }
};

module.exports = categoryTreeRouteHandler;
