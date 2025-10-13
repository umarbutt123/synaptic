Feature: 02- User Feature

    As a user on the unified portal Application
    I want to create user

    Background:
        Given I am on the Synaptic login page

    ##################### Synaptic ##########################

    @user
    Scenario Outline: First name should be a mandatory field when creating a new user
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the User Page
        And I click on add new user button
        When I perform Create User having following parameters <FIRST_NAME> <LAST_NAME> <ROLE> <USER_EMAIL> <STATUS>
        Then I am able to validate proper message below field <FIELD>
        Then I click on cancel button
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIELD        |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""         | "Smith"   | "Dashboard" | "test@gmail.com" | "Active" | "First name" |

    @user
    Scenario Outline: Last name should be a mandatory field when creating a new user
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the User Page
        And I click on add new user button
        When I perform Create User having following parameters <FIRST_NAME> <LAST_NAME> <ROLE> <USER_EMAIL> <STATUS>
        Then I am able to validate proper message below field <FIELD>
        Then I click on cancel button
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIELD       |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "John"     | ""        | "Dashboard" | "test@gmail.com" | "Active" | "Last name" |