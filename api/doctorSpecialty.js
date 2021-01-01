module.exports = function (router) {







  const doctorSpecialtyController = require('../controllers/doctorSpecialty')
  /**
   * This function comment is parsed by doctrine
   * @route GET /api/doctorSpecialty
   * @group doctorSpecialty - Operations about doctorSpecialty    
   * @returns {object} 200 - success
   * @returns {Error}  default - Unexpected error
   */
  router.get('/doctorSpecialty', doctorSpecialtyController.getDoctorSpecialty);


  /**
* This function comment is parsed by doctrine
* @route POST /api/doctorSpecialty
* @group doctorSpecialty - Operations about doctorSpecialty
* @param {doctorSpe.model} doctorSpe.body.required - doctorSpe
* @returns {object} 200 - success
* @returns {Error}  default - Unexpected error
*/
  router.post('/doctorSpecialty', doctorSpecialtyController.addDoctorSpecialty);


}