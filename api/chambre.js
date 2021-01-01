module.exports = function (router) {
  const Chambre = require('../models/chambre');
  const User = require('../models/user');

  const restify = require('express-restify-mongoose')


  /**
   * @typedef chambre
   * @property {Array} patients.required   - it's an array
   * @property {number} status.required 
   * @property {number} numChambre.required
   * @property {number} etage.required
   * @property {number} nbBed.required
   */





  /**
   * This function comment is parsed by doctrine
   * @route GET /api/chambre
   * @group chambre - Operations about chambre
   * @returns {object} 200 - success
   * @returns {Error}  default - Unexpected error
   */


  /**
  * This function comment is parsed by doctrine
  * @route POST /api/chambre
  * @group chambre - Operations about chambre
  * @param {chambre.model} chambre.body.required
  * @returns {object} 200 - success
  * @returns {Error}  default - Unexpected error
  */




  /**
* This function comment is parsed by doctrine
* @route PUT /api/chambre
* @group chambre - Operations about chambre
* @param {string} id.params.required - id required
* @param {chambre.model} chambre.body.required
* @returns {object} 200 - success
* @returns {Error}  default - Unexpected error
*/
 



  restify.serve(router, Chambre, {
    "prefix": "", "version": ""

  });



}