Backup Track Notes

Mail import
- import all messages, store them according to UUID
- watch the inbox and import all new messages as they arrive
- on connect, get all messages since the latest known UUID
- dependencies
  - imap
  - mailparser
  - mail-listener

Mail Classification (admin only)
- add "server" or "source" that will generate backup messages
  - a mail should be matched as from a specific "server"
  - mail that does not match a known server is added to an "unknown" queue
  - must define a regex rule for adding new messages to a server
  - can define multiple rules
    - if specific|any header matches regex
    - if body matches regex
  - test visually against a message
    - highlight the matched sequence
    - highlight captures in a slightly darker color
    - consider using Ace Editor
    - indicate which regexes/rules are matching
  - when loading a message, determine if it matches an existing "server"
  - when adding a server, determine if it matches the same messages as a different server

Mail Analysis (admin only)
- add success, warning and error rules to each server
  - messages that are marked for the server that don't match the analysis rules are marked as "unknown"
  - must define a regex to apply any of the headers or the body of the message
  - can define multiple rules
    - if specific|any header matches regex
    - if body matches regex
  - test visually against messages that have already been captured
    - easily browse the messages in the set with forward and backward arrows
    - clearly show if it is a success, warning, error or unknown message
    - indicate which regexes/rules are matching

Reporting
- users can be assigned to servers
- they have a dashboard that will show them their different servers
  - last backup: status (success|warning|fail|unknown)
  - chart of the last 5 or 10 statuses with dates and status colors
  - clicking on a status will show the message

User and Sharing
- users can log in using any common service
  - Facebook
  - Windows Live
  - Google
  - LinkedIn
  - Local Account (not preferred)
- users are invited to the system by email address
  - there's a token in the link they recieve that will match them to the invitation no matter which method they use to log in.
- users can invide other users to view their servers
  - this is done server-by-server

Notifications
- can the user subscribe to a weekly digest email?
- should someone recieve an email if there are backup warnings or errors?
