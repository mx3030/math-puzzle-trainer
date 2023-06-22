# database structure

- games
    - game{Nr}
        mode: {Training,Rush,Duell}
        difficulty:
        limit:
        - time
            - startTime
            - duration
        - puzzleList
            - pushKey:
                - format: 'build'/'link'
                - link: ref to puzzles
        status: 'running'/'waiting'
        - connectedPlayers
            - pushKey:playerName
        - waitingStatus
            - playerName: true
        - rankingPlayers:
            - playerName: 3
        - pointsPlayers:
            - playerName: 20
        - solvedPuzzles:
            playerName
            - ref to puzzleList: true 
        - finishedPlayer:
            -playerName: false

                
- puzzles
    - tag1_tag2_tag3_tag_4_difficulty
        - numberOfPuzzles
        - puzzles
            - pushNode
                - question: base64 or calc array
                - userRating:
    - topics
        - pushNode: topicName
- leaderboards

