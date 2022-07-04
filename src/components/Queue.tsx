// @ts-nocheck
import React, { Component, useState, useRef, useEffect } from "react";
import PlayerCard from "./PlayerCard";
import PlayerTable from "./PlayerTable";

import { List } from "react-virtualized";
import EmptyQueue from "./EmptyQueue";

function Queue(props: { playersData: any, unqueuePlayer: any, dk: any, entryId: any }) {
  const { playersData, unqueuePlayer, dk, entryId } = props;

  return (
    <>
      <div className="styles__columnTitle__KwHbQ">
        <h2 className="styles__title__MAX_v">Queue</h2>
        <div className="styles__counterBubble__tBj_c styles__queueCounter__aABIB">
          {playersData["result"].length}
        </div>
      </div>
      {playersData["result"].length > 0 ? (
        <PlayerTable playersData={playersData} unqueuePlayer={unqueuePlayer} dk={dk} entryId={entryId} useFilter={false}/>
      ) : (
        <EmptyQueue />
      )}
    </>
  );
}

export default Queue;
