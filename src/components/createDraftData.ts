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
    draftDataDk["draft"]["users"].push({ id: userId, username: userId, avatarUrl: avatarUrl });
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

  function dkIdToUDId(playerId: any) {
    let playerName = dk["playerPool"]["draftablePlayers"].filter(
      (item: any) => item["playerId"] == playerId
    )[0]["displayName"];

    playerName = playerName.replace('Pittman Jr.', 'Pittman');
    playerName = playerName.replace('Robinson II', 'Robinson');
    playerName = playerName.replace('DK Metcalf', 'D.K. Metcalf');
    playerName = playerName.replace('Eli Mitchell', 'Elijah Mitchell');
    console.log(playerName);
    const appearanceId = allPlayersUd["result"].filter(
      (item: any) => `${item["first_name"]} ${item["last_name"]}` == playerName
    )[0]["appearance_id"];
    return appearanceId;
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

  return draftDataDk;
}
