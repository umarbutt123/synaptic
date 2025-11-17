Feature: 06- A3Matrix Feature

    As a user on the synaptic portal Application
    I want to add A3-Matrix graph

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

    @a3matrix @regression
    Scenario Outline: User should be able to see all charts added in A3 Matrix
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        Then I validate all charts are visible on A3 Matrix <CHART1> <CHART2> <CHART3> <CHART4> <CHART5> <CHART6> <CHART7> <CHART8>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART1               | CHART2              | CHART3           | CHART4                | CHART5                          | CHART6       | CHART7              | CHART8      |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | "Current Condition" | "Implementation" | "Root Cause Analysis" | "Target Condition/Future State" | "Evaluation" | "Suggested Actions" | "Follow-up" |

    @a3matrix @regression
    Scenario Outline: User should be able to add objective in subject/background chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click add new objective button on "Subject/Background" chart
        And I add new "Objective:" with following title <OBJECTIVE_TITLE>
        Then I validate new value is visible with following title <OBJECTIVE_TITLE>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | OBJECTIVE_TITLE  |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | "Test objective" |


    @a3matrix @regression
    Scenario Outline: User should be able to add background in subject/background chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click add new objective button on "Subject/Background" chart
        And I add new "Background:" with following title <BACKGROUND_TITLE>
        Then I validate new value is visible with following title <BACKGROUND_TITLE>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | BACKGROUND_TITLE  |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | "Test background" |


    @a3matrix @regression
    Scenario Outline: User should be able to add significance in subject/background chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click add new objective button on "Subject/Background" chart
        And I add new "Significance:" with following title <SIGNIFICANCE_TITLE>
        Then I validate new value is visible with following title <SIGNIFICANCE_TITLE>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | SIGNIFICANCE_TITLE  |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | "Test significance" |

    @a3matrix @regression
    Scenario Outline: User should be able to add current status in Current condition chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click add new objective button on "Current Condition" chart
        And I add new "Current Status:" with following title <CURRENT_STATUS_TITLE>
        Then I validate success message "Changes updated successfully"
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | CURRENT_STATUS_TITLE  |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | "Test current status" |

 @a3matrix @regression
    Scenario Outline: User should be able to add Actions in Implementation chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click add new objective button on "Implementation" chart
        And I add new "Actions:" with following title <CURRENT_STATUS_TITLE>
        Then I validate success message "Changes updated successfully"
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | CURRENT_STATUS_TITLE  |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | "Test Add Text"       |

@a3matrix @regression
    Scenario Outline: User should be able to add Analysis in Root Cause Analysis chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click add new objective button on "Root Cause Analysis" chart
        And I add new "Analysis:" with following title <CURRENT_STATUS_TITLE>
        Then I validate success message "Changes updated successfully"
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | CURRENT_STATUS_TITLE  |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | "Test Add Text"       |

@a3matrix @regression
    Scenario Outline: User should be able to add Tools Used in Root Cause Analysis chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click add new objective button on "Root Cause Analysis" chart
        And I add new "Tools Used:" with following title <CURRENT_STATUS_TITLE>
        Then I validate success message "Changes updated successfully"
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | CURRENT_STATUS_TITLE  |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | "Test Add Text"       |

@a3matrix @regression
    Scenario Outline: User should be able to add Goals Used in Target Condition/Future State chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click add new objective button on "Target Condition/Future State" chart
        And I add new "Goals:" with following title <CURRENT_STATUS_TITLE>
        Then I validate success message "Changes updated successfully"
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | CURRENT_STATUS_TITLE  |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | "Test Add Text"       |

@a3matrix @regression
    Scenario Outline: User should be able to add SuggestedActions Used in Suggested Actions chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click add new objective button on "Suggested Actions" chart
        And I add new "SuggestedActions:" with following title <CURRENT_STATUS_TITLE>
        Then I validate success message "Changes updated successfully"
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | CURRENT_STATUS_TITLE  |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | "Test Add Text"       |

@a3matrix @regression
    Scenario Outline: User should be able to add Post-Implementation Checks Used in Evaluation chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click add new objective button on "Evaluation" chart
        And I add new "Post-Implementation Checks:" with following title <CURRENT_STATUS_TITLE>
        Then I validate success message "Changes updated successfully"
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | CURRENT_STATUS_TITLE  |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | "Test Add Text"       |

