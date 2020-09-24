import './App.scss';

import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';

/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => {
  return (
    <div className="toggle-wrapper">
      <Switch
        onChange={onChange}
        checked={checked}
        onColor="#86d3ff"
        onHandleColor="#2693e6"
        offColor="#f47db1"
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={40}
        width={78}
        className="react-switch"
        id="material-switch"
      />
      <h3
        style={{
          color: checked ? "#a1d6ff" : "#fff",
        }}
      >
        {label}
      </h3>
    </div>
  );
};

type toggleId = "good" | "cheap" | "fast";

const App = () => {
  const [toggles, setToggles] = useState({
    good: false,
    cheap: false,
    fast: false,
  });

  const [attributes, setAttributes] = useState({
    attrTrue1: "",
    attrTrue2: "",
    attrFalse: "",
  });

  const changeToggle = (toggleId: toggleId) => {
    switch (toggleId) {
      case "good":
        if (toggles.cheap && toggles.fast) {
          setToggles({ ...toggles, good: !toggles.good, fast: false });
        } else {
          setToggles({ ...toggles, good: !toggles.good });
        }
        break;
      case "cheap":
        if (toggles.good && toggles.fast) {
          setToggles({ ...toggles, cheap: !toggles.cheap, good: false });
        } else {
          setToggles({ ...toggles, cheap: !toggles.cheap });
        }
        break;
      case "fast":
        if (toggles.cheap && toggles.good) {
          setToggles({ ...toggles, fast: !toggles.fast, cheap: false });
        } else {
          setToggles({ ...toggles, fast: !toggles.fast });
        }
        break;
    }
  };

  const allowCheckAttributes = (): boolean => {
    const toggleKeys = Object.keys(toggles) as toggleId[];

    const arr = toggleKeys.map((toggle) => {
      return toggles[toggle];
    });

    const lenght = arr.filter((item) => item === true).length;

    return lenght === 2;
  };

  const setAllAttributes = () => {
    const toggleKeys = Object.keys(toggles) as toggleId[];
    let trueAttrs = [];
    let falseAttr = "";
    for (let index = 0; index < toggleKeys.length; index++) {
      const element = toggleKeys[index];

      if (toggles[element]) {
        trueAttrs.push(element);
      } else {
        falseAttr = element;
      }
    }
    setAttributes({
      attrTrue1: trueAttrs[0],
      attrTrue2: trueAttrs[1],
      attrFalse: falseAttr,
    });
  };

  useEffect(() => {
    if (allowCheckAttributes()) {
      setAllAttributes();
    }
  }, [toggles]);

  return (
    <div className="App">
      <header className="App-header">
        <p>I want my project to be...</p>
        <div className="toggles-container">
          <Toggle
            onChange={() => changeToggle("good")}
            checked={toggles.good}
            label={"GOOD"}
          />
          <Toggle
            onChange={() => changeToggle("cheap")}
            checked={toggles.cheap}
            label={"CHEAP"}
          />
          <Toggle
            onChange={() => changeToggle("fast")}
            checked={toggles.fast}
            label={"FAST"}
          />
        </div>
        <div className="explanation">
          <p
            style={{
              visibility: allowCheckAttributes() ? "visible" : "hidden",
            }}
          >
            {`Your project will be ${attributes.attrTrue1} and ${attributes.attrTrue2} but won't be ${attributes.attrFalse}.`}
          </p>
        </div>
      </header>
      <div className="copy-right">
        developed by{" "}
        <a href="https://www.instagram.com/joaoduarteribeiro/" target="_blank">
          joaoduarteribeiro
        </a>
      </div>
    </div>
  );
};

export default App;
