// Generates a unique conversation ID for any two usernames
export const getConversationId = (username1, username2) => {
  // Sort alphabetically to ensure doctor-patient order doesn't matter
  return [username1, username2].sort().join("_");
};
