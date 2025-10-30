Feature: 04- XMatrix Feature

    As a user on the synaptic portal Application
    I want to add Strategic Objective and Annual Strategic Objective in X-Matrix graph

    Background:
        Given I am on the Synaptic login page

    ##################### Synaptic ##########################

    @xmatrix @regression
    Scenario Outline: User should be able to add Strategic Objective in X-Matrix graph
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I click on create X-Matrix button
        When I enter details having following parameters <TITLE> <DESCRIPTION>
        And I click on add new objective button
        Then I click on save and exit button
        Then I click on save progress button
        Then I validate strategic objective is visible on graph <TITLE>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                            | DESCRIPTION                                         |
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

    @xmatrix @regression
    Scenario Outline: User should be able to add Annual Strategic Objective in X-Matrix graph
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I click on edit X-Matrix button
        When I enter details having following parameters <TITLE> <DESCRIPTION>
        And I click on connect strategic objective button <STRATEGIC_OBJECTIVE>
        And I click on add new annual objective button
        Then I click on save and exit annual objective button
        Then I click on save progress button
        Then I validate strategic objective is visible on graph <TITLE>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                   | DESCRIPTION                                                | STRATEGIC_OBJECTIVE                     |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Automated annual Strategic Objectives" | "Adding Automated annual Strategic Objectives description" | "Automated Strategic Objectives Update" |

    @xmatrix @regression
    Scenario Outline: User should be able to update Annual Strategic Objective in X-Matrix graph
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I click on edit X-Matrix button
        And I click on edit icon on annual objective
        When I enter details having following parameters <TITLE> <DESCRIPTION>
        And I click on update annual objective button
        Then I click on save and exit annual objective button
        Then I click on save progress button
        Then I validate strategic objective is visible on graph <TITLE>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                          | DESCRIPTION                                                       | STRATEGIC_OBJECTIVE                     |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Automated annual Strategic Objectives Update" | "Adding Automated annual Strategic Objectives description Update" | "Automated Strategic Objectives Update" |


    @xmatrix @regression
    Scenario Outline: User should be able to add comment on Annual Strategic Objective in X-Matrix graph
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I click on edit X-Matrix button
        And I click on comment icon on annual objective
        And I enter a comment on strategic objective <COMMENT>
        And I click on add comment button
        Then I validate comment is addedd successfully <COMMENT>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                          | DESCRIPTION                                                       | STRATEGIC_OBJECTIVE                     | COMMENT                                                   |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Automated annual Strategic Objectives Update" | "Adding Automated annual Strategic Objectives description Update" | "Automated Strategic Objectives Update" | "This is automated comment on annual strategic objective" |

