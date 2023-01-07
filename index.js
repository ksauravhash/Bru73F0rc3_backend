import readline from "node:readline";
import aes256 from "aes256";
import fs from "fs";
import { NFTStorage } from "nft.storage";
import { exec } from "child_process";

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY;

let encryptedData;

async function toEncryptedKey() {
  let rl = readline.createInterface(process.stdin, process.stdout);
  let jsonfile = fs.readFileSync("temp.json").toString();
  rl.question("Input the key:", (key) => {
    encryptedData = aes256.encrypt(key, jsonfile);
    fs.writeFileSync("enc.txt", encryptedData);
    rl.close();
  });
}

function toCarFile() {
  exec("ipfs --pack encryptedData.txt --output data.car");
}

async function storeNFT() {
  const data = encryptedData;
  const description = "Stores the encrypted data for the driving license";

  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  // call client.store, passing in the image & metadata
  return nftstorage.store({
    name: "Driving License",
    data,
    description,
  });
}

async function main() {
  await toEncryptedKey();
  toCarFile();
  await storeNFT();
}

main().catch((err) => {
  console.log(err);
});
