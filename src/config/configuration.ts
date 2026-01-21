/** 
 * Purpose of this file
        Acts as the single source of truth for app configuration
        Groups config logically (app, database, auth, etc.)
        Prevents magic strings scattered across the codebase
*/

// src/config/configuration.ts

export default () => ({
  app: {
    name: 'LearnQuest',
    environment: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT ?? '3000', 10),
  },
});
