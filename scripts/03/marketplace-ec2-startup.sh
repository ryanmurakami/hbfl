#!/bin/bash
sudo apt-get update
sudo apt-get -y install git
rm -rf /home/bitnami/hbfl
git clone https://github.com/ryanmurakami/hbfl.git /home/bitnami/hbfl
chown -R bitnami: /home/bitnami/hbfl
cd /home/bitnami/hbfl
sudo npm ci
sudo npm run start

# The above commands base64 encoded for entering into UserData
# IyEvYmluL2Jhc2gKc3VkbyBhcHQtZ2V0IHVwZGF0ZQpzdWRvIGFwdC1nZXQgLXkgaW5zdGFsbCBnaXQKcm0gLXJmIC9ob21lL2JpdG5hbWkvaGJmbApnaXQgY2xvbmUgaHR0cHM6Ly9naXRodWIuY29tL3J5YW5tdXJha2FtaS9oYmZsLmdpdCAvaG9tZS9iaXRuYW1pL2hiZmwKY2hvd24gLVIgYml0bmFtaTogL2hvbWUvYml0bmFtaS9oYmZsCmNkIC9ob21lL2JpdG5hbWkvaGJmbApzdWRvIG5wbSBjaQpzdWRvIG5wbSBydW4gc3RhcnQ=
