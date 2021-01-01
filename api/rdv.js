module.exports = function (router) {
  const Rdv = require('../models/rdv');
  const User = require('../models/user');
  const rdvController = require('../controllers/rdv');

  const restify = require('express-restify-mongoose')


  /**
   * @typedef rdv
   * @property {date} rdvDate.required  - Status values that need to be considered for filter - eg: 2019-12-31
   * @property {date} bookingDate.required  - Status values that need to be considered for filter - eg: 2019-12-31
   * @property {string} doctor.required
   * @property {string} patient.required
   */

  /**
 * @typedef updateStatus
 * @property {number} status.required
 */





  /**
   * This function comment is parsed by doctrine
   * @route GET /api/Rdv
   * @group RDV - Operations about RDV
   * @returns {object} 200 - success
   * @returns {Error}  default - Unexpected error
   */


  /**
  * This function comment is parsed by doctrine
  * @route POST /api/Rdv
  * @group RDV - Operations about RDV
  * @param {rdv.model} rdv.body.required
  * @returns {object} 200 - success
  * @returns {Error}  default - Unexpected error
  */


  router.get('/rdvStats', rdvController.docStats4RdvPerMonth);
  router.get('/rdvStatsByPatient', rdvController.countRdvBySexe);


  /**
* This function comment is parsed by doctrine
* @route PUT /api/rdv/rdvStatus
* @group RDV - Operations about RDV
* @param {string} id.query.required - id required
* @param {updateStatus.model} updateStatus.body.required
* @returns {object} 200 - success
* @returns {Error}  default - Unexpected error
*/
  router.put('/rdv/rdvStatus', rdvController.updateRdvStatus);




  restify.serve(router, Rdv, {
    "prefix": "", "version": "", private: ['doctor.password'], totalCountHeader: true,

  });



}