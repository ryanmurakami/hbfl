#!/bin/bash
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
sudo yum install -y nodejs
sudo yum install -y git
git clone https://github.com/ryanmurakami/hbfl.git
cd hbfl
npm i
npm run start

# The above commands base64 encoded for entering into UserData
# IyEvYmluL2Jhc2gKY3VybCAtLXNpbGVudCAtLWxvY2F0aW9uIGh0dHBzOi8vcnBtLm5vZGVzb3VyY2UuY29tL3NldHVwXzgueCB8IHN1ZG8gYmFzaCAtCnN1ZG8geXVtIGluc3RhbGwgLXkgbm9kZWpzCnN1ZG8geXVtIGluc3RhbGwgLXkgZ2l0CmdpdCBjbG9uZSBodHRwczovL2dpdGh1Yi5jb20vcnlhbm11cmFrYW1pL2hiZmwuZ2l0CmNkIGhiZmwKbnBtIGkKbnBtIHJ1biBzdGFydAoK
