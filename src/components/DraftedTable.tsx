// @ts-nocheck
import React, { Component, useState, useRef, useEffect } from "react";
import Select from "react-select";

import { colorMap } from "./styles";

function DraftedTable(props: {draftData: any, allPlayers: any}) {
  const {draftData, allPlayers} = props;
  // @ts-ignore
  const options = draftData["draft"]["users"].map(function (currentElement: any) {
    return {
      value: currentElement["id"],
      label: currentElement["username"],
      className: "styles__option__Cy2YK",
    };
  });

  const [currentTeam, setCurrentTeam] = useState(options[0]["value"]);

  function userIdToDraftEntryId(user_id: any) {
    return draftData["draft"]["draft_entries"].filter(
      (item) => item["user_id"] == user_id
    )[0]["id"];
  }

  function selectDropdown(option: any) {
    const newCurrentTeam = option["value"];
    setCurrentTeam(newCurrentTeam);
    const currentDraftEntryId = userIdToDraftEntryId(newCurrentTeam);
    const newCurrentPicks = draftData["draft"]["picks"].filter(
      (item) => item["draft_entry_id"] == currentDraftEntryId
    );
    // @ts-ignore
    setCurrentPicks(newCurrentPicks);
  }

  const [currentPicks, setCurrentPicks] = useState(
    draftData["draft"]["picks"].filter(
      (item) =>
        item["draft_entry_id"] == userIdToDraftEntryId(options[0]["value"])
    )
  );

  useEffect(() => {
    const new_options = draftData["draft"]["users"].map(function (currentElement: any) {
      return {
        value: currentElement["id"],
        label: currentElement["username"],
        className: "styles__option__Cy2YK",
      };
    });
    setCurrentTeam(new_options[0]["value"]);
    setCurrentPicks(draftData["draft"]["picks"].filter(
      (item) =>
        item["draft_entry_id"] == userIdToDraftEntryId(new_options[0]["value"])
    ));
  }, [draftData]);

  function pickToPlayer(pick: any) {
    // @ts-ignore
    const playerAndAppearance = allPlayers["result"].filter(
      (item) => item["id"] == pick["appearance_id"]
    )[0];
    return playerAndAppearance;
  }

  function currentPositions() {
    const newList = currentPicks.map(function (currentElement) {
      const player = pickToPlayer(currentElement);
      return player["position"];
    });
    return newList;
  }

  function playerRow(player, pick) {
    return (
      <div
        className="styles__playerPickCell__JCEIA"
        draftData-appearance-id="2933617f-a121-459c-9714-35bd8345303a"
      >
        <div
          class="styles__playerImage__ftsDX"
          style={{ backgroundImage: `url('${player["image_url"]}')` }}
        ></div>
        <div className="styles__infoLine__llPh6 styles__playerName__L45h3">
          <div className="styles__playerNameRow__TZvU4">
            <p className="styles__infoValue__abWUk">{`${player["first_name"]} ${player["last_name"]}`}</p>
          </div>
          <div className="styles__teamLineupRow__SrJ53">
            <p className="styles__infoKey__u67Lp">
              <strong>{player["team_name"]}</strong>
            </p>
          </div>
        </div>
        <div className="styles__additionalInfo__gNhRa">
          <div className="styles__infoLine__llPh6">
            <p className="styles__infoValue__abWUk">{player["bye"]}</p>
            <p className="styles__infoKey__u67Lp">Bye</p>
          </div>
          <div className="styles__infoLine__llPh6">
            <p className="styles__infoValue__abWUk">
              {player["projection"]["adp"]}
            </p>
            <p className="styles__infoKey__u67Lp">ADP</p>
          </div>
          <div className="styles__infoLine__llPh6">
            <p className="styles__infoValue__abWUk">{pick["number"]}</p>
            <p className="styles__infoKey__u67Lp">Pick</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="styles__teamsDropdownComponent__m6Ii6">
        <div className="styles__teamsDropdownRow__hlXbM">
          <Select
            defaultValue={options[0]}
            name="teams"
            onChange={selectDropdown}
            options={options}
          />
        </div>
      </div>
      <div className="styles__draftEntryWrapper__AIbPf">
        <div className="styles__draftingTeamView__StdQn">
          <div className="styles__userInfo__ziFqm">
            <div className="styles__pickAndProjection__wnjDh">
              <div className="styles__pickAndProjectionBox__UsxQ8">
                <p className="styles__pickAndProjectionValue__Ugzds">
                  {
                    draftData["draft"]["draft_entries"].filter(
                      (item) => item["user_id"] == currentTeam
                    )[0] ?
                    draftData["draft"]["draft_entries"].filter(
                      (item) => item["user_id"] == currentTeam
                    )[0]["pick_order"] : ""
                  }
                </p>
                <p className="styles__pickAndProjectionLabel__Nx0tG">
                  Pick position
                </p>
              </div>
            </div>
            <div className="styles__picksBar__GxUxY styles__picksBar__GcVSy">
              <div
                className="styles__bar__ey6Lw"
                style={{
                  ...colorMap["RB"],
                  ...{
                    width: `${Math.floor(
                      (currentPositions().filter((obj) => obj == "RB").length /
                        (currentPositions().length + 0.01)) *
                        100
                    )}%`,
                  },
                }}
              ></div>
              <div
                className="styles__bar__ey6Lw"
                style={{
                  ...colorMap["QB"],
                  ...{
                    width: `${Math.floor(
                      (currentPositions().filter((obj) => obj == "QB").length /
                        (currentPositions().length + 0.01)) *
                        100
                    )}%`,
                  },
                }}
              ></div>
              <div
                className="styles__bar__ey6Lw"
                style={{
                  ...colorMap["WR"],
                  ...{
                    width: `${Math.floor(
                      (currentPositions().filter((obj) => obj == "WR").length /
                        (currentPositions().length + 0.01)) *
                        100
                    )}%`,
                  },
                }}
              ></div>
              <div
                className="styles__bar__ey6Lw"
                style={{
                  ...colorMap["TE"],
                  ...{
                    width: `${Math.floor(
                      (currentPositions().filter((obj) => obj == "TE").length /
                        (currentPositions().length + 0.01)) *
                        100
                    )}%`,
                  },
                }}
              ></div>
            </div>
            <div className="styles__positionCounterWrapper__QhAES">
              <div className="styles__positionCounter__w9rnX">
                <p
                  className="styles__positionName__l9tA4"
                  style={colorMap["QB"]}
                >
                  QB
                </p>
                <p className="styles__positionCount__J96ya">
                  {currentPositions().filter((obj) => obj == "QB").length}
                </p>
              </div>
              <div className="styles__positionCounter__w9rnX">
                <p
                  className="styles__positionName__l9tA4"
                  style={colorMap["RB"]}
                >
                  RB
                </p>
                <p className="styles__positionCount__J96ya">
                  {currentPositions().filter((obj) => obj == "RB").length}
                </p>
              </div>
              <div className="styles__positionCounter__w9rnX">
                <p
                  className="styles__positionName__l9tA4"
                  style={colorMap["WR"]}
                >
                  WR
                </p>
                <p className="styles__positionCount__J96ya">
                  {currentPositions().filter((obj) => obj == "WR").length}
                </p>
              </div>
              <div className="styles__positionCounter__w9rnX">
                <p
                  className="styles__positionName__l9tA4"
                  style={colorMap["TE"]}
                >
                  TE
                </p>
                <p className="styles__positionCount__J96ya">
                  {currentPositions().filter((obj) => obj == "TE").length}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="styles__positionSection__N_raC">
              <h2 className="styles__positionHeader__R2EgT">QB</h2>
              {currentPicks.map(function (item, i) {
                const player = pickToPlayer(item);
                if (player["position"] != "QB") {
                  return <></>;
                }
                return playerRow(player, item);
              })}
            </div>
            <div className="styles__positionSection__N_raC">
              <h2 className="styles__positionHeader__R2EgT">RB</h2>
              {currentPicks.map(function (item, i) {
                const player = pickToPlayer(item);
                if (player["position"] != "RB") {
                  return <></>;
                }
                return playerRow(player, item);
              })}
            </div>
            <div className="styles__positionSection__N_raC">
              <h2 className="styles__positionHeader__R2EgT">WR</h2>
              {currentPicks.map(function (item, i) {
                const player = pickToPlayer(item);
                if (player["position"] != "WR") {
                  return <></>;
                }
                return playerRow(player, item);
              })}
            </div>
            <div className="styles__positionSection__N_raC">
              <h2 className="styles__positionHeader__R2EgT">TE</h2>
              {currentPicks.map(function (item, i) {
                const player = pickToPlayer(item);
                if (player["position"] != "TE") {
                  return <></>;
                }
                return playerRow(player, item);
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DraftedTable;
