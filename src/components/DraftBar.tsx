import React, { Component, useState, useRef, useEffect } from "react";
import { colorMap } from "./styles";
import draftData from "./draft.json";
import allPlayers from "./all_players_and_appearances.json";

function DraftBar(props: any) {
  const {draftData, allPlayers} = props;
  const picks = draftData["draft"]["picks"];

  function draftEntryIdToUsername(draft_entry_id: any) {
    const userId = draftData["draft"]["draft_entries"].filter(
      (item: any) => item["id"] == draft_entry_id
    )[0]["user_id"];
    const userName = draftData["draft"]["users"].filter(
      (item: any) => item["id"] == userId
    )[0]["username"];
    return userName;
  }

  function pickToPlayer(pick: any) {
    // @ts-ignore
    const playerAndAppearance = allPlayers["result"].filter(
      (item: any) => item["id"] == pick["appearance_id"]
    )[0];
    return playerAndAppearance;
  }

  // TODO: Include not yet picked picks
  // TODO: Improve the color bar widths
  return (
    <div className="styles__draftingBarWrapper___3eGS">
      <div className="styles__draftingBar__ONx4i">
        <div className="styles__highlightBar__2pneY "></div>
        <button className="styles__scrollLeftButton__PSgqC">&lt;</button>
        <div className="styles__draftingBarScrollable__P7X9z">
          {Array(picks.length)
            .fill(216)
            .map((_, i) => {
              if (i < picks.length) {
                const pick = picks[i];
                const player = pickToPlayer(pick);
                // @ts-ignore
                const positionColor = colorMap[player["position"]];
                return (
                  <button className="styles__draftingCell__pD1pn  styles__draftingCell__Q8fFL ">
                    <div className="styles__topHalf__HMGmg">
                      <div className="styles__avatarWrap__hBCpr">
                        <div className="styles__avatarWrapper__FpsdV ">
                          <div className="styles__avatar__eBZ_K styles__avatar__gwiTX ">
                            <div className="styles__imageContainer__LyNue"></div>
                          </div>
                        </div>
                        <p className="styles__username__McRvJ">
                          {draftEntryIdToUsername(picks[i]["draft_entry_id"])}
                        </p>
                        <p className="styles__roundAndPick__NHB1t">
                          {`${Math.ceil((i + 1) / 12)}.${(i % 12) + 1}`}
                          <span className="styles__pipe__x9bZ_">|</span>
                          {i + 1}
                        </p>
                      </div>
                    </div>
                    <div className="styles__picksBar__GxUxY ">
                      <div
                        className="styles__bar__ey6Lw"
                        style={{
                          ...positionColor,
                          ...{ width: "100%" },
                        }}
                      ></div>
                    </div>
                    <div className="styles__bottomHalf__UJIF0">
                      <div className="styles__pickInfo__DI_7k">
                        <p className="styles__pickName__b7C37">{`${player[
                          "first_name"
                        ].charAt(0)}. ${player["last_name"]}`}</p>
                        <div>
                          <p className="styles__pickPos__cY94W">
                            {`${player["position"]} - ${player["team_name"]}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              } else {
                return (
                  <></>
                );
              }
            })}
        </div>
        <button className="styles__scrollRightButton__uMnug">&gt;</button>
      </div>
    </div>
  );
}

export default DraftBar;
