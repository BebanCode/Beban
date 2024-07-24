const { valueFromRemoteObject } = require("puppeteer")
const { validate } = require("../database/history")

const styles = [
    { name: "3d-model", value: "3d-model" },
    { name: "analog-film", value: "analog-film" },
    { name: "anime", value: "anime" },
    { name: "cinematic", value: "cinematic" },
    { name: "comic-book", value: "comic-book" },
    { name: "digital-art", value: "digital-art" },
    { name: "enhance", value: "enhance" },
    { name: "fantasty-art", value: "fantasty-art" },
    { name: "isometric", value: "isometric" },
    { name: "line-art", value: "line-art" },
    { name: "low-poly", value: "low-poly" },
    { name: "neon-punk", value: "neon-punk" },
    { name: "origami", value: "origami" },
    { name: "photographic", value: "photographic" },
    { name: "pixel-art", value: "pixel-art" },
    { name: "texture", value: "texture" },
    { name: "craft-clay", value: "craft-clay" }
]

const aspectRatio = [
    { name: "landscape", value: "landscape" },
    { name: "portrait", value: "portrait" },
    { name: "square", value: "square" }
]

const bahasa = [
    { name: "English", value: "en" },
    { name: "French", value: "fr" },
    { name: "German", value: "de" },
    { name: "Italian", value: "it" },
    { name: "Portugese", value: "pt" },
    { name: "Russian", value: "ru" },
    { name: "Japanesse", value: "ja" },
    { name: "Indonesian", value: "id" },
    { name: "Malay", value: "ms" }
]

const samplers = [
    { name: "Euler", value: "Euler" },
    { name: "Euler a", value: "Euler a" },
    { name: "LMS", value: "LMS" },
    { name: "Heun", value: "Heun" },
    { name: "DPM2", value: "DPM2" },
    { name: "DPM2 a", value: "DPM2 a" },
    { name: "DPM++ 2S a", value: "DPM++ 2S a" },
    { name: "DPM++ 2M", value: "DPM++ 2M" },
    { name: "DPM++ SDE", value: "DPM++ SDE" },
    { name: "DPM fast", value: "DPM fast" },
    { name: "DPM adaptive", value: "DPM adaptive" },
    { name: "LMS Karras", value: "LMS Karras" },
    { name: "DPM2 Karras", value: "DPM2 Karras" },
    { name: "DPM2 a Karras", value: "DPM2 a Karras" },
    { name: "DPM++ 2S a Karras", value: "DPM++ 2S a Karras" },
    { name: "DPM++ 2M Karras", value: "DPM++ 2M Karras" },
    { name: "DPM++ SDE Karras", value: "DPM++ SDE Karras" },
    { name: "DDIM", value: "DDIM" },
    { name: "PLMS", value: "PLMS" }
]

const ai_model = [
    { name: "3Guofeng3_v34", value: "3Guofeng3_v34.safetensors [50f420de]" },
    { name: "absolutereality_V16", value: "absolutereality_V16.safetensors [37db0fc3]" },
    { name: "absolutereality_v181", value: "absolutereality_v181.safetensors [3d9d4d2b]" },
    { name: "amIReal_V41", value: "amIReal_V41.safetensors [0a8a2e61]" },
    { name: "analog-diffusion-1.0", value: "analog-diffusion-1.0.ckpt [9ca13f02]" },
    { name: "anythingv3_0-pruned", value: "anythingv3_0-pruned.ckpt [2700c435]" },
    { name: "anything-v4.5-pruned", value: "anything-v4.5-pruned.ckpt [65745d25]" },
    { name: "anythingV5_PrtRE", value: "anythingV5_PrtRE.safetensors [893e49b9]" },
    { name: "dalcefo_v4", value: "dalcefo_v4.safetensors [425952fe]" },
    { name: "deliberate_v2", value: "deliberate_v2.safetensors [10ec4b29]" },
    { name: "deliberate_v3", value: "deliberate_v3.safetensors [afd9d2d4]" },
    { name: "dreamlike-anime-1.0", value: "dreamlike-anime-1.0.safetensors [4520e090]" },
    { name: "dreamlike-diffusion-1.0", value: "dreamlike-diffusion-1.0.safetensors [5c9fd6e0]" },
    { name: "dreamlike-photoreal-2.0", value: "dreamlike-photoreal-2.0.safetensors [fdcf65e7]" },
    { name: "dreamshaper_6BakedVae", value: "dreamshaper_6BakedVae.safetensors [114c8abb]" },
    { name: "dreamshaper_7", value: "dreamshaper_7.safetensors [5cf5ae06]" },
    { name: "dreamshaper_8", value: "dreamshaper_8.safetensors [9d40847d]" },
    { name: "edgeOfRealism_eorV20", value: "edgeOfRealism_eorV20.safetensors [3ed5de15]" },
    { name: "EimisAnimeDiffusion_V1", value: "EimisAnimeDiffusion_V1.ckpt [4f828a15]" },
    { name: "elldreths-vivid-mix", value: "elldreths-vivid-mix.safetensors [342d9d26]" },
    { name: "epicrealism_naturalSinRC1VAE", value: "epicrealism_naturalSinRC1VAE.safetensors [90a4c676]" },
    { name: "ICantBelieveItsNotPhotography_seco", value: "ICantBelieveItsNotPhotography_seco.safetensors [4e7a3dfd]" },
    { name: "juggernaut_aftermath", value: "juggernaut_aftermath.safetensors [5e20c455]" },
    { name: "lofi_v4", value: "lofi_v4.safetensors [ccc204d6]" },
]

module.exports = { styles, aspectRatio, bahasa, ai_model, samplers }
