Feature: 05- Bowler Chart Feature

    As a user on the synaptic portal Application
    I want to Validate the Bowler Char Working

    Background:
        Given I am on the Synaptic login page

    ##################### Synaptic ##########################

    @TESTBOWLER @regression
    Scenario Outline: New Target must be visible on bowler chart page
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I get the top target from targets page
        Then the target must be visible on Bowler chart page
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""         | ""        | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |

    @TESTBOWLER @regression
    Scenario Outline: User is able to add actual values manually
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Bowler Chart Page
        And I add a "<value>" under 1st measurement
        Then Entered "<value>" must be saved successfully
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | value | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | 9.00  | ""        | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |

    @TESTBOWLER @regression
    Scenario Outline: Popup for value already exist must appear
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Bowler Chart Page
        And I add a "<value>" under 1st measurement with dialog
        Then A popup confirming the update appears
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | value | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | 12.00 | ""        | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |

    @TESTBOWLER @regression
    Scenario Outline: Value must be saved after confirming on popup
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Bowler Chart Page
        And I add a "<value>" under 1st measurement with dialog
        Then A popup confirming the update appears with user clicking on <button>
        Then Entered "<value>" must be saved successfully
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | value | button   | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | 19.00 | "update" | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |

    @TESTBOWLER @regression
    Scenario Outline: Old Value must be retained after cancelling on popup
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Bowler Chart Page
        And I add a "<value>" under 1st measurement with dialog
        Then A popup confirming the update appears with user clicking on <button>
        Then Entered "<value>" must not be saved
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | value | button   | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | 20.00 | "cancel" | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |

    @TESTBOWLER1 @regression
    Scenario Outline: Color Grading Change according to threshold
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Bowler Chart Page
        And I add a "<value>" under 1st measurement
        Then Entered "<value>" must be saved successfully
        And the box turns green
        # And I add a "<value1>" under 1st measurement
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | value  | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | 100.00 | ""        | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |

    ## No Longer Valid ##
    ##@TESTBOWLER @regression
    ##    Scenario Outline: Error on Non Numeric Value
    ##        When Provide <EMAIL> and <PASSWORD> and login into system
    ##        And I navigate to the Bowler Chart Page
    ##        And I add a "<value>" under 1st measurement
    ##        Then An Error message must appear
    ##        Then I logout
    ##        Examples:
    ##            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
    ##            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""         | ""        | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |

    @TESTBOWLER @regression
    Scenario Outline: User is able to add actual values via import file
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Bowler Chart Page
        And I Upload a "<file>"
        Then Imported "<value>" must be reflected on the chart
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | file        | value | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | Bowler.xlsx | 13    | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |

