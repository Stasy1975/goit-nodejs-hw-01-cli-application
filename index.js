const { on } = require('nodemon');
const contacts = require('./contacts');

// contacts.listContacts().then(data => console.log(data));

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case 'get':
      const oneContact = await contacts.getContactById(id);
      console.log(oneContact);
      break;

    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;
    case 'update':
      const updateContact = await contacts.updateContact(id, { name, email, phone });
      console.log(updateContact);
      break;
    case 'remove':
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};
invokeAction({
  action: 'remove',
  id: '5',
});
