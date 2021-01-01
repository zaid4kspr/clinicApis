module.exports = function (router) {
  const DoctorStats = require('../models/doctorStats');
  const doctorStatsController = require('../controllers/doctorStats');

  const restify = require('express-restify-mongoose')


  /**
   * @typedef docStats
   * @property {string} doctor.required
   * @property {integer} type
   */


  /**
  * This function comment is parsed by doctrine
  * @route POST /api/doctorStats
  * @group doctorStats - Operations about doctorStats
  * @param {docStats.model} docStats.body.required
  * @returns {object} 200 - success
  * @returns {Error}  default - Unexpected error
  */


  /**
* This function comment is parsed by doctrine
* @route Get /api/doctorStats
* @group doctorStats - Operations about doctorStats
* @param {string} doctor.query.required - id required
* @param {string} type.query.required - id required
* @returns {object} 200 - success
* @returns {Error}  default - Unexpected error
*/

  router.get('/doctorStats', doctorStatsController.docStats4ProfileView);




  /**
* This function comment is parsed by doctrine
* @route Get /api/doctorStatsNumbers
* @group doctorStats - Operations about doctorStats
* @param {string} doctor.query.required - id required
* @returns {object} 200 - success
* @returns {Error}  default - Unexpected error
*/
  router.get('/doctorStatsNumbers', doctorStatsController.docStatsProfileViewsAnswersAndRdv);



  restify.serve(router, DoctorStats, { "prefix": "", "version": "" });



}