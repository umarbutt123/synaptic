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

    @xmatrix @regression
    Scenario Outline: User should not be able to delete annual strategic objective if no connected quadrant is selected
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I click on edit X-Matrix button
        And I click on delete icon on annual objective
        Then I validate Delete button is disabled on selecting no connected quadrant
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                          | DESCRIPTION                                                       | STRATEGIC_OBJECTIVE                     | COMMENT                                                   |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Automated annual Strategic Objectives Update" | "Adding Automated annual Strategic Objectives description Update" | "Automated Strategic Objectives Update" | "This is automated comment on annual strategic objective" |

    @xmatrix @regression
    Scenario Outline: User should be able to add top level improvement in X-Matrix graph
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I click on edit X-Matrix button
        And I validate top level improvement screen
        When I enter details having following parameters <TITLE> <DESCRIPTION>
        And I assign resource <RESOURCE_NAME> <RESOURCE_TITLE>
        And I click on connect annual strategic objective button <ANNUAL_STRATEGIC_OBJECTIVE>
        And I click on add new priority button
        Then I am able to validate proper message "Resource assigned successfully"
        And I click on okay button
        Then I click on save and exit top level improvement button
        Then I click on save progress button
        Then I validate top level improvement is visible on graph <TITLE>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                             | DESCRIPTION                                        | ANNUAL_STRATEGIC_OBJECTIVE                     | RESOURCE_NAME | RESOURCE_TITLE |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Automated top level improvement" | "Adding Automated top level Strategic description" | "Automated annual Strategic Objectives Update" | "John"        | "Team Members" |

    @xmatrix @regression
    Scenario Outline: User should be able to update top level improvement in X-Matrix graph
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I click on edit X-Matrix button
        # And I validate top level improvement screen
        And I click on edit icon on top level improvement <TITLE>
        When I enter details having following parameters <TITLE_UPDATE> <DESCRIPTION>
        And I click on update top level improvement button
        Then I validate top level improvement is visible on graph <TITLE_UPDATE>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                             | DESCRIPTION                                               | ANNUAL_STRATEGIC_OBJECTIVE                     | TITLE_UPDATE                             | RESOURCE_TITLE |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Automated top level improvement" | "Adding Automated top level Strategic description update" | "Automated annual Strategic Objectives Update" | "Automated top level improvement update" | "Team Members" |

    @xmatrix @regression
    Scenario Outline: User should be able to comment on top level improvement in X-Matrix graph
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I click on edit X-Matrix button
        # And I validate top level improvement screen
        And I click on comment icon on top level improvement <TITLE>
        And I enter a comment on strategic objective <COMMENT>
        And I click on add comment button
        Then I validate comment is addedd successfully <COMMENT>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                    | DESCRIPTION                                               | ANNUAL_STRATEGIC_OBJECTIVE                     | TITLE_UPDATE                             | COMMENT                                              |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Automated top level improvement update" | "Adding Automated top level Strategic description update" | "Automated annual Strategic Objectives Update" | "Automated top level improvement update" | "This is automated comment on top level improvement" |

    @xmatrix @regression
    Scenario Outline: User should not be able to delete top level improvement if no connected quadrant is selected
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I click on edit X-Matrix button
        And I click on delete icon on top level improvement <TITLE>
        Then I validate Delete button is disabled on selecting no connected quadrant
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                    | DESCRIPTION                                                       | STRATEGIC_OBJECTIVE                     |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Automated top level improvement update" | "Adding Automated annual Strategic Objectives description Update" | "Automated Strategic Objectives Update" |

    @xmatrix @regression
    Scenario Outline: User should be able to delete top level improvement if connected quadrant is selected
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I click on edit X-Matrix button
        And I click on delete icon on top level improvement <TITLE>
        And I click on connected quadrant checkbox
        And I click on confirm delete annual objective button
        Then I validate strategic annual objective is not visible on graph <TITLE>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                    | DESCRIPTION                                                       | STRATEGIC_OBJECTIVE                     | COMMENT                                                   |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Automated top level improvement update" | "Adding Automated annual Strategic Objectives description Update" | "Automated Strategic Objectives Update" | "This is automated comment on annual strategic objective" |

    @xmatrix @regression
    Scenario Outline: User should be able to delete annual strategic objective if connected quadrant is selected
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I click on edit X-Matrix button
        And I click on delete icon on annual objective
        And I click on connected quadrant checkbox
        And I click on confirm delete annual objective button
        Then I validate strategic annual objective is not visible on graph <TITLE>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                          | DESCRIPTION                                                       | STRATEGIC_OBJECTIVE                     | COMMENT                                                   |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Automated annual Strategic Objectives Update" | "Adding Automated annual Strategic Objectives description Update" | "Automated Strategic Objectives Update" | "This is automated comment on annual strategic objective" |

    @xmatrix @regression
    Scenario Outline: User should be able to delete Strategic Objective in X-Matrix graph
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I click on edit X-Matrix button
        And I click on delete strategic objective button
        And I click on confirm delete button
        Then I validate strategic objective is not visible on graph <TITLE>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                   | DESCRIPTION                                         |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Automated Strategic Objectives Update" | "Adding Automated Strategic Objectives description" |

