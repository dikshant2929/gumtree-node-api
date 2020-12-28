const { compareSync } = require('bcryptjs');
const httpStatus = require('http-status');
const { Plan } = require('../models');
const ApiError = require('../utils/ApiError');
/**
 * Create a plan
 * @param {Object} planBody
 * @returns {Promise<plan>}
 */
const createPlan = async (planBody) => {
  const plan = await Plan.create({...planBody});
  return plan;
};

/**
 * Query for plan
 * @param {id} filter - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const getPlan = async (id , query) => {
  const users = id ? Plan.findById(id) : Plan.find({...query});
  return users;
};


/**
 * Update plan by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Plan>}
 */
const updatePlanById = async (id, updateBody) => {
  const plan = await getPlan(id);
  if (!plan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Plan not found');
  }
  if (updateBody.time_period) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Time Periodcan not be update');
  }
  Object.assign(plan, updateBody);
  await Plan.update( {_id : plan.id} , updateBody);
  return plan;
};


module.exports = {
    getPlan,
    updatePlanById,
    createPlan
};
