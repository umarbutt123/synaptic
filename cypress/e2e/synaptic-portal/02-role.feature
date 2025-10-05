Feature: 02- Role Feature

    As a user on the unified portal Application
    I want to create role

    Background:
        Given I am on the Synaptic login page

    ##################### Synaptic ##########################

    @role
    Scenario Outline: Role name should be a manddatory field when creating a new role
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Role Page
        And I click on add new role button
        When I perform Create Role having following parameters <ROLE_NAME> <ROLE_DESCRIPTION> <ROLE_STATUS> <MODULE> <SCREEN> <FEATURE> <PERMISSION>
        Then I am able to validate proper message below field <FIELD>
        Examples:
            | EMAIL                             | PASSWORD    | ROLE_NAME | ROLE_DESCRIPTION                     | ROLE_STATUS | MODULE     | SCREEN                 | FEATURE                  | PERMISSION | FIELD       |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""        | "This is a testing role description" | "Active"    | "X-Matrix" | "Strategic Objectives" | "AI Strategic Objective" | "Write"    | "Role name" |


