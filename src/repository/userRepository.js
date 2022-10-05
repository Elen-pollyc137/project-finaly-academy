const UserSchema = require("../models/User");
const Validator = require("../utils/validate");
class UserRepository {
  constructor() {
    this.repository = UserSchema;
    this.validator = Validator;
    
    this.user = false;
    this.status = 500;
    this.error = false;
  }

  async create(item) {
    try {
    //     this.documentValidate = this.validator.document(item.document);

    //   if (!this.documentValidate) {
    //     this.error = "Document invalido";
    //     this.status = 405;
    //     throw new Error(this.error);
    //   }

      this.documentExists = await this.find(item.document);

      if (this.documentExists) {
        this.error = "Usuário existente";
        this.status = 403;
        throw new Error(this.error);
      }
      this.user = await this.repository.create(item);
      this.status = 201;

      return {
        error: this.error,
        status: this.status,
        user: {
          id: this.user._id,
          name: this.user.name,
          document: this.user.document,
        },
      };
    } catch (error) {
        this.error = error;
      return { error: this.error, status: this.status, user: this.user };
    }
  }

  async read(id) {
    const user = await this.repository.findById(id);

    return { id: user._id, name: user.name, email: user.email };
  }

  async find(document) {
    const user = await this.repository.find({
      document: { $in: [document] },
    });
    return user.length > 0 ? true : false;
  }

  async findDocument(document) {
    const [user] = await this.repository.find({
      document: { $in: [document] },
    });
    return user;
  }

  async update(id, item) {
    return await this.repository.updateOne({ _id: id }, { $set: item });
  }

  async all() {
    return await this.repository.find();
  }

  async delete(id) {
    return await this.repository.deleteOne({ _id: id });
  }
}

module.exports = new UserRepository();
