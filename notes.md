### parallel client server
"dev": "start npm run server && start npm run client"
"dev":"concurrently \"npm run server\" \"npm run client\"",
