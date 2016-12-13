/**
 * Created by alex on 13/12/16.
 */
var Contact = function(lastname, firstname) {
    this.lastname = lastname;
    this.firstname = firstname;
}

Contact.prototype.modify = function(data) {
    if (data.lastname === undefined || data.firstname === undefined) {
        console.log('Contact modify fail');
        return false;
    }

    this.lastname = data.lastname;
    this.firstname = data.firstname;

    return true;
}

module.exports = Contact;