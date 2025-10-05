Feature: 01-Login Feature
    As a user on the Synaptic flow Application
    I want to test the login page

    Background:
        Given I am on the Synaptic login page

    ##################### Synaptic ##########################

    @login
    Scenario Outline: Performing login operation with passing test data as data table
        When Provide <EMAIL> and <PASSWORD> and login into system
        Then I should see the message <NAME> on the Home page
        Examples:
            | EMAIL                             | PASSWORD    | NAME         |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | "My company" |

    @login
    Scenario Outline: Performing login operation with passing invalid username as data table
        When Provide <EMAIL> and <PASSWORD> and login into system with invalid user
        Then I am able to validate proper message <MESSAGE>
        Examples:
            | EMAIL                               | PASSWORD    | MESSAGE               |
            | "croubayinoullaae-3277@yopmail.com" | "Test@1234" | "Invalid credentials" |

    @login
    Scenario Outline: Performing login operation with passing invalid password as data table
        When Provide <EMAIL> and <PASSWORD> and login into system with invalid password
        Then I am able to validate proper message <MESSAGE>
        Examples:
            | EMAIL                             | PASSWORD     | MESSAGE               |
            | "croubayinoulle-3277@yopmail.com" | "Test@12345" | "Invalid credentials" |

    @login
    Scenario Outline: Performing login operation with blank username field as data table
        When Provide <EMAIL> and login into system with blank userId
        Then I validate Login button is disabled
        Examples:
            | EMAIL                             | PASSWORD | MESSAGE               |
            | "croubayinoulle-3277@yopmail.com" | ""       | "Invalid credentials" |
