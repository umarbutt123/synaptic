Feature: 04- XMatrix Feature

    As a user on the synaptic portal Application
    I want to add Strategic Objective and Annual Strategic Objective in X-Matrix graph

    Background:
        Given I am on the Synaptic login page

    ##################### Synaptic ##########################

    @a3matrix @regression
    Scenario Outline: User should be able to add A3 Matrix
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on solve new problem button
        And I enter details having following parameters <PROBLEM_STATEMENT> <PROBLEM_DESCRIPTION>
        Examples:
            | EMAIL                             | PASSWORD    | PROBLEM_STATEMENT                | PROBLEM_DESCRIPTION                                 |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Automated Strategic Objectives" | "Adding Automated Strategic Objectives description" |

    @xmatrix @regression
    Scenario Outline: User should be able to update Strategic Objective in X-Matrix graph
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I click on edit X-Matrix button
        And I click on update icon on strategic objective
        When I enter details having following parameters <TITLE> <DESCRIPTION>
        And I click on update objective button
        Then I validate strategic objective is visible on graph <TITLE>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                   | DESCRIPTION                                         |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Automated Strategic Objectives Update" | "Automated Strategic Objectives description Update" |

    @xmatrix @regression
    Scenario Outline: User should be able to add a comment on Strategic Objective in X-Matrix graph
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I click on edit X-Matrix button
        And I click on comment icon on strategic objective
        And I enter a comment on strategic objective <COMMENT>
        And I click on add comment button
        Then I validate comment is addedd successfully <COMMENT>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                   | COMMENT                     |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Automated Strategic Objectives Update" | "This is automated comment" |