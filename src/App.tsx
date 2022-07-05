import React, { useEffect, useState } from "react";
import "./App.css";
import PlayerTable from "./components/PlayerTable";
import Queue from "./components/Queue";
import DraftedTable from "./components/DraftedTable";
import DraftBar from "./components/DraftBar";
import DraftBoard from "./components/DraftBoard";

import allPlayers from "./components/all_players_and_appearances.json";

// TODO: Make this default to empty, but built from the DK data, also make the mapping to get to allPlayers across draft_entry_id
import draftData from "./components/draft.json";
import { createDraftData } from "./components/createDraftData";

function App() {
  const [draftablePlayers, setDraftablePlayers] = useState(allPlayers);
  const [queuedPlayers, setQueuedPlayers] = useState({ result: [] });
  const [draftDataDk, setDraftDataDk] = useState(draftData);

  function queuePlayer(player: any) {
    // @ts-ignore
    let queuedPlayersResult = queuedPlayers["result"];
    // @ts-ignore
    player["is_queued"] = "1";
    // @ts-ignore
    queuedPlayersResult.push(player);
    setQueuedPlayers({ result: queuedPlayersResult });

    // Mark the player as is_queued
    // @ts-ignore
    let objIndex = draftablePlayers["result"].findIndex(
      (obj: any) => obj["id"] == player["id"]
    );
    // @ts-ignore
    draftablePlayers["result"][objIndex]["is_queued"] = "1";
    setDraftablePlayers(draftablePlayers);
  }

  function filterPosition(position: any) {
    // @ts-ignore
    for (let i = 0; i < draftablePlayers["result"].length; i++) {
    // @ts-ignore
      if (draftablePlayers["result"][i]["position"] == position) {
    // @ts-ignore
        draftablePlayers["result"][i]["displayed"] = "0";
      }
    }
    // @ts-ignore
    setDraftablePlayers(draftablePlayers);
  }

  function unfilterPosition(position: any) {
    // @ts-ignore
    for (let i = 0; i < draftablePlayers["result"].length; i++) {
    // @ts-ignore
      if (draftablePlayers["result"][i]["position"] == position) {
    // @ts-ignore
        draftablePlayers["result"][i]["displayed"] = "1";
      }
    }
    // @ts-ignore
    setDraftablePlayers(draftablePlayers);
  }

  function unqueuePlayer(player: any) {
    // @ts-ignore
    let queuedPlayersResult = queuedPlayers["result"];
    // @ts-ignore
    queuedPlayersResult = queuedPlayersResult.filter(
      (item) => item["id"] !== player["id"]
    );
    // @ts-ignore
    setQueuedPlayers({ result: queuedPlayersResult });

    // Mark the player as is_queued
    // @ts-ignore
    let objIndex = draftablePlayers["result"].findIndex(
      (obj: any) => obj["id"] == player["id"]
    );
    // @ts-ignore
    draftablePlayers["result"][objIndex]["is_queued"] = "0";
    setDraftablePlayers(draftablePlayers);
  }

  const [myUserName, setMyUserName] = useState("");
  const [nextDrafter, setNextDrafter] = useState("");
  const [contestId, setContestId] = useState("");

  function getNextDrafter(draftData: any) {
    const nextUserKey = draftData["draftBoard"].filter(
      (item: any) => item["playerId"] == undefined
    )[0]["userKey"];

    const username = draftData["users"].filter(
      (item: any) => item["userKey"] == nextUserKey
    )[0]["displayName"];

    return username;
  }

  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };
    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const url = tabs[0].url;
        const split_url = url?.split("/");

        // @ts-ignore
        setContestId(split_url[split_url.length - 1]);
      });

    fetch(
      "https://api.draftkings.com/sites/US-DK/dashes/v1/dashes/siteNav/users/me.json?format=json"
    )
      .then((r) => r.text())
      .then((result) => {
        // @ts-ignore
        setMyUserName(JSON.parse(result)["userName"]);
      });
  }, []);

  const [entryId, setEntryId] = useState("");

  useEffect(() => {
    if (!myUserName) {
      return;
    }
    fetch(
      `https://api.draftkings.com/contests/v1/users/${myUserName}?format=json`
    )
      .then((r) => r.text())
      .then((result) => {
        // @ts-ignore
        setEntryId(
          JSON.parse(result)["userProfile"]["enteredContests"].filter(
            (item: any) => item["contestKey"] == contestId
          )[0]["entryKey"]
        );
      });
  }, [myUserName]);

  useEffect(() => {
    if (!contestId || !entryId) {
      return;
    }
    fetchData();
    setInterval(function() {
      fetchData();
    }, 5000);
  }, [entryId]);

  function fetchData() {
    fetch(
      `https://api.draftkings.com/drafts/v1/${contestId}/entries/${entryId}/draftStatus?format=json`
    )
      .then((r) => r.text())
      .then((result) => {
        // @ts-ignore
        setDraftDataDk(createDraftData(JSON.parse(result)));
        setNextDrafter(getNextDrafter(JSON.parse(result)));
      });
  }

  useEffect(() => {
    // @ts-ignore
    let draftablePlayersResult = draftablePlayers["result"];
    if (!draftablePlayersResult) {
      return;
    }

    for (const pick of draftDataDk["draft"]["picks"]) {
      // @ts-ignore
      draftablePlayersResult = draftablePlayersResult.filter(
        (item: any) => item["appearance_id"] != pick["appearance_id"]
      );
    }
    setDraftablePlayers({ result: draftablePlayersResult });
  }, [draftDataDk]);

  return (
    <div className="theme--light">
      <DraftBoard draftData={draftDataDk} allPlayers={allPlayers} />
      <div className="styles__draftPage__YSqmm">
        <DraftBar draftData={draftDataDk} allPlayers={allPlayers} />
        <div className="styles__leftCol__TveLw">
          <div className="styles__columnTitle__KwHbQ">
            <h2 className="styles__title__MAX_v">Players</h2>
          </div>
          <PlayerTable
            dk={draftDataDk}
            entryId={entryId}
            playersData={draftablePlayers}
            queuePlayer={queuePlayer}
            unqueuePlayer={unqueuePlayer}
            filterPosition={filterPosition}
            unfilterPosition={unfilterPosition}
            useFilter={true}
          />
        </div>

        <div className="styles__centerCol__w8Dvf">
          <Queue playersData={queuedPlayers} entryId={entryId} unqueuePlayer={unqueuePlayer} dk={draftDataDk} />
        </div>
        <div className="styles__rightCol__nh76d">
          <DraftedTable draftData={draftDataDk} allPlayers={allPlayers} />
        </div>
      </div>
    </div>
  );
}

export default App;
