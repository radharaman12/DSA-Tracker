cd ../backend
node server.js > server_debug2.log 2>&1 &
SERVER_PID=$!
sleep 2
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"email": "test5@example.com", "password": "password123"}' > curl_out.json 2>&1
sleep 1
kill $SERVER_PID
echo "--- CURL OUTPUT ---"
cat curl_out.json
echo "--- SERVER LOGS ---"
cat server_debug2.log
