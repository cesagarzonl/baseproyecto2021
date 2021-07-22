'use stric'

/**
 * 
 * @param {string} email 
 * @returns validation string is a format email
 */

let validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
module.exports = { validateEmail}