Feature: 04- XMatrix Feature

    As a user on the synaptic portal Application
    I want to add Strategic Objective in X-Matrix graph

    Background:
        Given I am on the Synaptic login page

    ##################### Synaptic ##########################

    @xmatrix @regression
    Scenario Outline: User should be able to add Strategic Objective in X-Matrix graph
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I click on edit X-Matrix button
        When I enter strategic objective details having following parameters <TITLE> <DESCRIPTION>
        And I click on add new objective button
        Then I click on save and exit button
        Then I click on save progress button
        Then I validate strategic objective is visible on graph <TITLE>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                   | DESCRIPTION                                         |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Adding Automated Strategic Objectives" | "Adding Automated Strategic Objectives description" |

    @xmatrix @regression
    Scenario Outline: User should be able to update Strategic Objective in X-Matrix graph
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I click on edit X-Matrix button
        And I click on update icon on strategic objective
        And I enter a comment on strategic objective
        When I enter strategic objective details having following parameters <TITLE> <DESCRIPTION>
        And I click on update objective button
        Then I validate strategic objective is visible on graph <TITLE>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                          | DESCRIPTION                                                |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Adding Automated Strategic Objectives Update" | "Adding Automated Strategic Objectives description Update" |

    @xmatrix1 @regression
    Scenario Outline: User should be able to add a comment on Strategic Objective in X-Matrix graph
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I click on edit X-Matrix button
        And I click on comment icon on strategic objective
        And I enter a comment on strategic objective <COMMENT>
        And I click on add comment button
        Then I validate comment is addedd successfully <VALIDATE_COMMENT>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                          | COMMENT                     | VALIDATE_COMMENT                  |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Adding Automated Strategic Objectives Update" | "This is automated comment" | "This is automated comment wrong" |





    Scenario Outline: User should be able to delete Strategic Objective in X-Matrix graph
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I click on edit X-Matrix button
        And I click on delete strategic objective button
        And I click on confirm delete button
        # When I perform create strategic objective having following parameters <TITLE> <DESCRIPTION>
        # Then I click on save and exit button
        # Then I click on save progress button
        Then I validate strategic objective is visible on graph <TITLE>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                   | DESCRIPTION                                         |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Adding Automated Strategic Objectives" | "Adding Automated Strategic Objectives description" |


# And I click on add new user button
# When I perform Create User having following parameters <FIRST_NAME> <LAST_NAME> <ROLE> <USER_EMAIL> <STATUS>
# Then I am able to validate proper message below field <FIRST_NAME_FIELD>
# Then I am able to validate proper message below field <LAST_NAME_FIELD>
# Then I click on cancel button