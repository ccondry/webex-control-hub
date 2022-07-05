# Change Log for toolbox-login-api

Dates are in YYYY-MM-DD format


# 1.13.2 (2022-06-05)

### Fixes
* **Contact Center:** Add missing input parameters for page and pageSize in 
skill.list() and team.list(), which fixes infinite loops in skill.find() and
team.find() when the object is not found within the first 100 results.


# 1.13.1 (2022-05-13)

### Fixes
* **Contact Center:** Reduce debug logging in calling.number.list()


# 1.13.0 (2022-02-25)

### Features
* **Contact Center:** Use config-service URL for site, improve
desktopLayout.find to search any parameters, simplify user.update
### Fixes
* **Contact Center:** Fix skill.listAll


# 1.12.0 (2022-02-18)

### Features
* **Calling:** Add calling class.
* **Number:** Add calling.number class.
* **Contact Center:** Add classes for agent profile and user profile.


# 1.11.0 (2022-02-17)

### Features
* **Contact Center:** Add desktop layout class.
* **Contact Center:** Update multimedia profile and skill classes like skill
profile.


# 1.10.0 (2022-02-17)

### Features
* **Contact Center:** Add some of the new Contact Center provision APIs from
wcc-config site to get, list, list all, find, and update skills, skill profiles,
queues, teams and users.


# 1.9.1 (2021-10-30)

### Fixes
* **Contact Center:** Set global regionId and dialogFlowProjectId fields when
creating or modifying a virtual assistant.


# 1.9.0 (2021-10-30)

### Fixes
* **Contact Center:** Fixed virtual assistant modify and validate functions,
and added a get function.


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