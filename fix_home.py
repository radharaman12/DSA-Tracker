import os

path = 'frontend/src/pages/Home.jsx'
with open(path, 'r') as f:
    content = f.read()

content = content.replace('{!user && <span className="feature-lock">Sign in to access ➔</span>}', '')

with open(path, 'w') as f:
    f.write(content)
