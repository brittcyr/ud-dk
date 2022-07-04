// @ts-nocheck
import allPlayersUd from "./all_players_and_appearances.json";

export function createDraftData(dk: any) {
  // @ts-ignore
  let draftDataDk = { draft: {} };

  draftDataDk["draft"]["draft_entries"] = [];
  draftDataDk["draft"]["users"] = [];
  for (const user of dk["users"]) {
    /*
        DK
        {
            "userKey":"ef5ec8ae-2dbe-4160-92c3-fdc4186f23d6",
            "displayName":"pappy8990",
            "avatarUrl":"https://s3.amazonaws.com/UserProfile/Small/pappy8990.jpeg",
            "isAutoDraftEnabled":false
        }
        */

    /*
        UD
        {
            "id": "ac457050-0548-4172-bf80-15262c06d190",  // Maps to the draft entry id   in picks
            "pick_order": 3,
            "user_id": "16841e0c-9e2e-4085-9b5c-15e7b828b1a1" // Maps to the user id in users
        },
        */
    const draftEntryId = user["userKey"];
    const userId = user["displayName"];
    const avatarUrl = user["avatarUrl"];
    const pickOrder = dk["draftBoard"].filter(
      (item: any) => item["userKey"] == draftEntryId
    )[0]["selectionNumber"];
    draftDataDk["draft"]["draft_entries"].push({
      id: draftEntryId,
      user_id: userId,
      pick_order: pickOrder,
    });
    draftDataDk["draft"]["users"].push({
      id: userId,
      username: userId,
      avatarUrl: avatarUrl,
    });
  }

  draftDataDk["draft"]["picks"] = [];
  /*
        UD
        {
            "appearance_id": "fa2fcc47-5a09-458e-82b6-656b030ad88a",   // maps to appearance id
            "draft_entry_id": "ed4189d3-96fc-4862-a991-8bdb0206dd16",  // Who drafted
            "number": 1, // overall draft number
        },

        DK
        {
            "userKey": "4058ae52-ee54-4957-8e7e-9b572fde7309", // who drafted
            "playerId": 698227,  // Which player
            "overallSelectionNumber": 2
        },
    */

  function cleanName(name: string) {
    let playerName = name;
    playerName = playerName.replace("Pittman Jr.", "Pittman");
    playerName = playerName.replace("Robinson II", "Robinson");
    playerName = playerName.replace("Eli Mitchell", "Elijah Mitchell");
    playerName = playerName.replace("Melvin Gordon III", "Melvin Gordon");
    playerName = playerName.replace("Ronald Jones II", "Ronald Jones");
    playerName = playerName.replace(
      "Darrell Henderson Jr.",
      "Darrell Henderson"
    );
    playerName = playerName.replace("Irv Smith Jr.", "Irv Smith");
    playerName = playerName.replace("DJ Chark Jr.", "D.J. Chark");
    playerName = playerName.replace("Marvin Jones Jr.", "Marvin Jones");
    playerName = playerName.replace("Kenneth Walker", "Ken Walker");
    playerName = playerName.replace("Odell Beckham Jr.", "Odell Beckham");
    playerName = playerName.replace("Brian Robinson Jr.", "Brian Robinson");
    playerName = playerName.replace("Robbie Anderson", "Robby Anderson");
    playerName = playerName.replace("Mitch Trubisky", "Mitchell Trubisky");
    playerName = playerName.replace("Will Fuller", "William Fuller");
    playerName = playerName.replace(" Jr.", "");
    playerName = playerName.replace(" III", "");
    playerName = playerName.replace(" II", "");
    playerName = playerName.replace(" IV", "");
    playerName = playerName.replace(" V", "");
    playerName = playerName.replace(" Sr.", "");
    playerName = playerName.replace(".", "");
    playerName = playerName.replace(".", "");
    playerName = playerName.replace("DK Metcalf", "D.K. Metcalf");
    playerName = playerName.replace("AJ Brown", "A.J. Brown");
    playerName = playerName.replace("TJ Hockenson", "T.J. Hockenson");
    playerName = playerName.replace("JK Dobbins", "J.K. Dobbins");
    playerName = playerName.replace("Amon-Ra St Brown", "Amon-Ra St. Brown");
    playerName = playerName.replace("Marquezaldes-Scantling", "Marquez Valdes-Scantling");
    return playerName;
  }


  function udIdToDkId(udId: any) {
      const udPlayer = allPlayersUd["result"].filter(
        (item: any) => item["appearance_id"] == udId
      )[0];
      let playerName = `${udPlayer.first_name} ${udPlayer.last_name}`
      playerName = cleanName(playerName);

    try {
      const dkId = dk["playerPool"]["draftablePlayers"].filter(
        (item: any) => cleanName(item['displayName']) == playerName
      )[0]["playerId"];
      return dkId;
    } catch (err) {
      return "123456789";
    }
  }


  function dkIdToUDId(playerId: any) {
    let playerName = dk["playerPool"]["draftablePlayers"].filter(
      (item: any) => item["playerId"] == playerId
    )[0]["displayName"];

    playerName = cleanName(playerName);
    let appearanceId;
    try {
      appearanceId = allPlayersUd["result"].filter(
        (item: any) =>
          `${item["first_name"]} ${item["last_name"]}` == playerName
      )[0]["appearance_id"];
      return appearanceId;
    } catch (err) {
      console.log(playerName);
      return "67646aeb-2ee8-4bcd-8e56-0f92372905ea";
    }
  }


  for (const pick of dk["draftBoard"]) {
    if (!pick["playerId"]) {
      continue;
    }
    const draftEntryId = pick["userKey"];
    const appearanceId = dkIdToUDId(pick["playerId"]);
    const number = pick["overallSelectionNumber"];
    draftDataDk["draft"]["picks"].push({
      draft_entry_id: draftEntryId,
      appearance_id: appearanceId,
      number: number,
    });
  }

  // TODO: Store this to a local json file and just read it so dont need to reconstruct.
  draftDataDk["udToDkId"] = {};
  /*
  for (const player of allPlayersUd["result"]) {
    draftDataDk["udToDkId"][player["appearance_id"]] = udIdToDkId(player["appearance_id"]);
  }
  */

  return draftDataDk;
}
