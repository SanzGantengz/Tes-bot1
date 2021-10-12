var { readFileSync, unlinkSync } = require("fs")
var { exec } = require("child_process")

module.exports = {
  name: ["slow"],
  type: ["audio"],
  useLimit: true,
  description: "change normal voice to fast",
  utilisation: userbot.prefix+"slow",
  
  async execute(m){
    let { conn } = data;
    try {
    var q = m.quoted ? { message: { [m.quoted.mtype] : m.quoted } } : m
    var mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')
    if(/audio/.test(mime)){
      var media = await conn.downloadAmdSaveMediaMessage(q)
      var rand = getRandom(".mp3")
      exec(`ffmpeg -i ${media} -filter:a "atempo=1.3,asetrate=43000" ${rand}`,(err) => {
        if(err) return m.reply("_error_!")
        conn.sendFile(m.chat,readFileSync(rand),rand,null,m,true,{quoted:m,mimetype:"audio/mp4"})
        unlinkSync(rand)
      })
    } else m.reply(`Balas vn/audio yang ingin diubah dengan caption *${userbot.prefix}fast*`)
  } catch (e) {
    throw e
  }
  }
}

const getRandom = (ext) => {
    return Math.floor(Math.random() * 9999)+ext
}