export const CONSTANTS = {
  BASE_URL: 'assets/json/contacts.json',
  DISPLAYED_COLUMNS: [
    'id',
    'first name',
    'last name',
    'email',
    'phone number',
    'status',
    'action'
  ],
  ACTIONS: {
    ADD: 'Add',
    UPDATE: 'Update',
    DELETE: 'Delete',
    CANCEL: 'Cancel'
  },
  EMAIL_VALIDATOR: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
};
