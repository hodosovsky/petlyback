POST users/register - Create a new user

    Parameters: No parameters
    Request body (required):
        {
    "email": "user@mail.com",
    "password": "password"
        }

    response:
        201	User created

        400	User creation error

        500	Server error

POST users/login - Login user

    Parameters: No parameters
    Request body (required):
        {
    "email": "user@mail.com" (string),
    "password": "password" (string)
        }

    response:
        200	User is logged in

        400	Login error

POST users/logout - Login user

    Parameters: Authorization The token issued to the current user.
    (Authorization: Bearer token)

    response:
        200	The user is logged out.

        401	Missing header with authorization token.

        500	Server error

GET users/current - Get information about the current user

    Parameters: Authorization The token issued to the current user.
    (Authorization: Bearer token)

    response:
        200	Information found.

        401	Missing header with authorization token.

PATCH /users - Change subscription field

    Parameters: Authorization The token issued to the current user.
    (Authorization: Bearer token)
    Request body (required):
        {
         "subscription": "pro"
        }

    subscription may be only: "starter", "pro", "business"

    response:
        200	User is logged in

        401	Missing header with authorization token

GET /contacts Get all user contacts

    Parameters: Authorization The token issued to the current user.
    (Authorization: Bearer token

    Response:
        Code	Description	Links
        200	    Contacts found.

        401	    Missing header with authorization token.

        404	    There is no such user collection.

        500	    Server error.

POST /contacts Get all user contacts

    Parameters: Authorization The token issued to the current user.
    (Authorization: Bearer token)

    Request body (required):
    Example Value Schema
            {
            "name": "name",
            "email": "name@mail.com",
            "phone": "123456789"
            }



    Response:
        Code	Description	Links
        201	    The contact was successfully created.

        400	    Error creating contact

        401	    Missing header with authorization token.

DELETE /contacts/{contactId}

        Parameters:

        contactId *integer (path) Contact ID.

        Authorization The token issued to the current user.
        (Authorization: Bearer token)

        Responses
        200	    The contact was successfully deleted.

        401	    Missing header with authorization token.

        404	    There is no such user collection.

        500	    Server error.

PUT /contacts/{contactId} Update an existing contact

         Parameters:

        contactId *integer (path) Contact ID.

        Authorization The token issued to the current user.
        (Authorization: Bearer token)

        Request body (required):
        Example Value Schema
            {
            "name": "name", (required)
            "email": "name@mail.com", (required)
            "phone": "123456789" (required)
            }

        Response:
        Code	Description	Links
        201	    The contact was successfully updated

        400	    Contact update failed

        401	    Missing header with authorization token.

PATCH /contacts/{contactId} Update some existing contact fields

         Parameters:

        contactId *integer (path) Contact ID.

        Authorization The token issued to the current user.
        (Authorization: Bearer token)

        Request body (required):
        Example Value Schema
            {
            "name": "name",
            "email": "name@mail.com",
            "phone": "123456789"
            }

        Response:
        Code	Description	Links
        201	    The contact was successfully updated

        400	    Contact update failed

        401	    Missing header with authorization token.

PATCH /contacts/{contactId}/favorite/ Update "favorite" contact's field

         Parameters:

        contactId *integer (path) Contact ID.

        Authorization The token issued to the current user.
        (Authorization: Bearer token)

        Request body (required):
        Example Value Schema
            {
            "favorite": bolean
            }

        Response:
        Code	Description	Links
        201	    The contact was successfully updated

        400	    Contact update failed

        401	    Missing header with authorization token.
