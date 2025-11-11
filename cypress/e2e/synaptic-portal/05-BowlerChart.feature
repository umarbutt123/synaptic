Feature: 05- Bowler Chart Feature

    As a user on the synaptic portal Application
    I want to Validate the Bowler Char Working

    Background:
        Given I am on the Synaptic login page

    ##################### Synaptic ##########################

@TESTABD @regression
    Scenario Outline: New Target must be visible on bowler chart page
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the X-Matrix page
        And I add a new Percentage target
        Then Entered target must be visible on Bowler chart page
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""         | ""        | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |


    @TESTABD @regression
    Scenario Outline: User is able to add actual values manually
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Bowler Chart Page
        And I add a value under 1st measurement
        Then Entered value must be saved successfully
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""         | ""        | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |

 @TESTABD @regression
    Scenario Outline: Popup for value already exist must appear
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Bowler Chart Page
        And I add a value under 1st measurement
        Then A popup confirming the update appears
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""         | ""        | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |

 @TESTABD @regression
    Scenario Outline: Value must be saved after confirming on popup
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Bowler Chart Page
        And I add a value under 1st measurement
        Then A popup confirming the update appears
        And I click on Update Button
        Then Entered value must be saved successfully
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""         | ""        | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |

@TESTABD @regression
    Scenario Outline: Old Value must be retained after cancelling on popup
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Bowler Chart Page
        And I add a value under 1st measurement
        Then A popup confirming the update appears
        And I click on Cancel Button
        Then Old value must be saved
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""         | ""        | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |


@TESTABD @regression
    Scenario Outline: Color Grading Change according to threshold
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Bowler Chart Page
        And I add a <Value> under 1st measurement
        Then A popup confirming the update appears
        And I click on Update Button
        Then New Value must be saved successfully
        And the box turns green
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""         | ""        | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |

@TESTABD @regression
    Scenario Outline: Error on Non Numeric Value
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Bowler Chart Page
        And I add a <Value> under 1st measurement
        Then An Error message must appear
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""         | ""        | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |


@TESTABD @regression
    Scenario Outline: Empty Cells do not show 0
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Bowler Chart Page
        Then the empty Actual value cell must show non zero placeholder 
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""         | ""        | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |


   TESTABD @regression
    Scenario Outline: User is able to add actual values via import file
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Bowler Chart Page
        And I Upload a file containing actual values 
        Then imported values must be reflected on the chart
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""         | ""        | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |

TESTABD @regression
    Scenario Outline: Missing Value in File Upload
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Bowler Chart Page
        And I Upload a file containing a few actual values 
        Then imported values must be reflected on the chart
        And the empty Actual value cell must show non zero placeholder 
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""         | ""        | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |

TESTABD @regression
    Scenario Outline: Data from Mixed Source must be displayed correctly
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Bowler Chart Page
        And I Upload a file containing a few actual values 
        Then imported values must be reflected on the chart
        And I Add a value on an empty measurement 
        Then Added Value must be saved successfully
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""         | ""        | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |

TESTABD @regression
    Scenario Outline: Export file must be downloaded successfully
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Bowler Chart Page
        And I Click on Download template Button 
        Then a template must be downloaded
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""         | ""        | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |

TESTABD @regression
    Scenario Outline: Data from Mixed Source must be displayed correctly
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Bowler Chart Page
        And I Upload an incorrect file  
        Then an Error must be displayed
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""         | ""        | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |
