import React, { useEffect, useState } from "react";
import {qbColor, rbColor, wrColor, teColor, notSelected} from './styles'

function PositionSelector(props: {filterPosition: any, unfilterPosition: any, reloadTable: any, setReloadTable: any}) {
  const {filterPosition, unfilterPosition, reloadTable, setReloadTable} = props;
  const [positionSelected, setPositionSelected] = useState({'QB': true, 'RB': true, 'WR': true, 'TE': true});
  const [qbSelected, setQbSelected] = useState(true);
  const [wrSelected, setWrSelected] = useState(true);
  const [rbSelected, setRbSelected] = useState(true);
  const [teSelected, setTeSelected] = useState(true);

  function clickButton(chosen: 'QB' | 'WR' | 'RB' | 'TE') {
    if (positionSelected['QB'] && positionSelected['WR'] &&  positionSelected['RB'] &&  positionSelected['TE']) {
      positionSelected['QB'] = false;
      positionSelected['RB'] = false;
      positionSelected['WR'] = false;
      positionSelected['TE'] = false;
      positionSelected[chosen] = true;
      setPositionSelected(positionSelected);
      setQbSelected(positionSelected['QB']);
      setRbSelected(positionSelected['RB']);
      setWrSelected(positionSelected['WR']);
      setTeSelected(positionSelected['TE']);

      if (positionSelected['QB']) {
        unfilterPosition('QB');
      } else {
        filterPosition('QB');
      }
      if (positionSelected['RB']) {
        unfilterPosition('RB');
      } else {
        filterPosition('RB');
      }
      if (positionSelected['WR']) {
        unfilterPosition('WR');
      } else {
        filterPosition('WR');
      }
      if (positionSelected['TE']) {
        unfilterPosition('TE');
      } else {
        filterPosition('TE');
      }
      setReloadTable(!reloadTable);
      return;
    }

    // Otherwise, flip that one
    positionSelected[chosen] = !positionSelected[chosen];

    // But if all are false now, set all to true
    if (!positionSelected['QB'] && !positionSelected['WR'] && !positionSelected['RB'] && !positionSelected['TE']) {
      positionSelected['QB'] = true;
      positionSelected['RB'] = true;
      positionSelected['WR'] = true;
      positionSelected['TE'] = true;
    }

    setPositionSelected(positionSelected);
    setQbSelected(positionSelected['QB']);
    setRbSelected(positionSelected['RB']);
    setWrSelected(positionSelected['WR']);
    setTeSelected(positionSelected['TE']);

    if (positionSelected['QB']) {
      unfilterPosition('QB');
    } else {
      filterPosition('QB');
    }
    if (positionSelected['RB']) {
      unfilterPosition('RB');
    } else {
      filterPosition('RB');
    }
    if (positionSelected['WR']) {
      unfilterPosition('WR');
    } else {
      filterPosition('WR');
    }
    if (positionSelected['TE']) {
      unfilterPosition('TE');
    } else {
      filterPosition('TE');
    }
    setReloadTable(!reloadTable);
  }

  function clickQB() {
    clickButton('QB');
  }
  function clickRB() {
    clickButton('RB');
  }
  function clickWR() {
    clickButton('WR');
  }
  function clickTE() {
    clickButton('TE');
  }

  return (
    <>
      <button
        onClick={clickQB}
        className="styles__button__gmYRZ styles__green__aqzHf styles__small___s6i5 styles__solid__BthGK styles__full__xmWA8 styles__filterButtons__stpGn"
        style={qbSelected ? qbColor : notSelected}
      >
        QB
      </button>
      <button
        onClick={clickRB}
        className="styles__button__gmYRZ styles__green__aqzHf styles__small___s6i5 styles__solid__BthGK styles__full__xmWA8 styles__filterButtons__stpGn"
        style={rbSelected ? rbColor : notSelected}
      >
        RB
      </button>
      <button
        onClick={clickWR}
        className="styles__button__gmYRZ styles__green__aqzHf styles__small___s6i5 styles__solid__BthGK styles__full__xmWA8 styles__filterButtons__stpGn"
        style={wrSelected ? wrColor : notSelected}
      >
        WR
      </button>
      <button
        onClick={clickTE}
        className="styles__button__gmYRZ styles__green__aqzHf styles__small___s6i5 styles__solid__BthGK styles__full__xmWA8 styles__filterButtons__stpGn"
        style={teSelected ? teColor : notSelected}
      >
        TE
      </button>
    </>
  );
}

export default PositionSelector;
