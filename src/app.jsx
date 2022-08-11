import React from "react";
import '@compiled/react';

export const App = () => (
  <div>
    <div css={{ fontSize: 50, background: 'green', height: '2000px' }}>above the fold</div>
    <div css={{ fontSize: 70, background: 'red' }}>below the fold</div>
  </div>
);
