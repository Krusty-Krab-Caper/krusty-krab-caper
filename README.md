# The Krusty Krab Caper

In the bustling underwater city of Bikini Bottom, the Krusty Krab was known for its delicious Krabby Patty, a burger so scrumptious that its secret formula was a closely guarded treasure. Mr. Krabs, the crustacean owner, had recently digitized his operations, including the recipe’s safekeeping, through an API that connected to his vault.

Plankton, the tiny but ambitious owner of the rival restaurant, the Chum Bucket, had tried every trick in the book to get his hands on the coveted formula, to no avail. But when he heard about the Krusty Krab’s new digital system, a devious plan formed in his microscopic mind.

## Intro and Rules
Welcome to the Krusty Krab Caper: a Capture the Flag game. You play as Plankton as you try to obtain the coveted Krabby Patty Secret Formula.

### Prerequisites 

- Docker
- Node.js
- Clone this repository
- Spin up the container by running the command `docker compose up --build --detach`

_Remember that every time you restart the server many of the secrets you may have found will be reset._

### Rules
Here are the ground rules of this game:

- No looking at the source code found in the [api-ctf](https://github.com/Krusty-Krab-Caper/api-ctf) repository.
- No looking at the source code found in the mitm.js tool (It's been obfuscated, but still don't)

## The Heist

One gloomy evening, Plankton sat hunched over his computer, his single eye flickering with the screen's glow. "Karen, my computer wife, analyze the Krusty Krab's API endpoints," he commanded.

Karen's circuits hummed as she scanned the digital infrastructure of the Krusty Krab. "Plankton, it seems they've overlooked the security on their `/directory` endpoint. There's no authentication!"

A wicked smile spread across Plankton's face. "At last, the Krabby Patty secret formula will be mine!"

Karen continued, "the `/directory` endpoint seems to contain basic information about the employees at the Krusty Krab's IT Department. It's accessed at their directory website."

Upon locating the site, Plankton discovered that it was designed to retreive directory information by employee name. He put his own name, "Plankton" into the search bar and saw via the network tab in his browser that the following request is made: `http://localhost:8080/directory?id=0bafc1bbb34ddbf6f55935063bf51f50f8d775e6`. He also sees the following response:

```json
{
  "code": 404,
  "message": "Not Found"
}
```

He notices that the frontend is created very poorly and runs too slowly to make a lot of queries. He decides to rely on the underlying API to do his dirty work.

Rubbing his scheming, microbial hands together, Plankton devised a plan to find information to aid him in his heist... perhapes an identifier for someone important?

## Endpoints
Upon Karen's initial scan of the Krusty Krab's API infastructure, these are all of the usable endpoints found:

|Known Endpoints  |Method|Description                                  |Known Security Measures|
|------------|:---------:|--------------------------------------------------------|------------|
|`/directory`|GET        |Contains Krusty Krab IT Department Employee Information |None        |
|`/clients`  |GET        |Client Credential Management System                     |Bearer Token|
|`/token`    |POST       |Create Auth Tokens with Client Credentials              |None        |
|`/vault`    |GET        |The main site of the Krabby Patty Secret Formula vault  |Bearer Token|

_Hint: You may discover additional endpoints later!_ 


## Man in the Middle

Plankton decides to use a Man in the Middle (MITM) attack to intercept the requests made by anyone connected to the Krusty Krab wifi to get more information. He used his own custom tool called `mitm` to do so. He ran the following command in his terminal:

```bash
node mitm.js
```

The command intercepted and logged all requests made through the Krusty Krab wifi. Most of the requests were uninteresting, but Plankton noticed some very intriguing requests made through the wifi... perhaps they could help him in his quest for the secret formula.

#### _Helpful Information_

- The `mitm` tool simulates requests made through the Krusty Krab wifi.
- Each time you run the `mitm` tool, it will generate a new set of requests, but it will still have any information you need to complete the challenge.
- Depending on the terminal you run the tool in, the output could be truncated. Either use another terminal or try piping the output to another file with `node mitm.js > log.txt`
- Search through the requests, you may find something useful...
