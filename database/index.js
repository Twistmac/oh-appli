import users from './donnees/users'
import conversations from './donnees/conversations'
class DataProvider {
  getUsers() {
    return users;
  }

  getConversations() {
    return conversations;
  }
}

export let data = new DataProvider();