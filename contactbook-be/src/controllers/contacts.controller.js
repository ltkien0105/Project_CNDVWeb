const makeContactsService = require("../services/contacts.service");
const ApiError = require("../api-error");

async function createContact(req, res, next) {
  if (!req.body.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }

  try {
    const contactsService = makeContactsService();
    const contact = await contactsService.createContact(req.body);
    return res.send(contact);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occured while creating the contact")
    );
  }
}

async function getContactsByFilter(req, res, next) {
  let contacts = [];

  try {
    const contactsService = makeContactsService();
    contacts = await contactsService.getManyContacts(req.query);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occured while retrieving contacts")
    );
  }

  return res.send(contacts);
}

async function getContact(req, res, next) {
  try {
    const contactsService = makeContactsService();
    const contact = await contactsService.getContactById(req.params.id);
    if (!contact) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send(contact);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
    );
  }
}

async function updateContact(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const contactsService = makeContactsService();
    const update = await contactsService.updateContact(req.params.id, req.body);
    console.log(update);
    if (!update) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was updated successfully." });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error updating contact with id=${req.params.id}`)
    );
  }
}

async function deleteContact(req, res, next) {
  try {
    const contactsService = makeContactsService();
    const deleted = await contactsService.deleteContact(req.params.id);
    if (!deleted) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was deleted successfully." });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Could not delete contact with id=${req.params.id}`)
    );
  }
}

async function deleteAllContacts(req, res, next) {
  try {
    const contactsService = makeContactsService();
    const deleted = await contactsService.deleteAllContacts();
    return res.send({
      message: `${deleted} contacts were deleted successfully.`,
    });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occured while removing all contacts")
    );
  }
}

module.exports = {
  getContactsByFilter,
  deleteAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
