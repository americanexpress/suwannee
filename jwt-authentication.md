## JWT Authentication

#### Key generation

Replace clientId with consumer id

```
$ ssh-keygen -t rsa -b 4096 -m PEM -f clientId.key -P ""
$ openssl rsa -in clientId.key -pubout -outform PEM -out clientId.key.pub
$ openssl base64 -in clientId.key.pub -out clientId.encoded.key.pub
```

#### Key File structure

```
[
  {
    "clientId": "consumer id",
    "key": "content of clientId.encoded.key.pub"
  }
]
```

#### Token structure

```
HEADER:ALGORITHM & TOKEN TYPE

{
  "alg": "ES256",
  "typ": "JWT"
}

PAYLOAD:Name of client & The time the JWT was issued

{
"clientId" : "nameofclient",
"iat" : 1516239022
}

SIGNATURE : Generated while signing
{
  xyz
}
```

#### Token generation

```
$ npm install -g jwtgen
$ jwtgen -a RS256 -p /path/to/clientId.key -c "clientId=consumerid"
```

#### Authorization Header format

Authorization : Bearer < jwtToken >
