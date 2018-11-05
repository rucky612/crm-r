const initState = {
    "rows": [
        {
            "id": 0,
            "authorId": 0,
            "memo": "string",
            "createdAt": 0,
            "updatedAt": 0,
            "templateId": 0,
            "template": {
                "id": 0,
                "authorId": 0,
                "key": "string",
                "title": "string",
                "body": "string",
                "memo": "string",
                "createdAt": 0,
                "updatedAt": 0,
                "replacements": [
                    {
                        "id": 0,
                        "templateId": 0,
                        "maxByte": 0,
                        "keyword": "string",
                        "title": "string",
                        "defaultValue": "string"
                    }
                ]
            }
        }
    ],
    "count": 0
}

export default function (state = initState, action) {
    switch (action.type) {
        default:
            return state
    }
}