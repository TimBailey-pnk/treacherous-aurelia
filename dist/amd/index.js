define(['exports', './@noknowdev/treacherous-aurelia'], function (exports, _treacherousAurelia) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_treacherousAurelia).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _treacherousAurelia[key];
      }
    });
  });
});