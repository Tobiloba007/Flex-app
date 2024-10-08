# .eas/build/pre-install.sh
#!/bin/bash
echo "Running npm install with --legacy-peer-deps"
npm install --legacy-peer-deps
