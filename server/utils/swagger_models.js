exports.models = {
    "Device" : {
        "id" : "Device",
        "required" : [ "token", "type", "user", "subscriptions" ],
        "properties" : {
            "token" : {
                "type" : "string",
                "format" : "string",
                "description" : "Token ID of the Device"
            },
            "type" : {
                "type" : "string",
                "format" : "string",
                "description" : "Type of Device ios/android"
            },
            "version" : {
                "type" : "string",
                "format" : "string",
                "description" : "Client version"
            },
            "user" : {
                "type" : "string",
                "format" : "string",
                "description" : "UserID of the User"
            },
            "subscriptions" : {
                "type" : "array",
                "description" : "Webrtc topics. Sample: \"/webrtc/pb/${username}\",\"/webrtc/ugc-share/${username}\",\"/webrtc/ugc-activity/${username}\"",
                "items" : {
                    "type" : "string"
                }
            },
            "description" : {
                "type" : "string",
                "format" : "string",
                "description" : "Description of the Device"
            }
        }
    }
}