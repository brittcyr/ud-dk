// @ts-nocheck
import React, { useEffect, useState } from "react";
import { colorMap } from "./styles";
import NewsIcon from "./NewsIcon";

const absoluteStyle: "absolute" | "relative" | "fixed" = "absolute";
const div1Style = {
  //  height: "454px",
  left: "0px",
  //  position: absoluteStyle,
  //  top: "200px",
  width: "100%",
};

/*
TODO: Consider doing this to override parent

  handleChildClick: function (e) {
    e.stopPropagation();
    console.log('child');
  },
*/

// @ts-ignore
function PlayerCard(props: {
  index: number;
  resetSelectedIndex: () => void;
  player: any;
  queuePlayer: any;
}) {
  const { index, resetSelectedIndex, player, queuePlayer, unqueuePlayer } = props;
  const handleResetSelectedIndex = () => {
    resetSelectedIndex();
  };
  const { image_url } = player;

  return (
    <div
      style={div1Style}
      role="button"
      onClick={() => handleResetSelectedIndex()}
    >
      <div className="styles__playerCard__RYb28 styles__playerCard__svQ4m">
        <div
          className="styles__colorBar__ffpcX"
          style={colorMap[player["position"]]}
        ></div>
        <div className="styles__content__mtQ51">
          <div tabIndex={0} className="styles__playerNameRow__Xgak0">
            <div
              className="styles__playerImage__eTlYf"
              style={{ backgroundImage: `url('${image_url}')` }}
            ></div>
            <p className="styles__playerName__bAcXc">{`${player["first_name"]} ${player["last_name"]}`}</p>
            <i className="styles__icon__DijND styles__toggleIcon__jMsrZ">
              <svg
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.85 18.3875L15 13.5375L10.15 18.3875C9.66248 18.875 8.87498 18.875 8.38748 18.3875C7.89998 17.9 7.89998 17.1125 8.38748 16.625L14.125 10.8875C14.6125 10.4 15.4 10.4 15.8875 10.8875L21.625 16.625C22.1125 17.1125 22.1125 17.9 21.625 18.3875C21.1375 18.8625 20.3375 18.875 19.85 18.3875Z"></path>
              </svg>
            </i>
          </div>
          <div className="styles__playerInfoSection__zaJ81">
            <div className="styles__playerInfo__wHwka">
              <p className="styles__infoTitle__MkTA6">Position</p>
              <p className="styles__infoValue__zul7C">{player["position"]}</p>
            </div>
            <div className="styles__playerInfo__wHwka">
              <p className="styles__infoTitle__MkTA6">Bye</p>
              <p className="styles__infoValue__zul7C">{player["bye"]}</p>
            </div>
            <div className="styles__playerInfo__wHwka">
              <p className="styles__infoTitle__MkTA6">Proj</p>
              <p className="styles__infoValue__zul7C">
                {player["projection"]["points"]}
              </p>
            </div>
            <div className="styles__playerInfo__wHwka">
              <p className="styles__infoTitle__MkTA6">Team</p>
              <p className="styles__infoValue__zul7C">
                {player["team_name"]}
              </p>
            </div>
            <div className="styles__playerInfo__wHwka">
              <p className="styles__infoTitle__MkTA6">ADP</p>
              <p className="styles__infoValue__zul7C">
                {player["projection"]["adp"]}
              </p>
            </div>
            <div className="styles__playerInfo__wHwka">
              <p className="styles__infoTitle__MkTA6">Pos. Rank</p>
              <p className="styles__infoValue__zul7C">
                {player["projection"]["position_rank"]}
              </p>
            </div>
          </div>
          <div className="styles__statSection__OEdMa">
            <table className="styles__statsTable__oSxR4">
              <thead>
                <tr className="styles__titleRow__Mtqzh">
                  <td></td>
                  <th className="styles__titleHeader__Tg3ND" colSpan={4}>
                    {player["stats_table"]["titles"][0]["text"]}
                  </th>
                  <th className="styles__titleHeader__Tg3ND" colSpan={3}>
                    {player["stats_table"]["titles"][1]["text"]}
                  </th>
                  <td></td>
                </tr>
              </thead>
              <thead>
                <tr className="styles__headerRow__Mddxr">
                  <th>{player["stats_table"]["headers"][0]}</th>
                  <th>{player["stats_table"]["headers"][1]}</th>
                  <th>{player["stats_table"]["headers"][2]}</th>
                  <th>{player["stats_table"]["headers"][3]}</th>
                  <th>{player["stats_table"]["headers"][4]}</th>
                  <th>{player["stats_table"]["headers"][5]}</th>
                  <th>{player["stats_table"]["headers"][6]}</th>
                  <th>{player["stats_table"]["headers"][7]}</th>
                  <th>{player["stats_table"]["headers"][8]}</th>
                </tr>
              </thead>
              <tbody>
                {player["stats_table"]["rows"].map(function (row, i) {
                  return (
                    <tr className="styles__statRow__GUF81">
                      {row.map(function (item, i) {
                        if (i == 8 || i == 0) {
                          return <td>{item}</td>;
                        }
                        return (
                          <td className="styles__totalStat__i3C0s">{item}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button className="styles__newsTile__SmmjL">
              <p className="styles__title__DGw5l">
                {player["latest_news_item"] ? player["latest_news_item"]["title"]: ''}
              </p>
              <div className="styles__label__kNKq3">
                <NewsIcon />
              </div>
            </button>
          </div>
          <div className="styles__actionsWrapper__uR_dN">
            {player["is_queued"] == "0" ? (
              <button
                className="styles__queuedStarPlayerCard__AMFDs"
                onClick={() => queuePlayer(player)}
              >
                <i className="styles__icon__DijND styles__queueIcon__OlOCt">
                  <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.5624 11.3L18.5124 10.775L16.1499 5.2125C15.7249 4.2 14.2749 4.2 13.8499 5.2125L11.4874 10.7875L5.44991 11.3C4.34991 11.3875 3.89991 12.7625 4.73741 13.4875L9.32491 17.4625L7.94991 23.3625C7.69991 24.4375 8.86241 25.2875 9.81241 24.7125L14.9999 21.5875L20.1874 24.725C21.1374 25.3 22.2999 24.45 22.0499 23.375L20.6749 17.4625L25.2624 13.4875C26.0999 12.7625 25.6624 11.3875 24.5624 11.3ZM14.9999 19.25L10.2999 22.0875L11.5499 16.7375L7.39991 13.1375L12.8749 12.6625L14.9999 7.625L17.1374 12.675L22.6124 13.15L18.4624 16.75L19.7124 22.1L14.9999 19.25Z"></path>
                  </svg>
                </i>
                <p>Queue</p>
              </button>
            ) : (
              <button
                class="styles__queuedStarPlayerCard__AMFDs"
                onClick={() => unqueuePlayer(player)}
              >
                <i class="styles__icon__DijND styles__queueIcon__OlOCt">
                  <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 21.5875L20.1875 24.725C21.1375 25.3 22.3 24.45 22.05 23.375L20.675 17.475L25.2625 13.5C26.1 12.775 25.65 11.4 24.55 11.3125L18.5125 10.8L16.15 5.22501C15.725 4.21251 14.275 4.21251 13.85 5.22501L11.4875 10.7875L5.45003 11.3C4.35003 11.3875 3.90003 12.7625 4.73753 13.4875L9.32503 17.4625L7.95003 23.3625C7.70003 24.4375 8.86253 25.2875 9.81253 24.7125L15 21.5875Z"></path>
                  </svg>
                </i>
                <p>Remove</p>
              </button>
            )}

            <button className="styles__draftActionPlayerCard__wkdgw styles__notDrafting__kymew">
              <i className="styles__icon__DijND styles__iconNotDrafting__ek6nE">
                <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.25 25.5L26.0625 16.15C27.075 15.7125 27.075 14.2875 26.0625 13.85L4.25 4.50001C3.425 4.13751 2.5125 4.75001 2.5125 5.63751L2.5 11.4C2.5 12.025 2.9625 12.5625 3.5875 12.6375L21.25 15L3.5875 17.35C2.9625 17.4375 2.5 17.975 2.5 18.6L2.5125 24.3625C2.5125 25.25 3.425 25.8625 4.25 25.5Z"></path>
                </svg>
              </i>
              <p>Draft</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
