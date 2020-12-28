const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getCategory' , 'createAd' , 'getAd' , 'updateAd' , 'deleteAd' , 'getPlan' ]);
roleRights.set(roles[1], ['getUsers', 'manageUsers' ,'getCategory', 'createCategory' ,
 'updateCategory' , 'deleteCategory' , 'createAd' , 'getAd' , 'updateAd' , 'deleteAd' , 'approveAd' , 'createPlan' , 'updatePlan' , 'getPlan']);

module.exports = {
  roles,
  roleRights,
};
