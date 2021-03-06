# Change Log for toolbox-login-api

Dates are in YYYY-MM-DD format


# 1.8.1 (2021-6-6)

### Fixes
* **Contact Center:** Fixed virtualAssistant.create by removing the URL query
and using the unique bot name for the credentials JSON file name.


# 1.8.0 (2021-5-18)

### Features
* **Config Gateway:** Add configGateway module to get list of users that are
synced to CJP.


# 1.7.0 (2021-3-18)

### Features
* **OCIS:** Add OCIS module to fix user login error related to "subscription ID.


# 1.6.0 (2021-2-25)

### Features
* **Contact Center:** Add get method to chatTemplate.


# 1.5.0 (2021-2-25)

### Bug Fixes
* **Contact Center:** Fix create and modify methods in chatTemplate. Modify now
requires id as first paramter.


# 1.4.0 (2021-2-25)

### Features
* **Contact Center:** Add validate, create, validateIcon, modify methods to
virtualAssistant. Add create, modify methods to chatTemplate.


# 1.3.2 (2021-2-18)

### Bug Fixes
* **Fetch:** Remove duplicate fetch module, updating all references to point to
the same place.


# 1.3.1 (2021-2-18)

### Features
* **Compatibility:** Removed "URL" reference, for compatibility with older
versions of Node.js


# 1.3.0 (2021-2-16)

### Features
* **Org:** Added methods to do some org operations.
* **Contact Center:** Added method to delete chat template.


# 1.2.0 (2021-2-15)

### Features
* **User:** Added methods to get user, modify user roles, and onboard user licenses.
* **Contact Center:** Added method to modify user contact center roles.


# 1.1.0 (2021-2-12)

### Features
* **Contact Center:** Added virtual assistant and email entry point treatment rules list functions


# 1.0.0 (2021-2-11)

### Features
* **Created:** Created library with a few functions to list users and chat templates