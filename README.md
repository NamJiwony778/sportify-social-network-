# Sportify

Sportify is a student's project, a social network for organizing sports activities, chatting and email exchange, MEAN stack powered. 

  - MongoDB
  - Express.js
  - AngularJS
  - Node.js
  - Bootstrap

# Main Features:

  - Authorization
  - Adding info about sport activities
  - User account setup with privacy settings 
  - Search activities by host's name and category
  - Email exchange
  - Chat

This site is composed of the following pages:

# Main Page
retrieves information about sport activities from MongoDB and has button for adding new activities with modal form by authorized users. 

![Image](https://s8.hostingkartinok.com/uploads/images/2021/01/fbfebc0436e6fdcff22556abb34d2a0b.png)

# Sign Up Page
contains form for registration

# Sign In Page
contains login form 

Authentication was created with JWT(jsonwebtoken) technology. The following npm packages used on the backend:
 - express
 - mongoose
 - body-parser
 - cors
 - jsonwebtoken
 - bcrypjs

# Activity details
retrieves information about specific activity by ID. Users can subscribe for chosen activity. Their names are shown on the screen as participants. 

![Image](https://s8.hostingkartinok.com/uploads/images/2021/01/2919d9d205f4b298a6f444d0202dd98c.png)

An activity organizer can update or delete their activity.

![Image](https://s8.hostingkartinok.com/uploads/images/2021/01/83603a7f48eeee589277ea11fc37c383.png)

# Profile 

User can add avatar, sport interests, make account private, check followings and followers.

![Image](https://s8.hostingkartinok.com/uploads/images/2021/01/46c9ac9268c2a00368a12b7953472013.png)

# Another User Account

User can follow chosen user, send email or chat message.

![Image](https://s8.hostingkartinok.com/uploads/images/2021/01/a6cf97fc86363fd22eef170bb3997827.png)

# Email Page
User can manage their emails (get and send functionality).

![Image](https://s8.hostingkartinok.com/uploads/images/2021/01/568ca8630e8101678f8910955d02ff95.png)

# Chat
allows user exchange messages. This feature was created with socket.io for Node.JS HTTP Server and socket.io-client for AngularJS. 

![Image](https://s8.hostingkartinok.com/uploads/images/2021/01/8461394dc200a2bd3bfb70c2ba782bea.png)

Credits
----
All rights for images belong to their respective owners

Author
----

Mariia Brovarska @NamJiwony778 on GitHub. 

License
----

Copyright 2021 Mariia Brovarska

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
