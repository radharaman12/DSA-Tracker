import os
import glob

files = [
    'frontend/src/context/AuthContext.jsx',
    'frontend/src/components/MarkAsDoneButton.jsx',
    'frontend/src/pages/SheetPage.jsx',
    'frontend/src/pages/Dashboard.jsx'
]

API_BASE = "`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}`"

for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    # Replace single quotes 'http://localhost:5001...' with template literals
    # We'll just replace 'http://localhost:5001' with the variable
    content = content.replace("'http://localhost:5001/api", f"{API_BASE} + '/api")
    content = content.replace("'http://localhost:5001", API_BASE)
    
    with open(file, 'w') as f:
        f.write(content)

print("URLs fixed.")
