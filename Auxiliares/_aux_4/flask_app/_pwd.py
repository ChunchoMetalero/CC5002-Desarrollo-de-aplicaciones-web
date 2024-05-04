import os
import hashlib
import binascii

# regiter
register_pwd = "raul12345"
salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
pwdhash = hashlib.pbkdf2_hmac('sha512', register_pwd.encode('utf-8'), salt, 100000)
pwdhash = binascii.hexlify(pwdhash)
db_pwd = (salt + pwdhash).decode('ascii')

# login
login_pwd = register_pwd
db_salt, db_pwdhash = db_pwd[:64], db_pwd[64:]
pwdhash = hashlib.pbkdf2_hmac('sha512', login_pwd.encode('utf-8'), db_salt.encode('ascii'), 100000)
pwdhash = binascii.hexlify(pwdhash).decode('ascii')

if db_pwdhash == pwdhash:
    print("Login success")

else:
    print("Login failed")
