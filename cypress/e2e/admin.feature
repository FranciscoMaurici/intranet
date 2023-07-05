Feature: Admin

  Scenario: The admin wants to log into the Intranet can see the respective allowed sections
    Given the user "System-administration" who needs to log into the Intranet
    When redirects to the "Home" the relative path should be "/"
    Then the menu should display next items
      | Open Positions     | /open-positions      |
      | Culture & Benefits | /benefits       |
      | Leads              | /leads          |
      | Handbook           | /handbook       |
      | Configuration      | /configuration  |
      | Logout             | /login          |

  Scenario: The admin open the post modal window and publish announcement
    Given the user "System-administration" who needs to log into the Intranet
    When the user clicks on the input field with the placeholder "Create post..."
    Then the system displays the modal title should display "Create post"
    And the user type text on the modal "Sample text using the E2E"
    Then clicks on the icon "insert image"
    Then clicks the button with label "URL"
    Then fill the form modal section with the title "Insert Image"
      | Image URL | https://www.shutterstock.com/image-vector/potato-character-design-vector-wallpaper-260nw-1478351444.jpg |
      | Alt Text  | Cartoon potato                                                                                          |
    And clicks the button with label "Confirm"
    Then clicks the button with label "Publish"
    Then the system closes the modal window
    And publish the new announcement with a message toast "The announcement has been created successfully"

  Scenario: The admin edit the last announcement
    Given the user "System-administration" who needs to log into the Intranet
    Then click "Edit" from the last announcement
    And the user type text on the modal " - edited announcement"
    Then clicks the button with label "Publish"
    Then the system closes the modal window
    And publish the new announcement with a message toast "The announcement has been updated successfully"