It lists the options you can add to a field in a schema, grouped by data type.

String

lowercase: true/false. Always converts the value to lowercase.
uppercase: true/false. Always converts the value to uppercase.
trim: true/false. Removes spaces from the start and end.
match: a RegExp. The value must match this pattern.
enum: an array. The value must be one of the values in the array.
minLength: the value length must be at least this number.
maxLength: the value length must not be more than this number.
populate: sets default populate options.

Number

min: the value must be greater than or equal to this number.
max: the value must be less than or equal to this number.
enum: the value must be one of the numbers in the array.
populate: sets default populate options.

Date

min: the earliest allowed date.
max: the latest allowed date.

ObjectId

populate: sets default populate options.

Hashing changes a text (like a password) into a different, fixed-looking text called a hash. It works in one direction only: you can make a hash from a password, but you cannot get the password back from the hash.

A salt is a random text that is added to the password before hashing.Without salt, the same password always gives the same hash. If two users have the password secret, both get the same hash, and a hacker can see that. A hacker can also use a ready-made table of common passwords and their hashes to find the password quickly.

genSalt(10) makes a random salt. The 10 is the number of rounds. A higher number is more secure but slower. 10 is a common value.One round means one full pass of mixing the password and the salt into a scrambled result. The next round takes that result and scrambles it again. More rounds means the scrambling is repeated more times.