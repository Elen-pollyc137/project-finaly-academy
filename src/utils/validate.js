const validator  = require('cpf-cnpj-validator');
class Validator {
    constructor() {
        this.cpf = null;
        this.validate = validator.cpf.isValid(this.cpf);
    }

    document(cpf) {
        console.log("cpf", cpf,cpf.isValid(this.cpf))
      
        return true
    }
}

module.exports = new Validator();
