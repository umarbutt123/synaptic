Feature: 02- Role Feature

    As a user on the unified portal Application
    I want to create role

    Background:
        Given I am on the Synaptic login page

    ##################### Synaptic ##########################

    @role
    Scenario Outline: Role name should be a mandatory field when creating a new role
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Role Page
        And I click on add new role button
        When I perform Create Role having following parameters <ROLE_NAME> <ROLE_DESCRIPTION> <ROLE_STATUS> <MODULE> <SCREEN> <FEATURE> <PERMISSION>
        Then I am able to validate proper message below field <FIELD>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | ROLE_NAME | ROLE_DESCRIPTION                     | ROLE_STATUS | MODULE     | SCREEN                 | FEATURE                  | PERMISSION | FIELD       |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""        | "This is a testing role description" | "Active"    | "X-Matrix" | "Strategic Objectives" | "AI Strategic Objective" | "Write"    | "Role name" |

    @role
    Scenario Outline: Module field should be mandatory when creating a new role
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Role Page
        And I click on add new role button
        When I perform Create Role having following parameters <ROLE_NAME> <ROLE_DESCRIPTION> <ROLE_STATUS> <MODULE> <SCREEN> <FEATURE> <PERMISSION>
        Then I am able to validate proper message below field <FIELD>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | ROLE_NAME | ROLE_DESCRIPTION                     | ROLE_STATUS | MODULE | SCREEN | FEATURE | PERMISSION | FIELD    |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""        | "This is a testing role description" | "Active"    | ""     | ""     | ""      | ""         | "Module" |

    @role
    Scenario Outline: Screen field should be mandatory when creating a new role
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Role Page
        And I click on add new role button
        When I perform Create Role having following parameters <ROLE_NAME> <ROLE_DESCRIPTION> <ROLE_STATUS> <MODULE> <SCREEN> <FEATURE> <PERMISSION>
        Then I am able to validate proper message below field <FIELD>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | ROLE_NAME | ROLE_DESCRIPTION                     | ROLE_STATUS | MODULE     | SCREEN | FEATURE | PERMISSION | FIELD    |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""        | "This is a testing role description" | "Active"    | "X-Matrix" | ""     | ""      | ""         | "Screen" |

    @role
    Scenario Outline: Feature field should be mandatory when creating a new role
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Role Page
        And I click on add new role button
        When I perform Create Role having following parameters <ROLE_NAME> <ROLE_DESCRIPTION> <ROLE_STATUS> <MODULE> <SCREEN> <FEATURE> <PERMISSION>
        Then I am able to validate proper message below field <FIELD>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | ROLE_NAME | ROLE_DESCRIPTION                     | ROLE_STATUS | MODULE     | SCREEN                 | FEATURE | PERMISSION | FIELD     |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""        | "This is a testing role description" | "Active"    | "X-Matrix" | "Strategic Objectives" | ""      | ""         | "Feature" |

    @role
    Scenario Outline: Permission field should be mandatory when creating a new role
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Role Page
        And I click on add new role button
        When I perform Create Role having following parameters <ROLE_NAME> <ROLE_DESCRIPTION> <ROLE_STATUS> <MODULE> <SCREEN> <FEATURE> <PERMISSION>
        Then I am able to validate proper message below field <FIELD>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | ROLE_NAME | ROLE_DESCRIPTION                     | ROLE_STATUS | MODULE     | SCREEN                 | FEATURE                  | PERMISSION | FIELD        |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""        | "This is a testing role description" | "Active"    | "X-Matrix" | "Strategic Objectives" | "AI Strategic Objective" | ""         | "Permission" |

    @role
    Scenario Outline: User should be able to add role with valid data
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Role Page
        And I click on add new role button
        When I perform Create Role having following parameters <ROLE_NAME> <ROLE_DESCRIPTION> <ROLE_STATUS> <MODULE> <SCREEN> <FEATURE> <PERMISSION>
        Then I am able to validate proper message <MESSAGE>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | ROLE_NAME              | ROLE_DESCRIPTION                     | ROLE_STATUS | MODULE     | SCREEN                 | FEATURE                  | PERMISSION | MESSAGE                     |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Test Automation Role" | "This is a testing role description" | "Active"    | "X-Matrix" | "Strategic Objectives" | "AI Strategic Objective" | "Write"    | "Role created successfully" |

    @role
    Scenario Outline: User should not be able to add role with lengthy role name field value
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Role Page
        And I click on add new role button
        When I perform Create Role having following parameters <ROLE_NAME> <ROLE_DESCRIPTION> <ROLE_STATUS> <MODULE> <SCREEN> <FEATURE> <PERMISSION>
        Then I am able to validate proper message <MESSAGE>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | ROLE_NAME                                                                                                                                                                                                                                                                                                          | ROLE_DESCRIPTION                     | ROLE_STATUS | MODULE     | SCREEN                 | FEATURE                  | PERMISSION | MESSAGE                                                         |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "asdadhgsdhjgjshkdgjhadgkjfdh kajhdkljahdsjkahdjkahdjk hajksdh kjadhkj kjadhkj ahjkdasdadhgsdhjgjshkdgjhadgkjfdh asdadadsadadadadadadasd asdadadsadadadadadadasd asdadadsadadadadadadasd  asdadadsadadadadadadasd asdadadsadadadadadadasd asdadadsadadadadadadasd asdadadsadadadadadadasd asdadadsadadadadadadasd" | "This is a testing role description" | "Active"    | "X-Matrix" | "Strategic Objectives" | "AI Strategic Objective" | "Write"    | "Invalid request model please provide the valid request model." |

    @role
    Scenario Outline: User should not be able to add role with lengthy description field value
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Role Page
        And I click on add new role button
        When I perform Create Role having following parameters <ROLE_NAME> <ROLE_DESCRIPTION> <ROLE_STATUS> <MODULE> <SCREEN> <FEATURE> <PERMISSION>
        Then I am able to validate proper message <MESSAGE>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | ROLE_NAME   | ROLE_DESCRIPTION                                                                                                                                                                                                                                                                                                                                | ROLE_STATUS | MODULE     | SCREEN                 | FEATURE                  | PERMISSION | MESSAGE                                                         |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Test Role" | "asdadhgsdhjgjshkdgjhadgkjfdh asdadhgsdhjgjshkdgjhadgkjfdh kajhdkljahdsjkahdjkahdjk hajksdh kjadhkj kjadhkj ahjkdasdadhgsdhjgjshkdgjhadgkjfdh asdadadsadadadadadadasd asdadadsadadadadadadasd asdadadsadadadadadadasd  asdadadsadadadadadadasd asdadadsadadadadadadasd asdadadsadadadadadadasd asdadadsadadadadadadasd asdadadsadadadadadadasd" | "Active"    | "X-Matrix" | "Strategic Objectives" | "AI Strategic Objective" | "Write"    | "Invalid request model please provide the valid request model." |

    @role1
    Scenario Outline: User should able to edit role with valid data
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Role Page
        And I click on edit role button <ROLE_NAME>
        When I perform Edit Role having following parameters <ROLE_NAME_UPDATE> <ROLE_DESCRIPTION>
        Then I am able to validate proper message <MESSAGE>
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | ROLE_NAME               | ROLE_NAME_UPDATE               | ROLE_DESCRIPTION                            | MESSAGE                     |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "Test Automation Role7" | "Test Automation Role7 Update" | "This is a testing role description Update" | "Role updated successfully" |