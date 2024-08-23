***MODELS***

**USERS**

*CAUTION* - This model got one important issue from default setup of AdonisJS. 

the verifyCredentials method returning "Invalid user credentials" is linked to the double hashing of passwords caused by the use of both a @beforeSave hook and the AuthFinder mixin in your AdonisJS setup.
Key Points of the Issue:

    1. Double Hashing: In AdonisJS, the AuthFinder mixin is designed to handle password hashing automatically. When you also have a @beforeSave hook that hashes the password before saving it to the database, the password gets hashed twice. This means that during login, when the verifyCredentials method attempts to verify the password, it is comparing a hashed password against another hashed version, which will not match, thus leading to authentication failure​(GitHub
    Stack Overflow
    ).

    2. Correct Usage: To resolve this issue, you should remove the @beforeSave hook that hashes the password in your User model. The AuthFinder already handles the password hashing process consistently for both saving and verifying passwords. By eliminating the redundant @beforeSave hook, you ensure that the passwords are hashed and verified correctly using the verifyCredentials method​(GitHub
    Stack Overflow
    Introduction
    ).

    3. Impact: Removing the double hashing ensures that passwords are stored and verified securely. This approach not only follows best practices but also protects against timing attacks and other potential security vulnerabilities that might arise from inconsistent hashing​(GitHub
    ).

Action Steps:

    - Remove the @beforeSave Hook: Delete or comment out the part of your User model that manually hashes the password using a @beforeSave hook. This is now unnecessary since AuthFinder handles this step.

    - Test the Setup: After making the change, test the registration and login processes to ensure that the verifyCredentials method works correctly. The system should now correctly authenticate users using the credentials they provide.
