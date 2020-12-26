const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getCategory' , 'createAd' , 'getAd' , 'updateAd' , 'deleteAd']);
roleRights.set(roles[1], ['getUsers', 'manageUsers' ,'getCategory', 'createCategory' ,
 'updateCategory' , 'deleteCategory' , 'createAd' , 'getAd' , 'updateAd' , 'deleteAd']);

module.exports = {
  roles,
  roleRights,
};
