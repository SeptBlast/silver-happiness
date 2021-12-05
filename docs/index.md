[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FSeptBlast%2Fsilver-happiness.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FSeptBlast%2Fsilver-happiness?ref=badge_shield)
[![Known Vulnerabilities](https://snyk.io/test/github/SeptBlast/silver-happiness/badge.svg)](https://snyk.io/test/github/SeptBlast/silver-happiness)
[![OSSAR](https://github.com/SeptBlast/silver-happiness/actions/workflows/ossar-analysis.yml/badge.svg)](https://github.com/SeptBlast/silver-happiness/actions/workflows/ossar-analysis.yml)
[![Publish Container Image](https://github.com/SeptBlast/silver-happiness/actions/workflows/docker-image.yml/badge.svg)](https://github.com/SeptBlast/silver-happiness/actions/workflows/docker-image.yml)
[![Deploy to Heroku](https://github.com/SeptBlast/silver-happiness/actions/workflows/heroku-deploy.yml/badge.svg)](https://github.com/SeptBlast/silver-happiness/actions/workflows/heroku-deploy.yml)

## Stack Used

![NodeJs](https://img.shields.io/badge/Node.js-v16.13.0-339933?logo=Node.js)
![Express](https://img.shields.io/badge/Express-v4.17.1-000000?logo=Express)
![MongoDB](https://img.shields.io/badge/MongoDB-v4.4.10-47a248?logo=MongoDB)
![Heroku](https://img.shields.io/badge/Heroku-v7.59.2-430098?logo=Heroku)
![Snyk](https://img.shields.io/badge/Snyk-v1.22.1-4c4a73?logo=Snyk)

#

## Developer Instruuctions

### [PreChecks](#prechecks)

Pull this library from [here](https://github.com/SeptBlast/silver-happiness/), once library is pulled follow the following steps to get the environment ready for development.

```bash
~$ cd silver-happiness
~$ chmod +x ../.husky/*
```

Above commands are used to make sure that the husky hooks are executable.

### [Installation](#installation)

Once hooks are set up, you can install the library using the following command.

```bash
~$ npm install
```

### [Usage](#usage)

Once all the library dependencies are installed, you can use the library as follows. But there are few `Envirnment Variables` required to make the application work. Sample code is provided below or you can look for [`.env.sample`](/.env.sample) file.

```env
NODE_ENV=

# 👉 Port Configuration
PORT=

# 👉 MongoDB Configuration
MONGO_HOST=
MONGO_PORT=
MONGO_DB_NAME=sample_mflix
```

MongoDB Host and Port are required to connect to the database. For MongoDB usages please refer to [MongoDB](https://www.mongodb.com/) documentation or the [Mongoose](https://mongoosejs.com/) documentation. [MongoDB Atlas](https://cloud.mongodb.com) would be a good choice for development going ahead.

For development test scenarions Heroku is a good choice. Heroku is a cloud based platform that allows you to deploy your application to the cloud. For Heroku usages please refer to [Heroku](https://www.heroku.com/) documentation.

### [Deployment](#deployment)

For the shake of deployment we are going to use `Github Actions` to deploy the application. For referece please refer to [Github Actions](https://github.com/SeptBlast/silver-happiness/tree/main/.github/workflows) files written in the `workflow` folder.

In the folder there are 3 CI/CD actions written in the following order.

-   [`ossar-analysis`](https://github.com/SeptBlast/silver-happiness/blob/main/.github/workflows/ossar-analysis.yml)
    is used to run the OSSAR analysis on the application which helps in analyzing code and the vulnerabilites of its dependencies.
-   [`docker-image`](https://github.com/SeptBlast/silver-happiness/blob/main/.github/workflows/docker-image.yml) is used to build the docker image and it deploy that docker image in github container image repository.
-   [`heroku-deploy`](https://github.com/SeptBlast/silver-happiness/blob/main/.github/workflows/heroku-deploy.yml) is used to deploy the application to Heroku.

### [API](#api)

In the applications following are the endpoints that are exposed to the user publically. These endpoints are used to interact with the application, fetch details from the Sample database provided by MongoDB for the Moview Application.

#### <b><i>Following are the Endpoints you can use to interact with the application.</i></b>

**For all the endpoints you need to pass the `HostName` as https://silver-happiness.herokuapp.com/**

<b>API: 0</b>
Server Ping Endpoint

```http
GET /v1/ping
```

Response:

```JSON
{
    "name": "silver-happiness",
    "version": "v1.0.1",
    "author": "Devesh Kumar"
}
```

```http
GET /ping
```

Response:

```Text
pong
```

<b>API: 1</b>
Fetch all the theaters from the database.

```http
GET /v1/theater
```

| Parameter | type   | Description                 |
| --------- | ------ | --------------------------- |
| limit     | Number | How many records            |
| page      | Number | Which page Nummber to refer |

Responses:

```JSON
[
    {
        "_id": "59a47286cfa9a3a73e51e72c",
        "theaterId": 1000,
        "location": {
            "address": {
                "city": "Bloomington",
                "state": "MNII",
                "street1": "340 W Market",
                "zipcode": "55425",
                "_id": "61ab89e9ec12d09b170763e0",
                "updatedAt": "2021-12-04T15:31:53.968Z"
            },
            "geo": {
                "coordinates": [
                    -93.24565,
                    44.85466
                ],
                "type": "Point",
                "_id": "61ab89e9ec12d09b170763e1"
            },
            "_id": "61ab89e9ec12d09b170763df"
        },
        "addedOn": "2021-12-04T15:31:02.239Z"
    },
    {
        "addedOn": "2021-12-05T14:22:29.051Z",
        "_id": "59a47286cfa9a3a73e51e72d",
        "theaterId": 1003,
        "location": {
            "_id": "61accb2e80e8008e72a3d0fc",
            "address": {
                "_id": "61accb2e80e8008e72a3d0fd",
                "street1": "45235 Worth Ave.",
                "city": "California",
                "state": "MD",
                "zipcode": "20619"
            },
            "geo": {
                "_id": "61accb2e80e8008e72a3d0fe",
                "type": "Point",
                "coordinates": [
                    -76.512016,
                    38.29697
                ]
            }
        }
    }
]
```

<b>API: 2</b>
Fetch all the details of specific theater from the database.

```http
GET /v1/theater/find/?theater_id=1009
```

Resposne:

```JSON
{
    "addedOn": "2021-12-05T14:22:29.051Z",
    "_id": "59a47286cfa9a3a73e51e734",
    "theaterId": 1009,
    "location": {
        "_id": "61accbe680e8008e72a3e359",
        "address": {
            "_id": "61accbe680e8008e72a3e35a",
            "street1": "6310 E Pacific Coast Hwy",
            "city": "Long Beach",
            "state": "CA",
            "zipcode": "90803"
        },
        "geo": {
            "_id": "61accbe680e8008e72a3e35b",
            "type": "Point",
            "coordinates": [
                -118.11414,
                33.760353
            ]
        }
    }
}
```

<b>API: 3</b>
Add a New Theater Details to the database.

```http
POST /v1/theater
Content-Type: application/json

{
    "location": {
        "address": {
            "street1": "340 W Market",
            "city": "Bloomington",
            "state": "MNAI",
            "zipcode": "55425"
        },
        "geo": {
            "type": "Point",
            "coordinates": [
                -93.24565,
                44.85466
            ]
        }
    }
}
```

Resposne:

```JSON
{
    "theaterId": 88282,
    "location": {
        "address": {
            "city": "Bloomington",
            "state": "MNAI",
            "street1": "340 W Market",
            "zipcode": "55425",
            "_id": "61accc6780e8008e72a3e35e",
            "createdAt": "2021-12-05T14:27:51.173Z",
            "updatedAt": "2021-12-05T14:27:51.173Z"
        },
        "geo": {
            "coordinates": [
                -93.24565,
                44.85466
            ],
            "type": "Point",
            "_id": "61accc6780e8008e72a3e35f"
        },
        "_id": "61accc6780e8008e72a3e35d"
    },
    "addedOn": "2021-12-05T14:22:29.051Z",
    "_id": "61accc6780e8008e72a3e35c",
    "__v": 0
}
```

<b>API: 4</b>
Update Theater Details to the database.

```http
PUT /v1/theater/find/?theater_id=88282
Content-Type: application/json

{
	"location": {
		"address": {
			"street1": "340 W Market",
			"city": "Bloomington",
			"state": "MN",
			"zipcode": "55425"
		},
		"geo": {
			"type": "Point",
			"coordinates": [
				-90.24565,
				24.85466
			]
		}
	}
}
```

Resposne:

```JSON
{
    "_id": "61accc6780e8008e72a3e35c",
    "theaterId": 88282,
    "location": {
        "address": {
            "city": "Bloomington",
            "state": "MN",
            "street1": "340 W Market",
            "zipcode": "55425",
            "_id": "61acccff80e8008e72a3e36e",
            "updatedAt": "2021-12-05T14:30:23.743Z"
        },
        "geo": {
            "coordinates": [
                -90.24565,
                24.85466
            ],
            "type": "Point",
            "_id": "61acccff80e8008e72a3e36f"
        },
        "_id": "61acccff80e8008e72a3e36d"
    },
    "addedOn": "2021-12-05T14:22:29.051Z",
    "__v": 0
}
```

<b>API: 5</b>
Delete Specific Theater from the database.

```http
DELETE /v1/theater/find/?theater_id=38433
```

Response:

```Text
StatusCode: 204
```

#

## License

[![CC0 1.0 Universal](https://img.shields.io/badge/CCO1.0Universal-v1.0-4c4a73)](../LICENSE)

# [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FSeptBlast%2Fsilver-happiness.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FSeptBlast%2Fsilver-happiness?ref=badge_large)
