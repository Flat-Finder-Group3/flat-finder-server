// redis for caching database
const redis = require('redis')

//got to use the right redis url
const redisClient = redis.createClient({
    legacyMode: true,
    // url: "rediss://red-cgi40afdvk4o0mtvm5cg:AtPLtcLlRtcRquz47ZBiKWQpduqlnSex@frankfurt-redis.render.com:6379"
})

const DEFAULT_EXPIRATION = 3600; // 1 hour

async function getOrSetCache(key, cb) {

    if (!redisClient.isOpen) {
        await redisClient.connect()
    }

    return new Promise((resolve, reject) => {
        redisClient.get(key, async (error, data) => {
            if (error) return reject(error)
            if (data != null) {
                console.log('cache hit')
                return resolve(JSON.parse(data))
            } 
            console.log('cache miss')
            const databaseData = await cb();
            redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(databaseData))
            resolve(databaseData)
        })
    })
}
async function removeData(key) {

    if (!redisClient.isOpen) {
        await redisClient.connect()
    }

    await redisClient.del(key)

}

async function removeMatchingData(keyPattern) {

    if (!redisClient.isOpen) {
        await redisClient.connect()
    }

    // const matchingKeys = redisClient.keys(keyPattern);
    // console.log(matchingKeys)
    // for (k in matchingKeys) {
    //     redisClient.del(k)
    // }
    redisClient.keys(keyPattern, async (err, replies) => {
        if (err) {
          return err;
        }

        if (replies.length > 0) await redisClient.del(replies);
      });

}

module.exports = {
    getOrSetCache, removeData, removeMatchingData
}