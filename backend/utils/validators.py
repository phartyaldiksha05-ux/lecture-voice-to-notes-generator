import re

email_re = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

def is_email(s):
    return bool(email_re.match(s or ''))
