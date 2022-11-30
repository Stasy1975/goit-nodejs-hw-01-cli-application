const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
  // ...твій код
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const one = contacts.find(contact => contact.id === contactId);
  return one || null;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const idIndex = contacts.findIndex(item => item.id === contactId);
  if (idIndex === -1) {
    return null;
  }
  const [results] = contacts.splice(idIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, data) => {
  const contacts = await listContacts();
  const idIndex = contacts.findIndex(item => item.id === contactId);
  if (idIndex === -1) {
    return null;
  }

  contacts[idIndex] = { contactId, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[idIndex];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
