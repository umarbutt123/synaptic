Feature: 05- Bowler Chart Feature

    As a user on the synaptic portal Application
    I want to Validate the Bowler Char Working

    Background:
        Given I am on the Synaptic login page

    ##################### Synaptic ##########################

    @TESTABD @regression
    Scenario Outline: Actual Values are being added and saved successfully
        When Provide <EMAIL> and <PASSWORD> and login into system
        And I navigate to the Bowler Chart Page
       # And I add a value under 1st measurement
       # Then Entered value must be saved successfully
       # Then I click on cancel button
        Then I logout
        Examples:
            | EMAIL                             | PASSWORD    | FIRST_NAME | LAST_NAME | ROLE        | USER_EMAIL       | STATUS   | FIRST_NAME_FIELD | LAST_NAME_FIELD |
            | "croubayinoulle-3277@yopmail.com" | "Test@1234" | ""         | ""        | "Dashboard" | "test@gmail.com" | "Active" | "First name"     | "Last name"     |

   