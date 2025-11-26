import { useState, useEffect, useRef } from "react";

function storageAvailable(type) {
  try {
    var storage = window[type];
    var testKey = "__storage_test__";
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

export default function useLocalStorage(key, initialValue, options) {
  if (!options) {
    options = { store: "local" };
  }

  var storeMode = options.store;
  if (!storeMode) {
    storeMode = "local";
  }

  var memoryFallback = useRef({});

  var keyRef = useRef(key);
  keyRef.current = key;

  var [state, setState] = useState(function () {
    if (storeMode === "local" || storeMode === "both") {
      if (storageAvailable("localStorage")) {
        var raw = localStorage.getItem(key);
        if (raw !== null && raw !== undefined) {
          try {
            var parsed = JSON.parse(raw);
            return parsed;
          } catch (err) {
            return raw;
          }
        }
      }
    }
  });

  useEffect(function () {
    try {
      var toStore;
      if (typeof state === "string") {
        toStore = state;
      } else {
        try {
          toStore = JSON.stringify(state);
        } catch (err) {
          console.error(err);
          toStore = "";
        }
      }

      if ((storeMode === "local" || storeMode === "both") && storageAvailable("localStorage")) {
        try {
          localStorage.setItem(keyRef.current, toStore);
        } catch (e) {
          console.error(e);
        }
      }

    } 
    catch (e) {
      console.error(e);
      memoryFallback.current[keyRef.current] = state;
    }
  }, [state, storeMode]);

  function setValue(valueOrFunction) {
    setState(function (previous) {
      var next;
      if (typeof valueOrFunction === "function") {
        next = valueOrFunction(previous);
      } else {
        next = valueOrFunction;
      }
      return next;
    });
  }

  return [state, setValue];
}