@a3matrix @regression
    Scenario Outline: User should be able to add Actions to Sustain Improvements Used in Follow-up chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click add new objective button on "Follow-up" chart
        And I add new "Actions to Sustain Improvements:" with following title <CURRENT_STATUS_TITLE>
        Then I validate success message "Changes updated successfully"
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | CURRENT_STATUS_TITLE  |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | "Test Add Text"       |

@a3matrix @regression
    Scenario Outline: User should be able to edit Objective Used in Subject/Background chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click on Edit button on "Subject/Background" chart
        And I add following <text> against "Objective:" while editing
        Then I validate success message "Changes updated successfully"
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | text          |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | " Edit Text " |

@a3matrix @regression
    Scenario Outline: User should be able to edit Background Used in Subject/Background chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click on Edit button on "Subject/Background" chart
        And I add following <text> against "Background:" while editing
        Then I validate success message "Changes updated successfully"
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | text          |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | " Edit Text " |

@a3matrix @regression
    Scenario Outline: User should be able to edit Significance Used in Subject/Background chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click on Edit button on "Subject/Background" chart
        And I add following <text> against "Significance:" while editing
        Then I validate success message "Changes updated successfully"
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | text          |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | " Edit Text " |

@a3matrix @regression
    Scenario Outline: User should be able to edit Current Status Used in Current Condition chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click on Edit button on "Current Condition" chart
        And I add following <text> against "Current Status:" while editing
        Then I validate success message "Changes updated successfully"
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | text          |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | " Edit Text " |

@a3matrix @regression
    Scenario Outline: User should be able to edit Actions Used in Implementation chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click on Edit button on "Implementation" chart
        And I add following <text> against "Actions:" while editing
        Then I validate success message "Changes updated successfully"
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | text          |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | " Edit Text " |

@a3matrix @regression
    Scenario Outline: User should be able to edit Analysis Used in Root Cause Analysis chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click on Edit button on "Root Cause Analysis" chart
        And I add following <text> against "Analysis:" while editing
        Then I validate success message "Changes updated successfully"
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | text          |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | " Edit Text " |

@a3matrix @regression
    Scenario Outline: User should be able to edit Tools Used in Root Cause Analysis chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click on Edit button on "Root Cause Analysis" chart
        And I add following <text> against "Tools Used:" while editing
        Then I validate success message "Changes updated successfully"
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | text          |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | " Edit Text " |

@a3matrix @regression
    Scenario Outline: User should be able to edit Goals Used in Target Condition/Future State chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click on Edit button on "Target Condition/Future State" chart
        And I add following <text> against "Goals:" while editing
        Then I validate success message "Changes updated successfully"
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | text          |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | " Edit Text " |

@a3matrix @regression
    Scenario Outline: User should be able to edit SuggestedActions Used in Suggested Actions chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click on Edit button on "Suggested Actions" chart
        And I add following <text> against "SuggestedActions:" while editing
        Then I validate success message "Changes updated successfully"
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | text          |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | " Edit Text " |

@a3matrix @regression
    Scenario Outline: User should be able to edit Post-Implementation Checks Used in Evaluation chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click on Edit button on "Evaluation" chart
        And I add following <text> against "Post-Implementation Checks:" while editing
        Then I validate success message "Changes updated successfully"
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | text          |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | " Edit Text " |

@a3matrix @regression
    Scenario Outline: User should be able to edit Actions to Sustain Improvements Used in Follow-up chart
        When Provide <EMAIL> and <PASSWORD> and login into system
        # When Session is enabled for user <EMAIL> and password <PASSWORD>
        # When I navigate to the X-Matrix page
        And I navigate to the A3-Matrix page
        And I click on A3-Matrix <TITLE>
        And I click on Edit button on "Follow-up" chart
        And I add following <text> against "Actions to Sustain Improvements:" while editing
        Then I validate success message "Changes updated successfully"
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | TITLE                                     | CHART_NAME           | text          |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "I want to increase profit of my company" | "Subject/Background" | " Edit Text " |
