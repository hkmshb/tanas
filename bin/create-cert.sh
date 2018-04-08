#!/bin/sh

# create self-signed certificate
CERT_NAME=$1
if [[ $CERT_NAME == '' ]]; then
    echo 'error: certificate name not provided.\n'
    echo 'Usage:\n  create-cert.sh [cert-name]\n'
    exit
fi

# generate a private key that is 1024 bits long
openssl genrsa -des3 -out "$CERT_NAME.key" 1024

# create certificate file
openssl req -new -key "$CERT_NAME.key" -out "$CERT_NAME.csr"

# now sign created certificate
openssl x509 -req -days 365 -in "$CERT_NAME.csr" \
             -signkey "$CERT_NAME.key" \
             -out "$CERT_NAME.cert"
