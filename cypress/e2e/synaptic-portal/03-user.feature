Feature: 02- User Feature

    As a user on the synaptic portal Application
    I want to create user

    Background:
        Given I am on the Synaptic login page

    ##################### Synaptic ##########################

    @user @regression
    Scenario Outline: First and Last name should be mandatory fields when creating a new user
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the User Page
        And I click on add new user button
        When I perform Create User having following parameters <FIRST_NAME> <LAST_NAME> <ROLE> <USER_EMAIL> <STATUS>
        Then I am able to validate proper message below field <FIRST_NAME_FIELD>
        Then I am able to validate proper message below field <LAST_NAME_FIELD>
        Then I click on cancel button
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""         | ""        | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |

    @user @regression
    Scenario Outline: User role and Email should be mandatory fields when creating a new user
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the User Page
        And I click on add new user button
        When I perform Create User having following parameters <FIRST_NAME> <LAST_NAME> <ROLE> <USER_EMAIL> <STATUS>
        Then I am able to validate proper message below field <ROLE_FIELD>
        Then I am able to validate proper message below field <USER_EMAIL_FIELD>
        Then I click on cancel button
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE | USER_EMAIL | STATUS   | ROLE_FIELD | USER_EMAIL_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "John"     | "Smith"   | ""   | ""         | "Active" | "Role"     | "Email"          |

    @user @regression
    Scenario Outline: Admin should not be able to add user with invalid email address
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the User Page
        And I click on add new user button
        When I perform Create User having following parameters <FIRST_NAME> <LAST_NAME> <ROLE> <USER_EMAIL> <STATUS>
        Then I am able to validate proper error message <MESSAGE>
        Then I click on cancel button
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL  | STATUS   | MESSAGE                               |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "John"     | "Smith"   | "Dashboard" | "testgmail" | "Active" | "Please enter a valid email address." |

    @user @regression
    Scenario Outline: Admin should not be able to add user with existing email address
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the User Page
        And I click on add new user button
        When I perform Create User having following parameters <FIRST_NAME> <LAST_NAME> <ROLE> <USER_EMAIL> <STATUS>
        Then I am able to validate proper message <MESSAGE>
        Then I click on cancel button
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL                         | STATUS   | MESSAGE                                  |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "John"     | "Smith"   | "Dashboard" | "voulleddayeimei-2462@yopmail.com" | "Active" | "A user with this email already exists." |

    @user @regression
    Scenario Outline: Admin should not be able to add user with lengthy first name field value
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the User Page
        And I click on add new user button
        When I perform Create User having following parameters <FIRST_NAME> <LAST_NAME> <ROLE> <USER_EMAIL> <STATUS>
        Then I am able to validate proper message <MESSAGE>
        Then I click on cancel button
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME                                                          | LAST_NAME | ROLE        | USER_EMAIL                         | STATUS   | MESSAGE                                                         |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "asaksjdhakjshdjkashdkjha kjhajksdh jkashdkjashd kjahkjahskjd askd" | "Smith"   | "Dashboard" | "voulleddayeimei-2462@yopmail.com" | "Active" | "Invalid request model please provide the valid request model." |

    @user @regression
    Scenario Outline: Admin should not be able to add user with lengthy last name field value
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the User Page
        And I click on add new user button
        When I perform Create User having following parameters <FIRST_NAME> <LAST_NAME> <ROLE> <USER_EMAIL> <STATUS>
        Then I am able to validate proper message <MESSAGE>
        Then I click on cancel button
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME                                                           | ROLE        | USER_EMAIL                         | STATUS   | MESSAGE                                                         |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "John"     | "asaksjdhakjshdjkashdkjha kjhajksdh jkashdkjashd kjahkjahskjd askd" | "Dashboard" | "voulleddayeimei-2462@yopmail.com" | "Active" | "Invalid request model please provide the valid request model." |

    @user @regression
    Scenario Outline: Admin should be able to add user with valid data
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the User Page
        And I click on add new user button
        When I perform Create User having following parameters <FIRST_NAME> <LAST_NAME> <ROLE> <USER_EMAIL> <STATUS>
        Then I am able to validate proper message <MESSAGE>
        Then I validate data in table <USER_EMAIL>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL             | STATUS   | MESSAGE                   |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "John"     | "smith5"  | "Dashboard" | "johnsmith5@gmail.com" | "Active" | "Email sent successfully" |

    @user @regression
    Scenario Outline: Admin should be able to edit user with valid data
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the User Page
        And I click on edit user button <USER_EMAIL>
        When I perform Edit user having following parameters <LAST_NAME_UPDATE>
        Then I click on update button
        Then I am able to validate proper message <MESSAGE>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | LAST_NAME_UPDATE | ROLE        | USER_EMAIL             | STATUS   | MESSAGE                     |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "John"     | "smith5"  | "smith5_update"  | "Dashboard" | "johnsmith5@gmail.com" | "Active" | "User updated successfully" |
