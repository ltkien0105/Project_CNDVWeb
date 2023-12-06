function makeContactsService() {
  const baseUrl = "/api/contacts";
  const headers = {
    "Content-Type": "application/json",
  };

  async function getContacts(page, limit = 5) {
    let url = `${baseUrl}?page=${page.value}&limit=${limit}`;
    return await fetch(url).then((res) => res.json());
  }

  async function createContact(contact) {
    return await fetch(baseUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(contact),
    }).then((res) => res.json());
  }

  async function deleteAllContacts() {
    return await fetch(baseUrl, {
      method: "DELETE",
    }).then((res) => res.json());
  }

  async function getContact(id) {
    if (!id) {
      console.log("ga");
      return {};
    }
    return await fetch(`${baseUrl}/${id}`).then((res) => res.json());
  }

  async function updateContact(updateContact) {
    return await fetch(`${baseUrl}/${updateContact.id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(updateContact.contact),
    }).then((res) => res.json());
  }

  async function deleteContact(id) {
    return await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  }

  return {
    getContacts,
    deleteAllContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
  };
}

export default makeContactsService();
