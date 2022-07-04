import {
  borderColorMap,
  colorMap,
  qbColor,
  rbColor,
  teColor,
  wrColor,
} from "./styles";

function DraftBoard(props: { allPlayers: any; draftData: any }) {
  const { draftData, allPlayers } = props;
  const picks = draftData["draft"]["picks"];

  function userIdToPickNumber(user_id: any) {
    return draftData["draft"]["draft_entries"].filter(
      (item: any) => item["user_id"] == user_id
    )[0]["pick_order"];
  }
  // @ts-ignore
  const sortedUsers = draftData["draft"]["users"].sort(function (a, b) {
    return userIdToPickNumber(a["id"]) - userIdToPickNumber(b["id"]);
  });

  function pickToPlayer(pick: any) {
    // @ts-ignore
    const playerAndAppearance = allPlayers["result"].filter(
      (item: any) => item["id"] == pick["appearance_id"]
    )[0];
    return playerAndAppearance;
  }

  function getPositionsByDrafter() {
    let result = {
      0: { QB: 0, RB: 0, WR: 0, TE: 0 },
      1: { QB: 0, RB: 0, WR: 0, TE: 0 },
      2: { QB: 0, RB: 0, WR: 0, TE: 0 },
      3: { QB: 0, RB: 0, WR: 0, TE: 0 },
      4: { QB: 0, RB: 0, WR: 0, TE: 0 },
      5: { QB: 0, RB: 0, WR: 0, TE: 0 },
      6: { QB: 0, RB: 0, WR: 0, TE: 0 },
      7: { QB: 0, RB: 0, WR: 0, TE: 0 },
      8: { QB: 0, RB: 0, WR: 0, TE: 0 },
      9: { QB: 0, RB: 0, WR: 0, TE: 0 },
      10: { QB: 0, RB: 0, WR: 0, TE: 0 },
      11: { QB: 0, RB: 0, WR: 0, TE: 0 },
    };

    for (let i = 0; i < picks.length; ++i) {
      const round = Math.floor(i / 12);
      const roundPickNum = round % 2 == 0 ? i % 12 : 11 - (i % 12);
      const player = pickToPlayer(picks[i]);
      const position = player["position"];
      const drafterId = roundPickNum;
      // @ts-ignore
      result[drafterId][position] = result[drafterId][position] + 1;
    }
    return result;
  }

  function playerSquare(row: number, col: number) {
    if (picks.length >= rowColToPickNumber(row, col)) {
      const player = pickToPlayer(picks[rowColToPickNumber(row, col) - 1]);
      // @ts-ignore
      const playerColor = colorMap[player["position"]];
      // @ts-ignore
      const playerBorderColor = borderColorMap[player["position"]];
      const roundPickNum = row % 2 == 0 ? col : 12 - col;

      return (
        <div
          className="styles__draftBoardCell__sa6ku "
          style={playerBorderColor}
        >
          <p className="styles__cellNumberBar__l7j9R" style={playerColor}>
            {rowColToPickNumber(row, col)}
          </p>
          <p className="styles__pickName__C9yTC">{player["first_name"]}</p>
          <p className="styles__pickName__C9yTC">{player["last_name"]}</p>
          <p className="styles__subText__mP1hK">{`${player["position"]} - ${
            player["team_name"]
          } \(${row + 1}.${roundPickNum + 1}\)`}</p>
        </div>
      );
    }
    if (picks.length + 1 == rowColToPickNumber(row, col)) {
      return (
        <div className="styles__draftBoardCell__sa6ku  styles__onTheClock__vnkJ0">
          <p className="styles__cellNumberBar__l7j9R">
            {rowColToPickNumber(row, col)}
          </p>
          <p className="styles__pickName__C9yTC">On the clock</p>
        </div>
      );
    }
    return (
      <div className="styles__draftBoardCell__sa6ku  styles__emptyCell__Qnu_5">
        <p className="styles__cellNumberBar__l7j9R">
          {rowColToPickNumber(row, col)}
        </p>
      </div>
    );
  }

  function rowColToPickNumber(row: number, col: number) {
    let result = 12 * row;
    if (row % 2 == 0) {
      // Add 1 because 0-indexed.
      result += col + 1;
    } else {
      result += 12 - col;
    }
    return result;
  }

  return (
    <div className="styles__draftBoardWrapper__bPk29">
      <div className="styles__draftBoard__JOk8g">
        <div className="styles__draftBoardContent__LwdH9">
          <div className="styles__draftBoardColumns__QzI7N">
            <div className="styles__numberColumn__RTU_a">
              <div className="styles__headerNumberCell__dFJC_"></div>
              <div className="styles__numberCell__YH9Zo">1</div>
              <div className="styles__numberCell__YH9Zo">2</div>
              <div className="styles__numberCell__YH9Zo">3</div>
              <div className="styles__numberCell__YH9Zo">4</div>
              <div className="styles__numberCell__YH9Zo">5</div>
              <div className="styles__numberCell__YH9Zo">6</div>
              <div className="styles__numberCell__YH9Zo">7</div>
              <div className="styles__numberCell__YH9Zo">8</div>
              <div className="styles__numberCell__YH9Zo">9</div>
              <div className="styles__numberCell__YH9Zo">10</div>
              <div className="styles__numberCell__YH9Zo">11</div>
              <div className="styles__numberCell__YH9Zo">12</div>
              <div className="styles__numberCell__YH9Zo">13</div>
              <div className="styles__numberCell__YH9Zo">14</div>
              <div className="styles__numberCell__YH9Zo">15</div>
              <div className="styles__numberCell__YH9Zo">16</div>
              <div className="styles__numberCell__YH9Zo">17</div>
              <div className="styles__numberCell__YH9Zo">18</div>
              <div className="styles__numberCell__YH9Zo">19</div>
              <div className="styles__numberCell__YH9Zo">20</div>
            </div>

            {Array(12)
              .fill(0)
              .map((_, i) => {
                // @ts-ignore
                const amountPositionByDrafter = getPositionsByDrafter()[i];
                const numPicks =
                  amountPositionByDrafter["QB"] +
                  amountPositionByDrafter["RB"] +
                  amountPositionByDrafter["WR"] +
                  amountPositionByDrafter["TE"] +
                  0.001;
                const qbWidth = {
                  width:
                    Math.floor(
                      (100 * amountPositionByDrafter["QB"]) / numPicks
                    ).toString() + "%",
                };
                const rbWidth = {
                  width:
                    Math.floor(
                      (100 * amountPositionByDrafter["RB"]) / numPicks
                    ).toString() + "%",
                };
                const wrWidth = {
                  width:
                    Math.floor(
                      (100 * amountPositionByDrafter["WR"]) / numPicks
                    ).toString() + "%",
                };
                const teWidth = {
                  width:
                    Math.floor(
                      (100 * amountPositionByDrafter["TE"]) / numPicks
                    ).toString() + "%",
                };
                const avatar = {
                  backgroundImage: `url("${sortedUsers[i]["avatarUrl"]}")`,
                };
                return (
                  <>
                    <div className="styles__draftEntryColumn__BSGIr">
                      <div className="styles__userHeader__skiAD ">
                        <div className="styles__avatarWrapper__FpsdV ">
                          <div className="styles__avatar__eBZ_K styles__avatar__vwikS">
                            <div
                              className="styles__imageContainer__LyNue"
                              style={avatar}
                            ></div>
                          </div>
                        </div>

                        <p className="styles__username__TyKpx">
                          {sortedUsers[i]["username"]}
                        </p>
                        <div className="styles__picksBar__GxUxY ">
                          <div
                            className="styles__bar__ey6Lw"
                            style={{
                              ...qbColor,
                              ...qbWidth,
                            }}
                          ></div>
                          <div
                            className="styles__bar__ey6Lw"
                            style={{
                              ...rbColor,
                              ...rbWidth,
                            }}
                          ></div>
                          <div
                            className="styles__bar__ey6Lw"
                            style={{
                              ...wrColor,
                              ...wrWidth,
                            }}
                          ></div>
                          <div
                            className="styles__bar__ey6Lw"
                            style={{
                              ...teColor,
                              ...teWidth,
                            }}
                          ></div>
                        </div>
                      </div>
                      {Array(20)
                        .fill(0)
                        .map((_, j) => {
                          return playerSquare(j, i);
                        })}
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DraftBoard;
