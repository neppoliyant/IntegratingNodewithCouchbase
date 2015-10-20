module.exports = {
    log: {
        console: {
            enabled: true,
            level: 'debug',
            colorize: false
        },
        plaintext: {
            enabled: false,
            level: 'debug',
            filename: 'app.log',
            dirname: 'logs',
            maxsize: 10485760
        },
        audit: {
            enabled: true,
            level: 'audit',
            filename: 'appAudit.log',
            dirname: 'logs',
            maxsize: 10485760
        }
    },
    dir: "/opt/props/bodyBuilding/",
    couchBaseLocal: {
        server: 'http://localhost/:8091',
        bucketName: 'bodyBuilding',
        bucketPassword: 'star_2828',
        msgBucketName: 'bodyBuilding',
        msgBucketPassword: 'star_2828'
    }
}
