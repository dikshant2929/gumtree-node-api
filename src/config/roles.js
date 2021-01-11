const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], [
  'getCategory',
  'createAd',
  'getAd',
  'updateAd',
  'deleteAd',
  'getPlan',
  'addChat',
  'getChat',
  'manageChat'
]);

roleRights.set(roles[1], [
  'getUsers',
  'manageUsers',
  'getCategory',
  'createCategory',
  'updateCategory',
  'deleteCategory',
  'createAd',
  'getAd',
  'updateAd',
  'deleteAd',
  'approveAd',
  'createPlan',
  'updatePlan',
  'getPlan',
  'addChat',
  'getChat',
  'manageChat'
]);

module.exports = {
  roles,
  roleRights,
};
