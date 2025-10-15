Feature: 02- User Feature

    As a user on the unified portal Application
    I want to create user

    Background:
        Given I am on the Synaptic login page

    ##################### Synaptic ##########################

    @user
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

    @user
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

    @user
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