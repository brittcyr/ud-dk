// @ts-nocheck
import React, { Component, useState, useRef, useEffect } from "react";
import PlayerCard from "./PlayerCard";

import { List } from "react-virtualized";
import EmptyStar from "./EmptyStar";
import QueuedStar from "./QueuedStar";
import DownArrow from "./DownArrow";
import NewsIcon from "./NewsIcon";
import { colorMap } from "./styles";

const listHeight = 600;
const defaultRowHeight = 50;
const rowWidth = 400;

function PlayerTable(props: {
  playersData: any;
  queuePlayer: any;
  unqueuePlayer;
}) {
  const { playersData, queuePlayer, unqueuePlayer } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const tableRef = useRef();
  const resetSelectedIndex = () => {
    setSelectedIndex(-1);
  };

  function ColorBar({ position }) {
    return (
      <div className="styles__colorBar__ft0dl" style={colorMap[position]}></div>
    );
  }

  function rowHeight({ index }): number {
    if (index == selectedIndex) {
      let height = 482;
      if (playersData["result"][index]["stats_table"]["rows"].length > 2) {
        height += 28;
      }
      return height;
      //return 482;
    }
    return defaultRowHeight;
  }

  useEffect(() => {
    tableRef.current.recomputeRowHeights();
  }, [selectedIndex]);

  function renderRow({ index, key, style }) {
    // TODO: Make the star cause a post to https://api.draftkings.com/drafts/v1/snake/128152822/entries/3271977959/draftPreferences/queue/players?format=json
    return (
      <div
        tabIndex={0}
        className="styles__playerCellWrapper__lTn52"
        role="button"
        playersData-id="fa2fcc47-5a09-458e-82b6-656b030ad88a"
        onClick={selectedIndex != index ? () => setSelectedIndex(index) : null}
        key={key}
        style={style}
      >
        <div className="styles__playerCell__JiNPU styles__playerCell__F2sNl ">
          {index == selectedIndex ? (
            <PlayerCard
              index={index}
              resetSelectedIndex={resetSelectedIndex}
              player={playersData["result"][index]}
              queuePlayer={queuePlayer}
              unqueuePlayer={unqueuePlayer}
            />
          ) : (
            <>
              <ColorBar position={playersData["result"][index]["position"]} />
              {playersData["result"][index]["is_queued"] == "1" ? (
                <QueuedStar
                  onClick={() => unqueuePlayer(playersData["result"][index])}
                />
              ) : (
                <EmptyStar
                  onClick={() => queuePlayer(playersData["result"][index])}
                />
              )}
              <div className="styles__playerInfo__CyzKu">
                <div className="styles__playerName__tC8I7">{`${playersData["result"][index]["first_name"]} ${playersData["result"][index]["last_name"]}`}</div>
                <div className="styles__playerPosition__ziprS">
                  <div
                    className="styles__slotBadge__EYdFa"
                    style={colorMap[playersData["result"][index]["position"]]}
                  >
                    {`${playersData["result"][index]["projection"]["position_rank"]}`}
                  </div>
                  <p>
                    <strong>
                      {`${playersData["result"][index]["team_name"]}`}
                    </strong>
                  </p>
                  <NewsIcon />
                </div>
              </div>
              <div className="styles__rightSide__uDVQf">
                <div className="styles__statCell__GEyYc">
                  <p className="styles__statValue__g8zd5">{`${playersData["result"][index]["bye"]}`}</p>
                  <p className="styles__statKey__l3V4c">Bye</p>
                </div>
                <div className="styles__statCell__GEyYc">
                  <p className="styles__statValue__g8zd5">{`${playersData["result"][index]["projection"]["adp"]}`}</p>
                  <p className="styles__statKey__l3V4c">ADP</p>
                </div>
                <DownArrow />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <List
      width={rowWidth}
      height={listHeight}
      rowHeight={rowHeight}
      rowRenderer={renderRow}
      rowCount={playersData["result"].length}
      estimatedRowSize={defaultRowHeight}
      overscanRowCount={3}
      ref={tableRef}
    />
  );
}

export default PlayerTable;
