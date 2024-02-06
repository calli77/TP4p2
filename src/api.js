import fetch from 'node-fetch';
import crypto from 'crypto';

/**
 * Récupère les données de l'endpoint en utilisant les identifiants
 * particuliers developer.marvels.com
 * @param url l'end-point
 * @return {Promise<json>}
 */
export const getData = async (url) => {
    const publicKey = "bd3546c18ac868d22f02995dd1c67f7f";
    const privateKey = "9e8f486d991e7c6f330c4e6860ebabb4b5f19609";
    const ts = new Date().getTime();
    const hash = await getHash(publicKey, privateKey, ts);
    const fullurl = url + "/v1/public/characters?ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash;
    console.log(fullurl)
    try {
        const response = await fetch(fullurl);
        const data = await response.json();
        const charactersAvecImage = data.data.results.filter(character => {
            return character.thumbnail && character.thumbnail.path !== "image_not_available";
        });
        const characters = charactersAvecImage.map(character => {
            return {
                name: character.name,
                description: character.description,
                imageUrl: `${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`
            };
        });
        return characters;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}



/**
 * Calcul la valeur md5 dans l'ordre : timestamp+privateKey+publicKey
 * cf documentation developer.marvels.com
 * @param publicKey
 * @param privateKey
 * @param timestamp
 * @return {Promise<ArrayBuffer>} en hexadecimal
 */
export const getHash = async (publicKey, privateKey, timestamp) => {
    const hash = crypto.createHash('md5').update(timestamp + privateKey + publicKey).digest('hex');
    return hash;
}